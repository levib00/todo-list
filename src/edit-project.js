export { editText }

import { getProjectDomElements } from "./generate-project"
import { checkboxFunctions } from "./checklist-Functions"

function editText(thisProject,executed) {//edits text of areas in content area thisProject is the edit button that was clicked.
    if (!executed) { //ensures that edit button doesn't do anything until the enter button is pressed.
        const tempThisProject = thisProject
        let thisSection = thisProject.thisSection //sets prototype to variables
        let thisProperty = thisProject.thisProperty
        
        function editChecklist() {   //edits checklist specifically because checklist needs to create items such as checkboxes.
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
            checkbox.addEventListener('change',checkboxFunctions.checkCheckboxes,false)
    
            const checkmark = document.createElement('span');
            checkmark.setAttribute('class','checkmark');
            checkboxContainer.appendChild(checkmark)
    
            let checklistText = document.createElement('div');
            checklistText.setAttribute('class','project-text');
            checklistItem.appendChild(checklistText);
    
            thisSection = checklistText //sets prototype variables to checklist.
            thisProperty = 'checklist'

            const delItem = document.createElement('button');
            delItem.innerHTML = '<img src="/dist/images/trash.svg" class="trash-can">';
            delItem.setAttribute('class', 'check-del del-button')
            delItem.addEventListener('click', checkboxFunctions.checklistDel, false)
            
            checklistItem.appendChild(delItem)
        }
        addEnterButton(tempThisProject, enterEdit)

        if (getProjectDomElements.projectLogic.checklistBool) {
            editChecklist()
        } else {
            var temp = thisSection.textContent //temp is to hold the text in the textbox while the textarea is open so that the textbox can be empty except for the textarea
            thisSection.textContent = ''
        }
        
        let textBox = document.createElement('textarea');
        textBox.setAttribute('class', 'text-area')
        thisSection.appendChild(textBox)

        textBox.textContent = temp
        
        executed = true

        function enterEdit() { //sends the edit and saves it to local storage
            thisSection.textContent = textBox.value;
             if (getProjectDomElements.projectLogic.checklistBool) {
                 console.log(getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject])
                 getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject][thisProperty] = getProjectDomElements.domElements.projectChecklist.innerHTML;
                 checkboxFunctions.checkCheckboxes()
             } else {
                console.log(getProjectDomElements.projectLogic.currentProject)
                getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject][thisProperty] = textBox.value;
            }
            this.remove();
            textBox.remove();
            getProjectDomElements.projectLogic.executed = false
            getProjectDomElements.projectLogic.checklistBool = false;
            localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
        }
    }
}

function addEnterButton(thisProject, enterEdit) { //creates enter button.
    var enterButton = document.createElement('button')
    const element = thisProject.parentNode.children[1]
    enterButton.setAttribute('class','enter-button')
    enterButton.setAttribute('id','enter-button')
    enterButton.textContent = 'Enter'
    thisProject.parentNode.insertBefore(enterButton, element);
    enterButton.addEventListener('click', enterEdit, false)
}