import { Project, ToDo } from "./classes";
import { ProjectManager } from "./objectManagers";
import { DisplayManager } from "./displayManager";
import { format, parse } from "date-fns";

export class DOMManager {
  activeToDo;
  constructor() {
    if (DOMManager.instance) {
      return DOMManager.instance;
    }
    DOMManager.instance = this;
    this.display = new DisplayManager();
    this.PM = new ProjectManager();
    console.log(this.PM.projects);
    this.activeProject = this.PM.default;
  }

  storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  loadStoredProjects() {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    console.log(storedProjects);
    storedProjects.forEach((project, index) => {
      Object.setPrototypeOf(project, Project.prototype);
      project.todos.forEach((todo) => {
        Object.setPrototypeOf(todo, ToDo.prototype);
      });
      this.PM.projects[index] = project;
    });
    this.activeProject = this.PM.projects[0];
    console.log(storedProjects);
  }
  updateStoredProjects() {
    localStorage.setItem("projects", JSON.stringify(this.PM.projects));
  }

  loadStoredData() {
    //console.log(this.storageAvailable("localStorage"));
    if (this.storageAvailable("localStorage")) {
      if (localStorage.getItem("projects")) {
        this.loadStoredProjects();
        console.log(this.PM.projects);
      }
    }
  }
  initialize() {
    /* test section 
    with fixed data
    const testTodo = new ToDo(
      "test1",
      "2024-1-1",
      "test description",
      "low",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum molestie diam. Quisque placerat sapien sed erat maximus, ac placerat turpis iaculis. In et auctor nibh, in placerat risus. Fusce pellentesque viverra quam, id dignissim libero hendrerit id. Proin quis iaculis nunc. Sed aliquam non elit vitae rhoncus. Vestibulum feugiat. "
    );
    const testTodo2 = new ToDo(
      "test2",
      "2024-1-1",
      "test description",
      "medium",
      "test notes"
    );
    const testTodo3 = new ToDo(
      "test3",
      "2024-1-1",
      "test description",
      "high",
      "test notes"
    );
    const testTodo4 = new ToDo(
      "test4",
      "2024-1-1",
      "test description",
      "medium",
      "test notes"
    );
    const testTodo5 = new ToDo(
      "test5",
      "2024-1-1",
      "test description",
      "low",
      " molestie diam. Quisque  turpis quam, id dignissim libero hendrerit id. Proin quis iaculis nunc. Sed aliquam non elit vitae rhoncus. Vestibulum feugiat. "
    );
    this.PM.addToDo(testTodo);
    this.PM.addToDo(testTodo2);
    this.PM.addToDo(testTodo3);
    this.PM.addToDo(testTodo4);
    this.PM.addToDo(testTodo5);
    this.PM.complete(testTodo);*/
    //end of test data section
    this.loadStoredData();
    this.display.drawAll();
  }
  startListeners() {
    const addProjectBtn = document.querySelector(".add-project-btn");
    const projectForm = document.querySelector(".form-new-project");
    const projectName = document.querySelector("#project-name");
    const projectDueDate = document.querySelector("#project-due-date");
    const liveProjects = document.querySelector(".live-projects");
    let allProjects = document.querySelectorAll(".project");

    let addToDoBtn = document.querySelector(".add-todo-button-container");
    const toDoForm = document.querySelector(".form-new-todo");
    const toDoName = document.querySelector("#todo-name");
    const toDoDueDate = document.querySelector("#todo-due-date");
    const toDoPriority = document.querySelector("#todo-priority");
    const toDoDescription = document.querySelector("#todo-description");
    const toDoNotes = document.querySelector("#todo-notes");

    const editToDoForm = document.querySelector(".form-edit-todo");
    const editToDoName = document.querySelector("#edit-todo-name");
    const editToDoProject = document.querySelector("#edit-todo-project");
    const editToDoComplete = document.querySelector("#edit-todo-complete");
    const editToDoDueDate = document.querySelector("#edit-todo-due-date");
    const editToDoPriority = document.querySelector("#edit-todo-priority");
    const editToDoDescription = document.querySelector(
      "#edit-todo-description"
    );
    const editToDoNotes = document.querySelector("#edit-todo-notes");

    let editButtons = document.querySelectorAll(".edit-icon");
    let deleteButtons = document.querySelectorAll(".delete-icon");

    const clickEmulator = () => {
      const activeIndex = this.PM.projects.indexOf(this.activeProject);
      const toHighlight = document.querySelector(
        `[data-index="${activeIndex}"]`
      );
      this.display.drawContentTodos(this.activeProject);
      const clickEvent = new Event("click", {
        bubbles: true,
        cancelable: false,
      });
      toHighlight.dispatchEvent(clickEvent);
    };

    const refreshDynamicSelectors = () => {
      allProjects = document.querySelectorAll(".project");
      addToDoBtn = document.querySelector(".add-todo-button-container");
      editButtons = document.querySelectorAll(".edit-icon");
      deleteButtons = document.querySelectorAll(".delete-icon");
    };

    const addTodo = () => {
      addToDoBtn = document.querySelector(".add-todo-button-container");
      addToDoBtn.addEventListener("click", () => {
        this.display.toggleProjectForm(toDoForm);
      });
    };

    const editToDo = () => {
      editButtons = document.querySelectorAll(".edit-icon");
      editButtons.forEach((editButton, index) => {
        editButton.addEventListener("click", () => {
          this.activeToDo = this.activeProject.todos[index];
          editToDoName.value = this.activeToDo.name;
          this.display.drawProjectsOptionList(
            editToDoProject,
            this.PM.projects.indexOf(this.activeProject)
          );
          if (this.activeToDo.isComplete) {
            editToDoComplete.checked = "true";
          } else {
            editToDoComplete.removeAttribute("checked");
          }
          editToDoDueDate.value = format(
            parse(this.activeToDo.dueDate, "dd MMM yyyy", new Date()),
            "yyyy-MM-dd"
          );
          editToDoPriority.value = this.activeToDo.priority;
          editToDoDescription.value = this.activeToDo.description;
          editToDoNotes.value = this.activeToDo.notes;
          console.log(editToDoForm);
          this.display.toggleProjectForm(editToDoForm);
        });
      });
    };

    const deleteToDo = () => {
      deleteButtons = document.querySelectorAll(".delete-icon");
      deleteButtons.forEach((deleteButton, index) => {
        deleteButton.addEventListener("click", (event) => {
          console.log(index);
          this.PM.removeToDo(
            this.activeProject.todos[index],
            this.activeProject
          );
          this.updateStoredProjects();
          clickEmulator();
        });
      });
    };

    const highlighter = () => {
      allProjects.forEach((project) => {
        project.addEventListener("click", (event) => {
          allProjects.forEach((project) => project.classList.remove("active"));
          this.display.highlightActive(event.currentTarget);
          this.activeProject =
            this.PM.projects[event.currentTarget.dataset.index];
          console.log(
            "Active project after highligher loads on page load: ",
            this.activeProject
          );
          this.display.drawContentTodos(this.activeProject);
          editToDo();
          deleteToDo();
          addTodo();
        });
      });
    };
    highlighter();
    clickEmulator();
    console.log("After highlighter function called originally: ", addToDoBtn);
    addProjectBtn.addEventListener("click", () => {
      this.display.toggleProjectForm(projectForm);
    });

    projectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.PM.addProject(
        new Project(
          projectName.value,
          format(
            parse(projectDueDate.value, "yyyy-MM-dd", new Date()),
            "dd MMM yyyy"
          )
        )
      );
      this.display.drawSidebarProjects(this.PM.getProjects(), liveProjects);
      projectForm.reset();
      console.log((allProjects = document.querySelectorAll(".project")));
      allProjects = document.querySelectorAll(".project");
      this.updateStoredProjects();
      highlighter();
      clickEmulator();
    });

    projectForm.addEventListener("reset", (event) => {
      this.display.toggleProjectForm(projectForm);
    });

    toDoForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.PM.addToDo(
        new ToDo(
          toDoName.value,
          format(
            parse(toDoDueDate.value, "yyyy-MM-dd", new Date()),
            "dd MMM yyyy"
          ),
          toDoDescription.value,
          toDoPriority.value,
          toDoNotes.value
        ),
        this.activeProject
      );
      this.updateStoredProjects();
      clickEmulator();
      toDoForm.reset();
    });

    toDoForm?.addEventListener("reset", (event) => {
      this.display.toggleProjectForm(toDoForm);
    });

    editToDoForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.PM.renameToDo(this.activeToDo, editToDoName.value);
      //console.log(this.activeToDo.isComplete);
      if (
        !(
          Number.parseInt(editToDoProject.value) ===
          this.PM.projects.indexOf(this.activeProject)
        )
      ) {
        this.PM.moveToDo(
          this.activeToDo,
          this.activeProject,
          this.PM.projects[Number.parseInt(editToDoProject.value)]
        );
      }
      if (editToDoComplete.checked) {
        this.PM.complete(this.activeToDo);
      } else {
        this.PM.uncomplete(this.activeToDo);
      }
      this.PM.changeToDoDueDate(
        this.activeToDo,
        format(
          parse(editToDoDueDate.value, "yyyy-MM-dd", new Date()),
          "dd MMM yyyy"
        )
      );
      this.PM.changeToDoDescription(this.activeToDo, editToDoDescription.value);
      this.PM.changeToDoPriority(this.activeToDo, editToDoPriority.value);
      this.PM.changeToDoNotes(this.activeToDo, editToDoNotes.value);
      this.updateStoredProjects();
      clickEmulator();
      editToDoForm.reset();
    });

    editToDoForm?.addEventListener("reset", (event) => {
      this.display.toggleProjectForm(editToDoForm);
    });
  }
}
