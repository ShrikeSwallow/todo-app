import { Project, ToDo } from "./classes.js";
class ProjectManager {
  constructor() {
    this.projects = [new Project("Default", "")];
    this.completedProjects = [];
  }
  addProject(project) {
    this.projects.push(project);
  }
  completeProject(project) {
    project.complete();
    this.completedProjects.push(this.projects.splice(indexOf(project), 1));
  }
  deleteProject(project) {
    this.projects.splice(indexOf(project), 1);
    project.delete();
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
