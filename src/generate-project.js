import { getListingElements } from "./generate-listing"
export {addNewProject, handleSelectedProject} 

//refactor

function handleSelectedProject() { //TODO: refactor this function to make it cleaner
    let currentProject = this.id
    
    projectFunctions.checkPrio(currentProject)
    
    let executed = false;

    updateDom()
    
    getProjectDomElements.domElements.notesEdit.thisSection = getProjectDomElements.domElements.projectNotes;
    getProjectDomElements.domElements.notesEdit.thisProperty = 'notes';
    
    getProjectDomElements.domElements.descriptionEdit.thisSection = getProjectDomElements.domElements.projectDescription;
    getProjectDomElements.domElements.descriptionEdit.thisProperty =  'description';
 
    let checklistBool = false;
    
    if(getProjectDomElements.projectLogic.applyEventListeners) {
        getProjectDomElements.domElements.notesEdit.addEventListener('click', editText, false); // !
        getProjectDomElements.domElements.descriptionEdit.addEventListener('click', editText, false); // !
        getProjectDomElements.domElements.checklistEdit.addEventListener('click', function() { // !
            checklistBool = true;
        });
        getProjectDomElements.domElements.checklistEdit.addEventListener('click', editText,false) // !
        getProjectDomElements.projectLogic.applyEventListeners = false
    }

    function editText(thisProject) {
        if (!executed) {
            const $this = this
            let thisSection = thisProject.currentTarget.thisSection
            let thisProperty = thisProject.currentTarget.thisProperty
            
            function editChecklist() { 
                const checklistItem = document.createElement('div');
                checklistItem.setAttribute('class','checklist-item');
                getProjectDomElements.domElements.projectChecklist.appendChild(checklistItem)
        
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
        
                let checklistText = document.createElement('div');
                checklistText.setAttribute('class','project-text');
                checklistItem.appendChild(checklistText);
        
                thisSection = checklistText
                thisProperty = 'checklist'
                console.log('thisSection',thisSection,'thisProperty',thisProperty)
            }

            addEnterButton($this, enterEdit)

            if (checklistBool) {
                editChecklist()
            } else {
                var temp = thisSection.textContent
                thisSection.textContent = ''
            }
            
            let textBox = document.createElement('textarea');
            thisSection.appendChild(textBox)

            textBox.textContent = temp
            
            executed = true

            function enterEdit() {
                thisSection.textContent = textBox.value;
                if (checklistBool) {
                    getProjectDomElements.projectLogic.projectArray[currentProject][thisProperty] = getProjectDomElements.domElements.projectChecklist.innerHTML;
                } else {
                    getProjectDomElements.projectLogic.projectArray[currentProject][thisProperty] = textBox.value;
                }
                this.remove();
                textBox.remove();
                executed = false
                checklistBool = false;
            }
        }
    }

    function addEnterButton($this, enterEdit) {
        var enterButton = document.createElement('button')
        const element = $this.parentNode.children[1]
        enterButton.setAttribute('class','enter-button')
        enterButton.textContent = 'Enter'
        $this.parentNode.insertBefore(enterButton, element);
        enterButton.addEventListener('click', enterEdit, false)
    }
    
    function updateDom() {
        getProjectDomElements.domElements.projectHeaderTitle.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].title;
        getProjectDomElements.domElements.projectHeaderDate.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].dueDate;
        getProjectDomElements.domElements.projectChecklist.innerHTML = getProjectDomElements.projectLogic.projectArray[currentProject].checklist;
        getProjectDomElements.domElements.projectDescription.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].description;
        getProjectDomElements.domElements.projectNotes.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].notes;
    }
    projectFunctions.selectRadioButton(currentProject)
}

function Project(title, dueDate, checklist, description, notes, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.checklist = checklist; 
    this.description = description;
    this.notes = notes;
    this.priority = priority;
}

function addNewProject() {
    const title = getListingElements.domElements.projectNameIn.value;
    const dueDate = getListingElements.domElements.dueDateIn.value;
    const checklist = null;
    const description = null;
    const notes = null;
    const priority = getListingElements.domElements.priorityIn.value;

    projectFunctions.addProjectToArray(title, dueDate, checklist, description, notes, priority);    
}

const getProjectDomElements = (() => {
    const domElements = {
        projectHeaderTitle : document.getElementById('project-header-subtitle'),
        projectHeaderDate : document.getElementById('project-date'),
        projectChecklist : document.getElementById('checklist-text'),
        projectDescription : document.getElementById('description-text'),
        projectNotes : document.getElementById('notes-text'),
        projectPriority : document.getElementById('priority'),
        lowPrioCheckbox : document.getElementById('low-prio'),
        medPrioCheckbox : document.getElementById('medium-prio'),
        highPrioCheckbox : document.getElementById('high-prio'),
        descriptionEdit : document.getElementById('description-edit'),
        notesEdit : document.getElementById('notes-edit'),
        checklistEdit : document.getElementById('checklist-edit'),
    }
    const projectLogic = {
        projectArray : [],
        applyEventListeners : true
    }
    return {domElements,projectLogic}
})()

const projectFunctions = (() => {
    function selectRadioButton(currentProject) {
        if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === "low") {
            getProjectDomElements.domElements.lowPrioCheckbox.checked = true;
        } else if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === "med") {
            getProjectDomElements.domElements.medPrioCheckbox.checked = true;
        } else if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === "high") {
            getProjectDomElements.domElements.highPrioCheckbox.checked = true;
        }
    }

    function checkPrio(currentProject) {
        const prioButtons = document.getElementsByClassName('prio-button');
        for(var i = 0; i < prioButtons.length; i++) {
            prioButtons[i].onclick = function() {
                getProjectDomElements.projectLogic.projectArray[currentProject].priority = this.value;
                console.log(getProjectDomElements.projectLogic.projectArray[currentProject]);
            }
        }
    }
    
    function addProjectToArray(title, dueDate, checklist, description, notes, priority) {
        const project = new Project(title, dueDate, checklist, description, notes, priority);
        getProjectDomElements.projectLogic.projectArray.push(project);
    }

    return {selectRadioButton, checkPrio,addProjectToArray}
})()