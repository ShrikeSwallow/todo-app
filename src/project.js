export default class Project {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
    this.todos = [];
    this.isComplete = false;
  }
  delete() {
    delete this;
  }
}
