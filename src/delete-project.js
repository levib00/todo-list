import { getProjectDomElements } from "./generate-project";
export function deleteListing() { 
    const delIndex = this.id.slice(3);

    if (getProjectDomElements.projectLogic.currentProject === delIndex) {
        getProjectDomElements.domElements.contentArea.setAttribute('class','unclickable');
        getProjectDomElements.domElements.projectHeaderTitle.textContent = 'Select a project';
        getProjectDomElements.domElements.projectHeaderDate.textContent = '';
        getProjectDomElements.domElements.projectChecklist.innerHTML = '';
        getProjectDomElements.domElements.projectDescription.textContent = '';
        getProjectDomElements.domElements.projectNotes.textContent = '';
        getProjectDomElements.domElements.lowPrioCheckbox.checked = false;
        getProjectDomElements.domElements.medPrioCheckbox.checked = false;
        getProjectDomElements.domElements.highPrioCheckbox.checked = false;
        try {
            document.getElementById('enter-button').remove()
        }catch{}
    }

    delete getProjectDomElements.projectLogic.projectArray[delIndex]
    const thisListing = this.parentNode
    
    const dateChildrenNodeList = thisListing.parentNode.childNodes
    const dateChildrenArray = Array.from(dateChildrenNodeList)
    dateChildrenArray.filter(n => n)
    
    if (dateChildrenArray.length == 2) {
        this.parentNode.parentNode.remove();
    }
    this.parentNode.remove()
    console.log(dateChildrenArray.length,'space', dateChildrenArray)
    localStorage.setItem('currentArray', JSON.stringify(getProjectDomElements.projectLogic.projectArray))
    localStorage.setItem('currentSidebar',JSON.stringify(document.getElementById('dates-container').innerHTML))
}