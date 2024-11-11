import { Project, ToDo } from "./classes.js";
export class ProjectManager {
  //Top level methods
  constructor() {
    this.projects = [new Project("Default", "")];
    this.default = this.projects[0];
    this.completedProjects = [];
  }
  addProject(project) {
    this.projects.push(project);
  }
  renameProject(project, newName) {
    this.projects[this.projects.indexOf(project)].rename = newName;
  }
  changeProjectDueDate(project, newDate) {
    this.projects[this.projects.indexOf(project)].changeDate = newDate;
  }
  completeProject(project) {
    project.complete();
    this.completedProjects.push(
      this.projects.splice(this.projects.indexOf(project), 1)
    );
  }
  deleteProject(project) {
    this.projects.splice(this.projects.indexOf(project), 1);
    project.delete();
  }
  showAllProjects() {
    this.projects.forEach((project) => {
      console.log(project);
    });
  }

  //Project level methods
  addToDo(todo, project = this.default) {
    project.todos.push(todo);
  }
  moveToDo(todo, projectSrc, projectTrg) {
    projectTrg.todos.push(
      projectSrc.todos.splice(projectSrc.todos.indexOf(todo), 1)
    );
  }
}

export class TaskManager {}
