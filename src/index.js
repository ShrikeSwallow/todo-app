import "./styles.css";
import { format, compareAsc } from "date-fns";
import { ProjectManager } from "./objectManagers.js";
import { Project } from "./classes";

console.log("Loading succesful");
const test = new ProjectManager();
test.addProject(new Project("testname", "testdate"));
