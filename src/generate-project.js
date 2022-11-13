import { getListingElements } from "./generate-listing"
export {addNewProject, updateDom} 

export default function doSomething() {
    
}

let projectArray = [];

function updateDom() {
    let currentProject = this.id //refactoring should fix bugs associated with multiple event listeners. will have to return this from this function to be used in edit/return functions.
    let executed = false;
    console.log(projectArray)
    getDomElements.domElements.projectHeaderTitle.textContent = projectArray[this.id].title;
    getDomElements.domElements.projectHeaderDate.textContent = projectArray[this.id].dueDate;
    getDomElements.domElements.projectChecklist.innerHTML = projectArray[this.id].checklist;
    getDomElements.domElements.projectDescription.textContent = projectArray[this.id].description;
    getDomElements.domElements.projectNotes.textContent = projectArray[this.id].notes;
    
    let checklistEdit = document.getElementById('checklist-edit');
    checklistEdit.addEventListener('click', editChecklist,false)

    function editChecklist() {
        var enterText = document.createElement('button')
        let checklistTextBox = null
        let checklistText = null
        if (!executed) {
            const checklistItem = document.createElement('div');
            checklistItem.setAttribute('class','checklist-item');
            getDomElements.domElements.projectChecklist.appendChild(checklistItem)

            const checkboxContainer = document.createElement('label');
            checkboxContainer.setAttribute('class','checkbox-container');
            checklistItem.appendChild(checkboxContainer);

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type','checkbox')
            checkbox.setAttribute('class','check-button');
            checkboxContainer.appendChild(checkbox);

            const checkmark = document.createElement('span');
            checkmark.setAttribute('class','checkmark');
            checkboxContainer.appendChild(checkmark)

            const element = this.parentNode.children[1]
            enterText.setAttribute('class','enter-button')
            enterText.textContent = 'Enter'
            this.parentNode.insertBefore(enterText,element);
            

            checklistText = document.createElement('div');
            checklistText.setAttribute('class','project-text');
            checklistItem.appendChild(checklistText);

            checklistTextBox = document.createElement('textarea');
            checklistText.appendChild(checklistTextBox)
            
            executed = true
        }

        enterText.removeEventListener('click', enterEdit, false)
        enterText.addEventListener('click', enterEdit, false)
        function enterEdit() {
            checklistText.textContent = checklistTextBox.value;
            projectArray[currentProject].checklist = getDomElements.domElements.projectChecklist.innerHTML
            enterText.remove();
            checklistTextBox.remove();
            executed = false
        }
    }

    let notesEdit = document.getElementById('notes-edit');
    notesEdit.removeEventListener('click', editNotes, false)
    notesEdit.addEventListener('click', editNotes, false)

    function editNotes() {
        var enterNotesText = document.createElement('button')
        let notesTextBox = null

        if (!executed) {
            const element = this.parentNode.children[1]
            enterNotesText.setAttribute('class','enter-button')
            enterNotesText.textContent = 'Enter'
            this.parentNode.insertBefore(enterNotesText,element);

            const temp = getDomElements.domElements.projectNotes.textContent
            getDomElements.domElements.projectNotes.textContent = ''

            notesTextBox = document.createElement('textarea');
            getDomElements.domElements.projectNotes.appendChild(notesTextBox)

            notesTextBox.textContent = temp
            
            executed = true

            enterNotesText.removeEventListener('click', enterEdit, false)
            enterNotesText.addEventListener('click', enterEdit, false)

            function enterEdit() {
                console.log('dab')
                getDomElements.domElements.projectNotes.textContent = notesTextBox.value;
                projectArray[currentProject].notes = getDomElements.domElements.projectNotes.textContent
                enterNotesText.remove();
                notesTextBox.remove();
                executed = false
            }
        }
    }

    let descriptionEdit = document.getElementById('description-edit');
    descriptionEdit.removeEventListener('click', editDescription, false)
    descriptionEdit.addEventListener('click', editDescription, false)

    function editDescription() {
        var enterDescriptionText = document.createElement('button')
        let descriptionTextBox = null

        if (!executed) {
            const element = this.parentNode.children[1]
            enterDescriptionText.setAttribute('class','enter-button')
            enterDescriptionText.textContent = 'Enter'
            this.parentNode.insertBefore(enterDescriptionText,element);

            const temp = getDomElements.domElements.projectDescription.textContent
            getDomElements.domElements.projectDescription.textContent = ''

            descriptionTextBox = document.createElement('textarea');
            getDomElements.domElements.projectDescription.appendChild(descriptionTextBox)

            descriptionTextBox.textContent = temp
            

            executed = true

            enterDescriptionText.removeEventListener('click', enterEdit, false)
            enterDescriptionText.addEventListener('click', enterEdit, false)
            
            function enterEdit() {
                console.log('dab')
                getDomElements.domElements.projectDescription.textContent = descriptionTextBox.value;
                projectArray[currentProject].description = getDomElements.domElements.projectDescription.textContent
                enterDescriptionText.remove();
                descriptionTextBox.remove();
                executed = false
            }
        }
    }

    const lowPrioCheckbox = document.getElementById('low-prio');
    const medPrioCheckbox = document.getElementById('medium-prio');
    const highPrioCheckbox = document.getElementById('high-prio');
    
    function selectRadioButton() {
        if (projectArray[currentProject].priority === "low") {
            lowPrioCheckbox.checked = true;
        } else if (projectArray[currentProject].priority === "med") {
            medPrioCheckbox.checked = true;
        } else if (projectArray[currentProject].priority === "high") {
            highPrioCheckbox.checked = true;
        }
    }
    selectRadioButton()
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