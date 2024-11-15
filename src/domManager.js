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
  }

  addTodo() {}
  addProject() {}
}
