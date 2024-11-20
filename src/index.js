import "./styles.css";
import { format, compareAsc } from "date-fns";
import { ProjectManager } from "./objectManagers.js";
import { Project, ToDo } from "./classes";
import { DisplayManager } from "./displayManager.js";
import { DOMManager } from "./domManager.js";

console.log("Loading succesful");

const dom = new DOMManager();
const display = new DisplayManager();
const PM = new ProjectManager();
let activeProject = dom.activeProject;
dom.initialize();

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

let editButtons = document.querySelectorAll(".edit-icon");
let deleteButtons = document.querySelectorAll(".delete-icon");

const clickEmulator = () => {
  const activeIndex = PM.projects.indexOf(activeProject);
  const toHighlight = document.querySelector(`[data-index="${activeIndex}"]`);
  display.drawContentTodos(activeProject);
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
    display.toggleProjectForm(toDoForm);
  });
};

const editToDo = () => {
  editButtons = document.querySelectorAll(".edit-icon");
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", (event) => {
      display.drawEditForm(activeProject);
    });
  });
};

const deleteToDo = () => {
  deleteButtons = document.querySelectorAll(".delete-icon");
  deleteButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", (event) => {
      console.log(index);
      PM.removeToDo(activeProject.todos[index], activeProject);
      clickEmulator();
    });
  });
};

const highlighter = () => {
  allProjects.forEach((project) => {
    project.addEventListener("click", (event) => {
      allProjects.forEach((project) => project.classList.remove("active"));
      display.highlightActive(event.currentTarget);
      console.log(event.currentTarget);
      activeProject = PM.projects[event.currentTarget.dataset.index];
      console.log(
        "Active project after highligher loads on page load: ",
        activeProject
      );
      display.drawContentTodos(activeProject);
      deleteToDo();
      addTodo();
    });
  });
};

console.log(dom.activeProject);
highlighter();
clickEmulator();
console.log("After highlighter function called originally: ", activeProject);
addProjectBtn.addEventListener("click", () => {
  display.toggleProjectForm(projectForm);
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  dom.PM.addProject(new Project(projectName.value, projectDueDate.value));
  display.drawSidebarProjects(PM.getProjects(), liveProjects);
  display.toggleProjectForm(projectForm);
  highlighter();
  conePM.projects.at(-1);
  clickEmulator();
});

projectForm.addEventListener("reset", (event) => {
  display.toggleProjectForm(projectForm);
});

toDoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  dom.PM.addToDo(
    new ToDo(
      toDoName.value,
      toDoDueDate.value,
      toDoDescription.value,
      toDoPriority.value,
      toDoNotes.value
    ),
    activeProject
  );
  clickEmulator();
  display.toggleProjectForm(toDoForm);
});

toDoForm?.addEventListener("reset", (event) => {
  display.toggleProjectForm(toDoForm);
});
