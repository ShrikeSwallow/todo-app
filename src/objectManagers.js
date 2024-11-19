import { Project, ToDo } from "./classes.js";
export class ProjectManager {
  //Top level methods
  constructor() {
    if (ProjectManager.instance) {
      return ProjectManager.instance;
    }
    ProjectManager.instance = this;
    this.projects = [new Project("Default", "2000-12-12")];
    this.default = this.projects[0];
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
  deleteProject(project) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }
  getProjects() {
    return this.projects;
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
  getToDos(project) {
    return project.todos;
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
