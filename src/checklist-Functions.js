export {checkboxFunctions}
import { getProjectDomElements} from "./generate-project"

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

    function checklistDel() {
        //console.log(getProjectDomElements.projectLogic.projectArray,'sep',localStorage.currentArray);
        this.parentNode.remove()
        getProjectDomElements.projectLogic.projectArray[getProjectDomElements.projectLogic.currentProject].checklist = getProjectDomElements.domElements.projectChecklist.innerHTML
        localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
        //console.log(getProjectDomElements.projectLogic.projectArray,'sep', localStorage.currentArray);
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