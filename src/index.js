import "./styles.css";
import { format, compareAsc } from "date-fns";
import { ProjectManager } from "./objectManagers.js";
import { Project, ToDo } from "./classes";

console.log("Loading succesful");

const PM = new ProjectManager();
PM.addProject(new Project("testname", "testdate"));
const testTodo = new ToDo(
  "TodoTest",
  "tomorrow",
  "test Description",
  "Low",
  ""
);
PM.addToDo(testTodo);
console.log("After moving todo");
PM.showAllProjects();
PM.moveToDo(testTodo, PM.projects[0], PM.projects[1]);
console.log("After moving todo");
PM.showAllProjects();
/*PM.removeToDo(testTodo, PM.projects[1]);
PM.showAllProjects();*/
