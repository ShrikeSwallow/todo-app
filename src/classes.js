class Task {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
    this.isComplete = false;
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
}

export class ToDo extends Task {
  constructor(name, dueDate, description, priority, notes) {
    super(name, dueDate);
    this.description = description;
    this.priority = priority;
    this.notes = notes;
  }
}
