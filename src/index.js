import "./styles.css";
import { format, compareAsc } from "date-fns";
import { ProjectManager } from "./objectManagers.js";
import { Project, ToDo } from "./classes";

console.log("Loading succesful");
const PM = new ProjectManager();
PM.addProject(new Project("testname", "testdate"));
const testTodo = PM.addToDo(
  new ToDo("TodoTest", "tomorrow", "test Description", "Low", "")
);
PM.showAllProjects();
PM.moveToDo(testTodo, PM.projects[0], PM.projects[1]);
console.log("After moving todo");
PM.showAllProjects();
