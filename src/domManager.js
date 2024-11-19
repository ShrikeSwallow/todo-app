import { ToDo } from "./classes";
import { ProjectManager } from "./objectManagers";
import { DisplayManager } from "./displayManager";

export class DOMManager {
  constructor() {
    if (DOMManager.instance) {
      return DOMManager.instance;
    }
    DOMManager.instance = this;
    this.display = new DisplayManager();
    this.PM = new ProjectManager();
    this.activeProject = this.PM.default;
  }
  initialize() {
    /* test section 
    with fixed data*/
    const testTodo = new ToDo(
      "test1",
      "2024-1-1",
      "test description",
      "low",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum molestie diam. Quisque placerat sapien sed erat maximus, ac placerat turpis iaculis. In et auctor nibh, in placerat risus. Fusce pellentesque viverra quam, id dignissim libero hendrerit id. Proin quis iaculis nunc. Sed aliquam non elit vitae rhoncus. Vestibulum feugiat. "
    );
    const testTodo2 = new ToDo(
      "test2",
      "2024-1-1",
      "test description",
      "medium",
      "test notes"
    );
    const testTodo3 = new ToDo(
      "test3",
      "2024-1-1",
      "test description",
      "high",
      "test notes"
    );
    const testTodo4 = new ToDo(
      "test4",
      "2024-1-1",
      "test description",
      "medium",
      "test notes"
    );
    const testTodo5 = new ToDo(
      "test5",
      "2024-1-1",
      "test description",
      "low",
      " molestie diam. Quisque  turpis quam, id dignissim libero hendrerit id. Proin quis iaculis nunc. Sed aliquam non elit vitae rhoncus. Vestibulum feugiat. "
    );
    this.PM.addToDo(testTodo);
    this.PM.addToDo(testTodo2);
    this.PM.addToDo(testTodo3);
    this.PM.addToDo(testTodo4);
    this.PM.addToDo(testTodo5);
    this.PM.completeToDo(testTodo);
    //end of test data section
    this.display.drawAll();
  }
}
