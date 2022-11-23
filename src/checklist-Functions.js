export { checkboxFunctions }
import { getProjectDomElements } from "./generate-project"

const checkboxFunctions = (() => { //maybe move this to its own file
    const checkboxes = document.getElementsByClassName('check-button')
    function checkCheckboxes() {
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

    function checklistDel() {
        //console.log(getProjectDomElements.projectLogic.projectArray,'sep',localStorage.currentArray);
        this.parentNode.remove()
        getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checklist = getProjectDomElements.domElements.projectChecklist.innerHTML
        localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
        //console.log(getProjectDomElements.projectLogic.projectArray,'sep', localStorage.currentArray);
        checkCheckboxes()
    }

    function saveCheckboxes() {
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

    function setCheckboxes() {
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