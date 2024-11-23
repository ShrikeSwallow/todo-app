import { ProjectManager } from "./objectManagers";

export class StorageManager {
  constructor() {
    if (StorageManager.instance) {
      return StorageManager.instance;
    }
    StorageManager.instance = this;
    this.PM = new ProjectManager();
  }

  storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  loadStoredProjects() {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    this.PM.projects = storedProjects;
  }
  updateStoredProjects() {
    localStorage.setItem("projects", JSON.stringify(this.PM.projects));
  }
}
