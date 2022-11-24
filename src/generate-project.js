import { generateListingFunctions, getListingElements } from "./generate-listing"
import { checkboxFunctions } from './checklist-Functions'
import { editText } from "./edit-project"

export {projectFunctions, handleSelectedProject, getProjectDomElements} 

function handleSelectedProject() { //sets logic for buttons to edit individual projects 
    if (getProjectDomElements.projectLogic.currentProject) {
        try{
        checkboxFunctions.saveCheckboxes()
        } catch {
        }
    }

    getProjectDomElements.domElements.contentArea.setAttribute('class', '') //makes sure that contentArea doesn't still have unlickable class from delete-listing

    getProjectDomElements.projectLogic.currentProject = this.id
    
    let executed = false; //if true, edit buttons cant be pressed again until enter button is pressed.

    projectFunctions.updateDom()
    checkboxFunctions.setCheckboxes()

    //gives prototype attributes to differentiate which project is being worked on
    getProjectDomElements.domElements.notesEdit.thisSection = getProjectDomElements.domElements.projectNotes;
    getProjectDomElements.domElements.notesEdit.thisProperty = 'notes';
    getProjectDomElements.domElements.descriptionEdit.thisSection = getProjectDomElements.domElements.projectDescription;
    getProjectDomElements.domElements.descriptionEdit.thisProperty =  'description';
   
    if(getProjectDomElements.projectLogic.applyEventListeners) { //ensures that event listeners are only added once
        getProjectDomElements.domElements.notesEdit.addEventListener('click',function() {
            editText(this, executed);
        }, false);
        getProjectDomElements.domElements.descriptionEdit.addEventListener('click', function() {
            editText(this, executed);
        }, false);
        getProjectDomElements.domElements.checklistEdit.addEventListener('click', function() {
            getProjectDomElements.projectLogic.checklistBool = true;
            editText(this, executed)
        },false);
        getProjectDomElements.projectLogic.applyEventListeners = false
        for (const button of getProjectDomElements.domElements.prioButtons) {
            button.addEventListener('click', function() {
                generateListingFunctions.setPrioIndicator(this, getProjectDomElements.projectLogic.currentProject)
                getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].priority = this.value;
                localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
                localStorage.setItem('currentSidebar',JSON.stringify(document.getElementById('dates-container').innerHTML))
            })
        }
    }
    projectFunctions.selectRadioButton(getProjectDomElements.projectLogic.currentProject)
}

const getProjectDomElements = (() => {
    const domElements = { //holds domElements in content area
        projectHeaderTitle : document.getElementById('project-header-subtitle'),
        projectHeaderDate : document.getElementById('project-date'),
        projectChecklist : document.getElementById('checklist-text'),
        projectDescription : document.getElementById('description-text'),
        projectNotes : document.getElementById('notes-text'),
        projectPriority : document.getElementById('priority'),
        lowPrioCheckbox : document.getElementById('low-prio'),
        medPrioCheckbox : document.getElementById('medium-prio'),
        highPrioCheckbox : document.getElementById('high-prio'),
        prioButtons : document.getElementsByClassName('prio-button'),
        descriptionEdit : document.getElementById('description-edit'),
        notesEdit : document.getElementById('notes-edit'),
        checklistEdit : document.getElementById('checklist-edit'),
        contentArea : document.getElementById('project-content')
    }
    const projectLogic = { //holds some of the logic used in handle project button
        projectArray : [],
        applyEventListeners : true,
        currentProject : null,
        checklistBool : false,
    }
    return {domElements,projectLogic}
})()

const projectFunctions = (() => {
    function updateDom() {//updates dom to show current projects information
        getProjectDomElements.domElements.projectHeaderTitle.textContent = getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].title;
        getProjectDomElements.domElements.projectHeaderDate.textContent = getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].dueDate;
        getProjectDomElements.domElements.projectChecklist.innerHTML = getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checklist;
        getProjectDomElements.domElements.projectDescription.textContent = getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].description;
        getProjectDomElements.domElements.projectNotes.textContent = getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].notes;
        
        const checkDelButtons = document.getElementsByClassName('check-del');
        for (const delButton of checkDelButtons) { //reapplies checklist delete event listeners when new project is loaded
            delButton.addEventListener('click', checkboxFunctions.checklistDel, false)
        }
    }

    function selectRadioButton(currentProject) { //sets priority radio buttons from project array
        if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === "low") {
            getProjectDomElements.domElements.lowPrioCheckbox.checked = true;
        } else if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === "med") {
            getProjectDomElements.domElements.medPrioCheckbox.checked = true;
        } else if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === "high") {
            getProjectDomElements.domElements.highPrioCheckbox.checked = true;
        }
    } 

    function addNewProject() { //gets information to pass to new Project statement
        const checkboxState = []
        const title = getListingElements.domElements.projectNameIn.value;
        const dueDate = getListingElements.domElements.dueDateIn.value;
        const checklist = null;
        const description = null;
        const notes = null;
        const priority = getListingElements.domElements.priorityIn.value;
    
        addProjectToArray(checkboxState, title, dueDate, checklist, description, notes, priority);    
    }

    function Project(checkboxState, title, dueDate, checklist, description, notes, priority) {
        this.checkboxState = checkboxState
        this.title = title;
        this.dueDate = dueDate;
        this.checklist = checklist; 
        this.description = description;
        this.notes = notes;
        this.priority = priority;
    }
    
    function addProjectToArray(checkboxState, title, dueDate, checklist, description, notes, priority) {
        const project = new Project(checkboxState, title, dueDate, checklist, description, notes, priority);
        getProjectDomElements.projectLogic.projectArray.push(project);
        localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
    }
    return {selectRadioButton, addProjectToArray,addNewProject,updateDom}
})()