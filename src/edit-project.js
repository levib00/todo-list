export { editText }

import { getProjectDomElements } from "./generate-project"
import { checkboxFunctions } from "./checklist-Functions"

function editText(thisProject,executed) {
    console.log(thisProject, executed)
    if (!executed) {
        const tempThisProject = thisProject
        let thisSection = thisProject.thisSection
        let thisProperty = thisProject.thisProperty
        
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
            checkbox.addEventListener('change',checkboxFunctions.checkCheckboxes,false)
    
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
            delItem.addEventListener('click', checkboxFunctions.checklistDel, false)
            
            checklistItem.appendChild(delItem)
        }
        console.log(thisProject)
        addEnterButton(tempThisProject, enterEdit)

        if (getProjectDomElements.projectLogic.checklistBool) {
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

function addEnterButton(thisProject, enterEdit) {
    var enterButton = document.createElement('button')
    const element = thisProject.parentNode.children[1]
    enterButton.setAttribute('class','enter-button')
    enterButton.textContent = 'Enter'
    thisProject.parentNode.insertBefore(enterButton, element);
    enterButton.addEventListener('click', enterEdit, false)
}