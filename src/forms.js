export class Forms {
  constructor() {
    if (Forms.instance) {
      return Forms.instance;
    }
    Forms.instance = this;
    this.forms = document.querySelector(".forms-container");
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
    /*basic data input implementation
    dueDateInput.type = "date";
    */
    dueDate.type = "text";
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
    });
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
