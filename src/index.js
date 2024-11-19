import "./styles.css";
import { format, compareAsc } from "date-fns";
import { ProjectManager } from "./objectManagers.js";
import { Project, ToDo } from "./classes";
import { DisplayManager } from "./displayManager.js";
import { DOMManager } from "./domManager.js";

console.log("Loading succesful");

const dom = new DOMManager();
const display = new DisplayManager();
const PM = new ProjectManager();
dom.initialize();

const addProjectBtn = document.querySelector(".add-project-btn");
const projectForm = document.querySelector(".form-new-project");
const projectName = document.querySelector("#project-name");
const projectDueDate = document.querySelector("#project-due-date");
const liveProjects = document.querySelector(".live-projects");
let allProjects = document.querySelectorAll(".project");

const highlighter = () => {
  allProjects.forEach((project) => {
    project.addEventListener("click", (event) => {
      allProjects.forEach((project) => project.classList.remove("active"));
      console.log(event.currentTarget.dataset.index);
      display.highlightActive(event.currentTarget);
      let activeProject = PM.projects[event.currentTarget.dataset.index];
      display.drawContentTodos(activeProject);
    });
  });
};

highlighter();
addProjectBtn.addEventListener("click", () => {
  display.toggleProjectForm(projectForm);
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  dom.PM.addProject(new Project(projectName.value, projectDueDate.value));
  display.drawSidebarProjects(PM.getProjects(), liveProjects);
  display.toggleProjectForm(projectForm);
  console.log((allProjects = document.querySelectorAll(".project")));
  allProjects = document.querySelectorAll(".project");
  highlighter();
});
