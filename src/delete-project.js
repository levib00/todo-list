import { getProjectDomElements } from "./generate-project";
export function deleteListing() {
    const delIndex = this.id.slice(3);
    console.log(getProjectDomElements.projectLogic.projectArray)
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