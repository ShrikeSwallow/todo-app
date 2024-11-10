import { Project, ToDo } from "./classes.js";
const addNewProject = (project) => {
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
