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
dom.startListeners();
