export class Forms {
  constructor() {
    if (Forms.instance) {
      return Forms.instance;
    }
    Forms.instance = this;
    //this.forms = document.querySelector(".forms-container");
  }
  convertTextToDate(input) {
    input.type = "date";
  }
  convertDateToText(input) {
    const placeholder = input.value ?? "DD-MM-YYYY";
    input.type = "type";
    input.placeholder = placeholder;
  }
  newProject() {
    const projects = document.querySelector(".live-projects");
    const form = document.createElement("form");
    form.classList.add("form-new-project", "hidden");

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "New Project";
    fieldset.appendChild(legend);

    //create project name div and its elements
    const name = document.createElement("div");
    name.classList.add("form-field");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "project-name";
    nameInput.name = "project-name";
    nameInput.placeholder = "Project Name...";
    nameInput.required = true;

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", nameInput.id);
    nameLabel.textContent = "Project Name";

    name.appendChild(nameLabel);
    name.appendChild(nameInput);
    fieldset.appendChild(name);
    //end of project name section

    //create due date div and its elements
    const dueDate = document.createElement("div");
    dueDate.classList.add("form-field");

    const dueDateInput = document.createElement("input");
    /*basic data input implementation
    dueDateInput.type = "date";
    */
    dueDateInput.type = "text";
    dueDateInput.id = "project-due-date";
    dueDateInput.name = "project-due-date";
    dueDateInput.placeholder = "DD/MM/YYYY";
    dueDateInput.required = true;

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", dueDateInput.id);
    dueDateLabel.textContent = "Due Date";

    dueDate.appendChild(dueDateLabel);
    dueDate.appendChild(dueDateInput);
    fieldset.appendChild(dueDate);
    dueDateInput.addEventListener("mouseover", (event) => {
      console.log("Mouse over date");
      this.convertTextToDate(event.currentTarget);
    });
    dueDateInput.addEventListener("blur", (event) => {
      console.log("Mouse outside date");
      this.convertDateToText(event.currentTarget);
      console.log(dueDateInput.value);
    });
    //end of project due date section

    //create buttons
    const buttons = document.createElement("div");
    buttons.classList.add("form-field", "form-buttons");
    const okBtn = document.createElement("button");
    okBtn.classList.add("form-add-btn");
    okBtn.type = "submit";
    okBtn.textContent = "Ok";
    buttons.appendChild(okBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("form-cancel-btn");
    cancelBtn.type = "reset";
    cancelBtn.textContent = "Cancel";
    buttons.appendChild(cancelBtn);
    fieldset.appendChild(buttons);

    form.appendChild(fieldset);
    projects.appendChild(form);
  }
  newToDo(target) {
    const form = document.createElement("form");
    form.classList.add("form-new-todo", "hidden");

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "New ToDo";
    fieldset.appendChild(legend);

    //create TODO name div and its elements
    const name = document.createElement("div");
    name.classList.add("form-field");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "todo-name";
    nameInput.name = "todo-name";
    nameInput.placeholder = "ToDo Name...";
    nameInput.required = true;

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", nameInput.id);
    nameLabel.textContent = "ToDo Name";

    name.appendChild(nameLabel);
    name.appendChild(nameInput);
    fieldset.appendChild(name);
    //end of project name section

    //create due date div and its elements
    const dueDate = document.createElement("div");
    dueDate.classList.add("form-field", "date-field");

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "text";
    dueDateInput.id = "todo-due-date";
    dueDateInput.name = "todo-due-date";
    dueDateInput.placeholder = "DD/MM/YYYY";
    dueDateInput.required = true;

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", dueDateInput.id);
    dueDateLabel.textContent = "Due Date";

    dueDate.appendChild(dueDateLabel);
    dueDate.appendChild(dueDateInput);
    fieldset.appendChild(dueDate);
    dueDateInput.addEventListener("mouseover", (event) => {
      console.log("Mouse over date");
      this.convertTextToDate(event.currentTarget);
    });
    dueDateInput.addEventListener("blur", (event) => {
      console.log("Mouse outside date");
      this.convertDateToText(event.currentTarget);
      console.log(dueDateInput.value);
    });
    //end of todo due date section

    //create priority div and its elements
    const priority = document.createElement("div");
    priority.classList.add("form-field", "priority-field");

    const priorityDropdown = document.createElement("select");
    priorityDropdown.title = "priority";
    priorityDropdown.name = "priority";
    priorityDropdown.id = "priority";
    const priorities = ["Low", "Medium", "High"];
    priorities.forEach((priority) => {
      const option = document.createElement("option");
      option.value = priority.toLowerCase();
      option.textContent = priority;
      priorityDropdown.appendChild(option);
    });
    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", priorityDropdown.id);
    priorityLabel.textContent = "Priority:";

    priority.appendChild(priorityLabel);
    priority.appendChild(priorityDropdown);
    fieldset.appendChild(priority);
    //end of priority section;

    //create TODO description div and its elements
    const description = document.createElement("div");
    description.classList.add("form-field");

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.id = "todo-description";
    descriptionInput.name = "todo-description";
    descriptionInput.placeholder = "Description...";

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", descriptionInput.id);
    descriptionLabel.textContent = "Description";

    description.appendChild(descriptionLabel);
    description.appendChild(descriptionInput);
    fieldset.appendChild(description);
    //end of description section

    //create TODO notes div and its elements
    const notes = document.createElement("div");
    notes.classList.add("form-field");

    const notesArea = document.createElement("textarea");
    notesArea.id = "todo-notes";
    notesArea.name = "todo-notes";
    notesArea.placeholder = "Notes...";
    notesArea.rows = "4";

    const notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", notesArea.id);
    notesLabel.textContent = "Notes";

    notes.appendChild(notesLabel);
    notes.appendChild(notesArea);
    fieldset.appendChild(notes);
    //end of notes section

    //create buttons
    const buttons = document.createElement("div");
    buttons.classList.add("form-field", "form-buttons");
    const okBtn = document.createElement("button");
    okBtn.classList.add("form-add-btn");
    okBtn.type = "submit";
    okBtn.textContent = "Ok";
    buttons.appendChild(okBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("form-cancel-btn");
    cancelBtn.type = "reset";
    cancelBtn.textContent = "Cancel";
    buttons.appendChild(cancelBtn);
    fieldset.appendChild(buttons);

    form.appendChild(fieldset);
    target.appendChild(form);
  }
  editProject(project) {
    const form = document.createElement("form");
    form.classList.add("form-edit-project", "hidden");

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `Edit ${project.name} details`;
    fieldset.appendChild(legend);

    //create project name div and its elements
    const name = document.createElement("div");
    name.classList.add("form-field");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "project-name";
    nameInput.name = "project-name";
    nameInput.placeholder = project.name;
    nameInput.required = true;

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", nameInput.id);
    nameLabel.textContent = "Project Name";

    name.appendChild(nameLabel);
    name.appendChild(nameInput);
    fieldset.appendChild(name);
    //end of project name section

    //create due date div and its elements
    const dueDate = document.createElement("div");
    name.classList.add("form-field");

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.id = "project-due-date";
    dueDateInput.name = "project-due-date";
    dueDateInput.required = true;

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", dueDateInput.id);
    dueDateLabel.textContent = "Project Name";

    dueDate.appendChild(dueDateLabel);
    dueDate.appendChild(dueDateInput);
    fieldset.appendChild(dueDate);
    //end of project due date section

    //create buttons
    const okBtn = document.createElement("button");
    okBtn.classList.add("form-add-btn");
    okBtn.type = "submit";
    okBtn.textContent = "Ok";
    fieldset.appendChild(okBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("form-cancel-btn");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    fieldset.appendChild(cancelBtn);

    form.appendChild(fieldset);
    this.forms.appendChild(form);
  }
}
