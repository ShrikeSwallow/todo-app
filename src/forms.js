import { format, parse } from "date-fns";

export class Forms {
  constructor() {
    if (Forms.instance) {
      return Forms.instance;
    }
    Forms.instance = this;
    //this.forms = document.querySelector(".forms-container");
  }
  convertTextToDate(input) {
    if (input.value === "") {
      input.value = format(new Date(), "yyyy-MM-dd");
    } else
      input.value = format(
        parse(input.value, "dd MMM yy", new Date()),
        "yyyy-MM-dd"
      );
    input.type = "date";
  }
  convertDateToText(input) {
    input.type = "type";
    input.value = format(
      parse(input.value, "yyyy-MM-dd", new Date()),
      "dd MMM yy"
    );
    const placeholder = input.value ?? "Deadline...";
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
    dueDateInput.value = `${format(new Date(), "dd MMM yy")}`;
    dueDateInput.placeholder = "Deadline...";
    dueDateInput.required = true;

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", dueDateInput.id);
    dueDateLabel.textContent = "Due Date";

    dueDate.appendChild(dueDateLabel);
    dueDate.appendChild(dueDateInput);
    fieldset.appendChild(dueDate);
    dueDateInput.addEventListener("mouseover", (event) => {
      if (event.target.type === "text")
        this.convertTextToDate(event.currentTarget);
    });
    dueDateInput.addEventListener("blur", (event) => {
      if (event.target.type === "date")
        this.convertDateToText(event.currentTarget);
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
  newToDo() {
    const main = document.querySelector("main");
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
    priorityDropdown.title = "todo-priority";
    priorityDropdown.name = "todo-priority";
    priorityDropdown.id = "todo-priority";
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
    main.appendChild(form);
  }
  editToDoForm() {
    const main = document.querySelector("main");
    const form = document.createElement("form");
    form.classList.add("form-edit-todo", "hidden");

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Edit ToDo";
    fieldset.appendChild(legend);

    //create Header div specifically for Edit Form
    //which contains name div, TODO completion and option to move TODO to another project
    const editHeader = document.createElement("div");
    editHeader.classList.add("edit-header");

    //create TODO name div and its elements
    const name = document.createElement("div");
    name.classList.add("form-field", "name-field");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "edit-todo-name";
    nameInput.name = "edit-todo-name";
    nameInput.placeholder = "ToDo Name...";
    nameInput.required = true;

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", nameInput.id);
    nameLabel.textContent = "ToDo Name";

    name.appendChild(nameLabel);
    name.appendChild(nameInput);
    editHeader.appendChild(name);
    //end of project name section

    //create a dropdown to choose a project todo should move to
    const moveToDo = document.createElement("div");
    moveToDo.classList.add("form-field", "move-to-do-field");
    const projectDropdown = document.createElement("select");
    projectDropdown.title = "edit-todo-project";
    projectDropdown.name = "edit-todo-project";
    projectDropdown.id = "edit-todo-project";

    const projectLabel = document.createElement("label");
    projectLabel.setAttribute("for", projectDropdown.id);
    projectLabel.textContent = "Project:";

    moveToDo.appendChild(projectLabel);
    moveToDo.appendChild(projectDropdown);

    editHeader.appendChild(moveToDo);
    //end of project dropdown section

    //create checkbox for ToDo completion
    const complete = document.createElement("div");
    complete.classList.add("form-field", "complete-checkbox");

    const completeBox = document.createElement("input");
    completeBox.type = "checkbox";
    completeBox.id = "edit-todo-complete";
    completeBox.name = "edit-todo-complete";
    completeBox.value = "true";

    const completeLabel = document.createElement("label");
    completeLabel.setAttribute("for", completeBox.id);
    completeLabel.textContent = "Mark as completed";

    complete.appendChild(completeBox);
    complete.appendChild(completeLabel);

    editHeader.appendChild(complete);
    //end of complete checkbox section

    fieldset.appendChild(editHeader);
    //end of Edit From Header Section

    //create due date div and its elements
    const dueDate = document.createElement("div");
    dueDate.classList.add("form-field", "date-field");

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "text";
    dueDateInput.id = "edit-todo-due-date";
    dueDateInput.name = "edit-todo-due-date";
    dueDateInput.placeholder = "DD/MM/YYYY";
    dueDateInput.required = true;

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", dueDateInput.id);
    dueDateLabel.textContent = "Due Date";

    dueDate.appendChild(dueDateLabel);
    dueDate.appendChild(dueDateInput);
    fieldset.appendChild(dueDate);
    dueDateInput.addEventListener("mouseover", (event) => {
      this.convertTextToDate(event.currentTarget);
    });
    dueDateInput.addEventListener("blur", (event) => {
      this.convertDateToText(event.currentTarget);
    });
    //end of todo due date section

    //create priority div and its elements
    const priority = document.createElement("div");
    priority.classList.add("form-field", "priority-field");

    const priorityDropdown = document.createElement("select");
    priorityDropdown.title = "edit-todo-priority";
    priorityDropdown.name = "edit-todo-priority";
    priorityDropdown.id = "edit-todo-priority";
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
    descriptionInput.id = "edit-todo-description";
    descriptionInput.name = "edit-todo-description";
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
    notesArea.id = "edit-todo-notes";
    notesArea.name = "edit-todo-notes";
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
    main.appendChild(form);
  }
}
