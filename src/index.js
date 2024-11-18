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
const liveProjects = document.querySelector(".projects");
const allProjects = document.querySelectorAll(".project");

addProjectBtn.addEventListener("click", () => {
  display.toggleProjectForm(projectForm);
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  dom.PM.addProject(new Project(projectName.value, projectDueDate.value));
  display.drawSidebarProjects(PM.getProjects(), liveProjects);
  display.toggleProjectForm(projectForm);
});

allProjects.forEach((project) => {
  project.addEventListener("click", (event) => {
    allProjects.forEach((project) => project.classList.remove("active"));
    display.highlightActive(event.currentTarget);
  });
});
