export class Forms {
  constructor() {
    if (Forms.instance) {
      return Forms.instance;
    }
    Forms.instance = this;
    this.forms = document.querySelector(".forms-container");
  }
  newProject() {
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
    cancelBtn.type = "reset";
    cancelBtn.textContent = "Cancel";
    fieldset.appendChild(cancelBtn);

    form.appendChild(fieldset);
    this.forms.appendChild(form);
  }
  editProject(project) {
    const form = document.createElement("form");
  }
}
