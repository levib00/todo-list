import {popupFunctions} from './popup-control'

export default function generateNewListing() {
    getDomElements.domElements.addButton.addEventListener('click',generateListingFunctions.handleCreateListing, false)
}

const getDomElements = (() => {
    const domElements = {
        projectNameIn : document.getElementById('project-name-in'),
        dueDateIn : document.getElementById('due-date-in'),
        priorityIn : document.getElementById('priority-in'),
        addButton : document.getElementById('add-button'),
        dateList : document.getElementById('dates-container'),
    }
    return {domElements}
})()

const generateListingFunctions = (() => {
    function handleCreateListing() {
        createDateTab()
        createProjectButton()
    }
    function createProjectButton() {
        console.log(getDomElements.domElements.dueDateIn.value)
        const newButton = document.createElement('button');
        newButton.setAttribute('class','project');
        newButton.innerText = getDomElements.domElements.projectNameIn.value;
        let tempDueDate = document.getElementById(getDomElements.domElements.dueDateIn.value)
        tempDueDate.appendChild(newButton);
        popupFunctions.closeForm()
    }
    function createDateTab() {
        if (!getDomElements.domElements.dateList.innerHTML.includes(getDomElements.domElements.dueDateIn.value)) {
            let newTab = document.createElement('div');
            newTab.setAttribute('class','date-sub-header subtitle')
            newTab.setAttribute('id',getDomElements.domElements.dueDateIn.value)
            newTab.innerText = getDomElements.domElements.dueDateIn.value;
            getDomElements.domElements.dateList.appendChild(newTab)
        } else {
            return
        }
    }
    return {handleCreateListing}
})()