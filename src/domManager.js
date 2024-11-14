import { ToDo } from "./classes";
import { ProjectManager } from "./objectManagers";

export class DOMManager {
  constructor() {
    if (DOMManager.instance) {
      return DOMManager.instance;
    }
    DOMManager.instance = this;
    this.PM = new ProjectManager();
  }
  initialize() {
    /* test section 
    with fixed data*/
    const testTodo = new ToDo(
      "test1",
      "2024-1-1",
      "test description",
      "test priority",
      "test notes"
    );
    const testTodo2 = new ToDo(
      "test2",
      "2024-1-1",
      "test description",
      "test priority",
      "test notes"
    );
    const testTodo3 = new ToDo(
      "test3",
      "2024-1-1",
      "test description",
      "test priority",
      "test notes"
    );
    const testTodo4 = new ToDo(
      "test4",
      "2024-1-1",
      "test description",
      "test priority",
      "test notes"
    );
    const testTodo5 = new ToDo(
      "test5",
      "2024-1-1",
      "test description",
      "test priority",
      "test notes"
    );
    this.PM.addToDo(testTodo);
    this.PM.addToDo(testTodo2);
    this.PM.addToDo(testTodo3);
    this.PM.addToDo(testTodo4);
    this.PM.addToDo(testTodo5);
    console.log(testTodo);
    this.PM.completeToDo(testTodo);
    console.log(this.PM.projects[0]);
    //end of test data section

    const projects = document.querySelector(".projects");
    const completedProjects = document.querySelector(".completed-projects");
    this.drawSidebarProjects(this.PM.getProjects(), projects);
    this.drawAddProjectButton(projects);
    //this.drawSidebarProjects(this.PM.getCompletedProjects(), completedProjects);
  }
  drawAddProjectButton(target) {
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-project-btn");
    addProjectButton.setAttribute("type", "button");
    addProjectButton.textContent = "Add Project";
    target.appendChild(addProjectButton);
  }
  drawSidebarProjects(dataSource, targetElement) {
    const list = targetElement.querySelector("ul");
    list.innerHTML = `<li>
              <span class="project-name">Project Name</span>
              <span class="due-date">Due Date</span>
            </li>`;
    dataSource.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("project");

      const spanName = document.createElement("span");
      spanName.classList.add("project-name");
      spanName.textContent = `${item.name}`;

      const spanDate = document.createElement("span");
      spanDate.classList.add("due-date");
      spanDate.textContent = `${item.dueDate}`;

      listItem.appendChild(spanName);
      listItem.appendChild(spanDate);

      this.drawContentTodos(item);

      list.appendChild(listItem);
    });
  }
  drawContentTodos(project) {
    const content = document.querySelector(".content");
    content.innerHTML = `<h2 class="content-header">ToDo in project <em>${project.name}</em></h2><div class="container"></div>`;
    const container = document.querySelector(".container");
    const todos = this.PM.getToDos(project);
    console.log("This should generate in the main body:", todos);
    todos.forEach((todo) => {
      const card = document.createElement("div");
      card.classList.add("todo-card");

      container.appendChild(card);
    });
  }

  addTodo() {}
  addProject() {}
}
