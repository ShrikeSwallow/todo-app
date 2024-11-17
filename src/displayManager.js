import { ProjectManager } from "./objectManagers";
import { Forms } from "./forms";
import plusSVG from "./images/plus.svg";
export class DisplayManager {
  constructor() {
    if (DisplayManager.instance) {
      return DisplayManager.instance;
    }
    DisplayManager.instance = this;
    this.PM = new ProjectManager();
    this.forms = new Forms();
  }
  drawAll() {
    const projects = document.querySelector(".projects");
    const completedProjects = document.querySelector(".completed-projects");
    this.drawSidebarProjects(this.PM.getProjects(), projects);
    this.drawAddProjectButton(projects);
    this.drawSidebarProjects(this.PM.getCompletedProjects(), completedProjects);
    //this.forms.newProject();
  }
  drawAddProjectButton(target) {
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-project-btn");
    addProjectButton.setAttribute("type", "button");
    addProjectButton.textContent = "Add Project";
    target.appendChild(addProjectButton);
    this.forms.newProject(target);
  }
  drawAddTodoButton(target) {
    const card = document.createElement("div");
    card.classList.add("todo-card", "add-todo-button-container");
    const plusSign = document.createElement("img");
    plusSign.src = plusSVG;
    plusSign.alt = "Add ToDo";
    card.appendChild(plusSign);
    target.appendChild(card);
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
    content.innerHTML = `<h2 class="content-header">ToDos in project <em>${project.name}</em></h2><div class="container"></div>`;
    const container = document.querySelector(".container");
    const todos = this.PM.getToDos(project);
    console.log("This should generate in the main body:", todos);
    todos.forEach((todo) => {
      const card = document.createElement("div");
      card.classList.add("todo-card");
      if (todo.isComplete) {
        card.classList.add("todo-complete");
      }

      //Card header including todo title and action icons
      const todoHeader = document.createElement("div");
      todoHeader.classList.add("todo-header");

      const name = document.createElement("h3");
      name.textContent = `${todo.name}`;
      todoHeader.appendChild(name);

      const actions = document.createElement("ul");
      actions.classList.add("todo-icons");

      const priority = document.createElement("li");
      const priorityLevel = `priority-${todo.priority}`;
      priority.classList.add(priorityLevel);
      priority.textContent = "■";
      actions.append(priority);

      const edit = document.createElement("li");
      edit.classList.add("edit-icon");
      edit.textContent = "⋯";
      actions.appendChild(edit);

      const del = document.createElement("li");
      del.classList.add("delete-icon");
      del.textContent = "✗";
      actions.appendChild(del);

      todoHeader.appendChild(actions);
      //end of header sections, all todos below are separated by empty line

      const description = document.createElement("p");
      description.classList.add("description");
      description.textContent = `${todo.description}`;

      const date = document.createElement("p");
      date.classList.add("due-date");
      date.textContent = `Due Date: ${todo.dueDate}`;

      const notes = document.createElement("p");
      notes.classList.add("notes");
      notes.textContent = `${todo.notes}`;

      card.appendChild(todoHeader);
      card.appendChild(description);
      card.appendChild(date);
      card.appendChild(notes);

      container.appendChild(card);
    });
    this.drawAddTodoButton(container);
    this.forms.newToDo(container);
  }
}
