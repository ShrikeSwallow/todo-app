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
  }
  showAllProjects() {
    this.projects.forEach((project) => {
      console.log(project.todos);
    });
  }

  //Project level methods
  addToDo(todo, project = this.default) {
    project.todos.push(todo);
  }
  moveToDo(todo, projectSrc, projectTrg) {
    projectSrc.todos.splice(projectSrc.todos.indexOf(todo), 1);
    projectTrg.todos.push(todo);
  }
  removeToDo(todo, project) {
    project.todos.splice(project.todos.indexOf(todo), 1);
  }
  showAllToDos(project) {}

  //ToDo level methods
  renameToDo(todo, newName) {
    todo.rename = newName;
  }
  changeToDoDueDate(todo, newDate) {
    todo.changeDate = newDate;
  }
  changeToDoDescription(todo, newDescription) {
    todo.changeDescription = newDescription;
  }
  changeToDoPriority(todo, newPriority) {
    todo.changePriority = newPriority;
  }
  changeToDoNotes(todo, newNotes) {
    todo.changeNotes = newNotes;
  }
  completeToDo(todo) {
    todo.complete();
  }
}
