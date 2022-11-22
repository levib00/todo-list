import { generateListingFunctions, getListingElements } from "./generate-listing"
import { deleteListing } from "./delete-project"
export {addNewProject, handleSelectedProject, getProjectDomElements} 

function handleSelectedProject() { //TODO: refactor this function to make it cleaner
    if (getProjectDomElements.projectLogic.currentProject) {
        projectFunctions.checkboxFunctions.saveCheckboxes()
    }
    const currentProject = this.id
    console.log(this.id, currentProject)
    getProjectDomElements.projectLogic.currentProject = this.id //this will let me do a lot of refactoring
    
    let executed = false;

    updateDom()
    projectFunctions.checkboxFunctions.setCheckboxes()

    
    //console.log(localStorage.currentSidebar);

    getProjectDomElements.domElements.notesEdit.thisSection = getProjectDomElements.domElements.projectNotes;
    getProjectDomElements.domElements.notesEdit.thisProperty = 'notes';
    
    getProjectDomElements.domElements.descriptionEdit.thisSection = getProjectDomElements.domElements.projectDescription;
    getProjectDomElements.domElements.descriptionEdit.thisProperty =  'description';
 
    let checklistBool = false;
    
    if(getProjectDomElements.projectLogic.applyEventListeners) {
        getProjectDomElements.domElements.notesEdit.addEventListener('click', editText, false);
        getProjectDomElements.domElements.descriptionEdit.addEventListener('click', editText, false);
        getProjectDomElements.domElements.checklistEdit.addEventListener('click', function() {
            checklistBool = true;
        });
        getProjectDomElements.domElements.checklistEdit.addEventListener('click', editText,false)
        getProjectDomElements.projectLogic.applyEventListeners = false
        for (const button of getProjectDomElements.domElements.prioButtons) {
            button.addEventListener('click', function() {
                generateListingFunctions.setPrioIndicator(this, getProjectDomElements.projectLogic.currentProject)
                getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].priority = this.value;
                console.log(this.value)
            })
        }
    }

    function editText(thisProject) { //maybe give own file
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
                checkbox.addEventListener('change',projectFunctions.checkboxFunctions.checkCheckboxes,false)
        
                const checkmark = document.createElement('span');
                checkmark.setAttribute('class','checkmark');
                checkboxContainer.appendChild(checkmark)
        
                let checklistText = document.createElement('div');
                checklistText.setAttribute('class','project-text');
                checklistItem.appendChild(checklistText);
        
                thisSection = checklistText
                thisProperty = 'checklist'
                console.log('thisSection',thisSection,'thisProperty',thisProperty)

                const delItem = document.createElement('button');
                delItem.innerHTML = '<img src="/dist/images/trash.svg" class="trash-can">';
                delItem.setAttribute('class', 'check-del del-button')
                delItem.addEventListener('click', function() {
                    this.parentNode.remove()
                })
                checklistItem.appendChild(delItem)
            }

            addEnterButton($this, enterEdit)

            if (checklistBool) {
                editChecklist()
            } else {
                var temp = thisSection.textContent
                thisSection.textContent = ''
            }
            
            let textBox = document.createElement('textarea');
            textBox.setAttribute('class', 'text-area')
            thisSection.appendChild(textBox)

            textBox.textContent = temp
            
            executed = true

            function enterEdit() {
                thisSection.textContent = textBox.value;
                if (checklistBool) {
                    console.log(getProjectDomElements.projectLogic.projectArray[currentProject])
                    getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject][thisProperty] = getProjectDomElements.domElements.projectChecklist.innerHTML;
                } else {
                    console.log(getProjectDomElements.projectLogic.currentProject)
                    getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject][thisProperty] = textBox.value;
                }
                this.remove();
                textBox.remove();
                executed = false
                checklistBool = false;
                localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
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
        
        const checkDelButtons = document.getElementsByClassName('check-del');
        for (const delButton of checkDelButtons) {
            delButton.addEventListener('click', function() {
                this.parentNode.remove()
            })
        }
    }
    projectFunctions.selectRadioButton(currentProject)
    console.log(getProjectDomElements.projectLogic.projectArray)
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

function addNewProject() {
    const checkboxState = []
    const title = getListingElements.domElements.projectNameIn.value;
    const dueDate = getListingElements.domElements.dueDateIn.value;
    const checklist = null;
    const description = null;
    const notes = null;
    const priority = getListingElements.domElements.priorityIn.value;

    projectFunctions.addProjectToArray(checkboxState, title, dueDate, checklist, description, notes, priority);    
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
        prioButtons : document.getElementsByClassName('prio-button'),
        descriptionEdit : document.getElementById('description-edit'),
        notesEdit : document.getElementById('notes-edit'),
        checklistEdit : document.getElementById('checklist-edit'),
    }
    const projectLogic = {
        projectArray : [],
        applyEventListeners : true,
        currentProject : null
    }
    const loadLocalStorage = (() => { //implement try/catch
        console.log(localStorage.currentArray);
        if (localStorage.currentArray) {
            const currentAray = localStorage.getItem('currentArray') 
            projectLogic.projectArray = JSON.parse(currentAray)
            console.log(JSON.parse(currentAray));
        }
        const currentSidebar = localStorage.getItem('currentSidebar');
        console.log(currentSidebar);
        document.getElementById('dates-container').innerHTML = JSON.parse(currentSidebar)

        const projectButtons = document.getElementsByClassName('project');
        for (const button of projectButtons) {
            button.addEventListener('click',handleSelectedProject,false)
        }

        const delButtons = document.getElementsByClassName('delete-button');
        for (const button of delButtons) {
            button.addEventListener('click', deleteListing, false)
        }
    })()
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
    
    function addProjectToArray(checkboxState, title, dueDate, checklist, description, notes, priority) {
        const project = new Project(checkboxState, title, dueDate, checklist, description, notes, priority);
        getProjectDomElements.projectLogic.projectArray.push(project);
        localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
    }

    const checkboxFunctions = (() => { //maybe move this to its own file
        const checkboxes = document.getElementsByClassName('check-button')
        function checkCheckboxes() {
            const projectButton = document.getElementById(getProjectDomElements.projectLogic.currentProject)
            let i = 0;
            for (const checkbox of checkboxes) {
                if (checkbox.checked) {
                    i++
                    if (i === checkboxes.length) {
                        console.log(checkboxes.length,i)
                        projectButton.setAttribute('class','sidebar-button project green')
                    } 
                } else {
                    console.log(checkboxes.length,i);
                    projectButton.setAttribute('class','sidebar-button project')
                }
            }
        }

        function saveCheckboxes() {
            getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState = []
            for (const checkbox of checkboxes) {
                console.log()
                if (checkbox.checked) {
                    getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState.push('checked')
                } else {
                    getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState.push('unchecked')
                }
            }
        }

        function setCheckboxes() {
            var i = 0;
            for (const checkbox of checkboxes) {
                checkbox.addEventListener('change', projectFunctions.checkboxFunctions.checkCheckboxes, false)
                console.log(getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState[i],i)
                if (getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState[i] === 'checked') {
                    console.log('working')
                    checkbox.checked = true
                    console.log(checkbox.checked)
                }
                i++
            }
        }
        return {checkCheckboxes,saveCheckboxes,setCheckboxes}
    })()

    return {selectRadioButton, addProjectToArray, checkboxFunctions}
})()