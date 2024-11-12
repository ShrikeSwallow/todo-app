import { ProjectManager } from "./objectManagers";

export class DOMManager {
  constructor() {
    if (DOMManager.instance) {
      return DOMManager.instance;
    }
    DOMManager.instance = this;
  }
  initialize() {
    const PM = new ProjectManager();
    const projects = document.querySelector(".projects");
    const completedProjects = document.querySelector(".completed-projects");
    this.drawSidebarUL(PM.getProjects(), projects);
    this.drawSidebarUL(PM.getCompletedProjects(), completedProjects);
  }
  drawSidebarUL(dataSource, targetElement) {
    const list = document.querySelector(".sidebar ul");
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
      list.appendChild(listItem);
    });
  }
}
