import { Project, ToDo } from "./classes.js";
export class ProjectManager {
  constructor() {
    this.projects = [new Project("Default", "")];
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
}

/*const addNewProject = (project) => {
  return new Project(project);
};
const deleteProject = (project) => {
  project.delete();
};
const changeDueDate = (project, date) => {
  project.dueDate = date;
};
const completeProject = (project) => {
  project.isComplete = true;
};
*/
