export { checkboxFunctions }
import { getProjectDomElements } from "./generate-project"

const checkboxFunctions = (() => { 
    const checkboxes = document.getElementsByClassName('check-button')
    function checkCheckboxes() { //checks to see if checkboxes are checked, if so highlights the sidebar button green and stores the status of the button in local storage
        const projectButton = document.getElementById(getProjectDomElements.projectLogic.currentProject)
        let i = 0;
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                i++
                if (i === checkboxes.length) {
                    projectButton.setAttribute('class','sidebar-button project green')
                    localStorage.setItem('currentSidebar',JSON.stringify(document.getElementById('dates-container').innerHTML))
                } 
            } else {
                projectButton.setAttribute('class','sidebar-button project')
                localStorage.setItem('currentSidebar',JSON.stringify(document.getElementById('dates-container').innerHTML))
            }
        }
    }

    function checklistDel() {//handles deleting items from the checklist
        this.parentNode.remove()
        getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checklist = getProjectDomElements.domElements.projectChecklist.innerHTML
        localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
        checkCheckboxes()
    }

    function saveCheckboxes() { //saves checklist items to array and local storage
        getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState = []
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState.push('checked')
                localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
            } else {
                getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState.push('unchecked')
                localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
            }
        }
    }

    function setCheckboxes() { //sets checkbox status from project array
        var i = 0;
        for (const checkbox of checkboxes) {
            checkbox.addEventListener('change', checkCheckboxes, false)
            if (getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checkboxState[i] === 'checked') {
                console.log('working')
                checkbox.checked = true
                console.log(checkbox.checked)
            }
            i++
        }
    }
    return {checkCheckboxes,saveCheckboxes,setCheckboxes,checklistDel}
})()