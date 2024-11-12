import "./styles.css";
import { format, compareAsc } from "date-fns";
import { ProjectManager } from "./objectManagers.js";
import { Project, ToDo } from "./classes";
import { DOMManager } from "./domManager.js";

console.log("Loading succesful");

const dom = new DOMManager();
dom.initialize();
