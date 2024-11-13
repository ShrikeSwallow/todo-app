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
    const projects = document.querySelector(".projects");
    const completedProjects = document.querySelector(".completed-projects");
    this.drawSidebarProjects(this.PM.getProjects(), projects);

    this.drawSidebarProjects(this.PM.getCompletedProjects(), completedProjects);
  }
  drawAddTodoButton() {}
  drawSidebarTodos(dataSource, targetElement) {
    const nestedList = targetElement.querySelector("ul");
    nestedList.innerHTML = `<li>
              <span class="todo-status">x</span>
              <span class="todo-name">TODO:</span>
              <span class="todo-due-date"></span>
            </li>`;
    dataSource.forEach((item) => {
      const listItem = document.createElement("li");

      const spanStatus = document.createElement("span");
      spanStatus.classList.add("todo-status");
      spanStatus.textContent = `X`;

      const spanName = document.createElement("span");
      spanName.classList.add("todo-name");
      spanName.textContent = `TODO: ${item.name}`;

      const spanDate = document.createElement("span");
      spanDate.classList.add("todo-due-date");
      spanDate.textContent = `${item.dueDate}`;

      listItem.appendChild(spanStatus);
      listItem.appendChild(spanName);
      listItem.appendChild(spanDate);

      nestedList.appendChild(listItem);
    });
  }
  drawSidebarProjects(dataSource, targetElement) {
    const list = targetElement.querySelector("ul");
    list.innerHTML = `<li>
              <span class="project-name">Project Name</span>
              <span class="due-date">Due Date</span>
              <span class="expand"></span>
            </li>`;
    dataSource.forEach((item) => {
      const listItem = document.createElement("li");

      const spanName = document.createElement("span");
      spanName.classList.add("project-name");
      spanName.textContent = `${item.name}`;

      const spanDate = document.createElement("span");
      spanDate.classList.add("due-date");
      spanDate.textContent = `${item.dueDate}`;

      const spanExpand = document.createElement("span");
      spanExpand.classList.add("expand");
      const spanExpanded = document.createElement("span");
      spanExpanded.classList.add("expanded");
      spanExpanded.textContent = `-`;
      const spanCollapsed = document.createElement("span");
      spanCollapsed.classList.add("collapsed");
      spanCollapsed.textContent = `+`;
      spanExpand.appendChild(spanCollapsed);
      spanExpand.appendChild(spanExpanded);

      listItem.appendChild(spanName);
      listItem.appendChild(spanDate);
      listItem.appendChild(spanExpand);

      const todos = document.createElement("ul");
      todos.classList.add("todos-list");
      listItem.appendChild(todos);

      //the below may not work, in such a case, use this.drawSidebarTodos(item.todos, listItem)
      this.drawSidebarTodos(this.PM.getToDos(item), listItem);

      list.appendChild(listItem);
    });
  }
}
