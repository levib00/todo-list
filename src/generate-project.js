import { getListingElements } from "./generate-listing"
export {addNewProject, updateDom} 

export default function doSomething() {
    
}

let projectArray = [];

function updateDom() {
    getDomElements.domElements.projectHeaderTitle.textContent = projectArray[this.id].title;
    getDomElements.domElements.projectHeaderDate.textContent = projectArray[this.id].dueDate;
    getDomElements.domElements.projectChecklist.textContent = projectArray[this.id].checklist;
    getDomElements.domElements.projectDescription.textContent = projectArray[this.id].description;
    getDomElements.domElements.projectNotes.textContent = projectArray[this.id].notes;
    
    /*function selectRadioButton() {
        if (status === "Read") {
            readCheckbox.checked = true;
        } else if (status === "Unread") {
            unreadCheckbox.checked = true;
        } else if (status === "DNF") {
            dnfCheckbox.checked = true;
        } else if (status === "Reading") {
            readingCheckbox.checked = true;
        }
    }*/
}

function Project(title, dueDate, checklist, description, notes, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.checklist = checklist;
    this.description = description;
    this.notes = notes;
    this.priority = priority;
}


function addProjectToArray(title, dueDate, checklist, description, notes, priority) {
    const project = new Project(title, dueDate, checklist, description, notes, priority);
    projectArray.push(project);
    
    console.log(projectArray)
    console.log(project)
}
function addNewProject() {
    const title = getListingElements.domElements.projectNameIn.value;
    const dueDate = getListingElements.domElements.dueDateIn.value;
    const checklist = /*checklistTextBox.value*/ null;
    const description = /*descriptionTextBox.value*/ null;
    const notes = /*NotesTextBox.value;*/ null;
    const priority = getListingElements.domElements.priorityIn.value;
    
    //if (title === "" || author === "" || pages === "" || status === "") 
    //{
      //  return
    //}

    addProjectToArray(title, dueDate, checklist, description, notes, priority);    
}

const getDomElements = (() => {
    const domElements = {
        projectHeaderTitle : document.getElementById('project-header-subtitle'),
        projectHeaderDate : document.getElementById('project-date'),
        projectChecklist : document.getElementById('checklist-text'),
        projectDescription : document.getElementById('description-text'),
        projectNotes : document.getElementById('notes-text'),
        projectPriority : document.getElementById('priority')
        
    }
    return {domElements}
})()

const doSomethingElse = (() => {

    return {}
})()