class Task {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
    this.isComplete = false;
  }
  set rename(newName) {
    this.name = newName;
  }
  set changeDate(newDate) {
    this.dueDate = newDate;
  }
  complete() {
    this.isComplete = true;
  }
  delete() {
    delete this;
  }
}

export class Project extends Task {
  constructor(name, dueDate) {
    super(name, dueDate);
    this.todos = [];
  }
  addToDo(todo) {
    this.todos.push(todo);
  }
}

export class ToDo extends Task {
  constructor(name, dueDate, description, priority, notes) {
    super(name, dueDate);
    this.description = description;
    this.priority = priority;
    this.notes = notes;
  }
  set changeDescription(newDescription) {
    this.description = newDescription;
  }
  set changePriority(priority) {
    this.priority = priority;
  }
  set changeNotes(newNotes) {
    this.notes = newNotes;
  }
}
