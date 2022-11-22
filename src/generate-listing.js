import { popupFunctions } from './popup-control'
import { projectFunctions, handleSelectedProject } from './generate-project'
import { deleteListing } from './delete-project'
//TODO: make sure delete buttons work with local storage
export default function generateNewListing() {
    getListingElements.domElements.addButton.addEventListener('click',generateListingFunctions.handleCreateListing, false)
}

const getListingElements = (() => {
    const domElements = {
        projectNameIn : document.getElementById('project-name-in'),
        dueDateIn : document.getElementById('due-date-in'),
        priorityIn : document.getElementById('priority-in'),
        addButton : document.getElementById('add-button'),
        dateList : document.getElementById('dates-container'),
    }
    return {domElements}
})()

export { getListingElements,generateListingFunctions }

const generateListingFunctions = (() => {
    let id = 0;
    const test = localStorage.getItem('currentId')
    if (test ) {
        id = test
    }
    console.log('id',id);
    function handleCreateListing() {
        if (getListingElements.domElements.projectNameIn.value === "" || 
          getListingElements.domElements.dueDateIn.value === "" || 
          getListingElements.domElements.priorityIn.value === "") {
            return
        }
        createDateTab()
        projectFunctions.addNewProject(id)
        createProjectButton()
        localStorage.setItem('currentSidebar',JSON.stringify(document.getElementById('dates-container').innerHTML))
    }
    function createProjectButton() {
        let tempDueDate = document.getElementById(getListingElements.domElements.dueDateIn.value)
    
        const listItem = document.createElement('div');
        listItem.setAttribute('class','list-item');
        tempDueDate.appendChild(listItem);

        console.log(getListingElements.domElements.dueDateIn.value)

        const newButton = document.createElement('button');
        newButton.setAttribute('class','project sidebar-button');
        newButton.setAttribute('id',`${id}`)
        newButton.innerText = getListingElements.domElements.projectNameIn.value;
        newButton.addEventListener('click', handleSelectedProject, false)
        listItem.appendChild(newButton);

        const prioIndicator = document.createElement('div');
        prioIndicator.setAttribute('class','prio-indicator');
        prioIndicator.setAttribute('id',`indicator${id}`)
        newButton.insertBefore(prioIndicator, newButton.firstChild);
        setPrioIndicator(getListingElements.domElements.priorityIn,id)

        let deleteListingButton = document.createElement('button');
        deleteListingButton.setAttribute('class','delete-button');
        deleteListingButton.setAttribute('id',`del${id}`);
        deleteListingButton.innerHTML = '<img src="/dist/images/trash.svg" class="trash-can">'
        deleteListingButton.addEventListener('click', deleteListing, false)
        listItem.appendChild(deleteListingButton);
        
        id++

        localStorage.setItem('currentId',id);
        
        console.log(test); //need to set id to test, and also rename test

        popupFunctions.closeForm()
    }

    function setPrioIndicator(button,id) {
        const indicator = document.getElementById(`indicator${id}`);
        if (button.value === 'low') {
            console.log('low',id)
            indicator.setAttribute('class', 'prio-indicator blue')
        } else if (button.value === 'med') {
            console.log('med',id)
            indicator.setAttribute('class', 'prio-indicator yellow')
        } else if (button.value === 'high') {
            console.log('high',id)
            indicator.setAttribute('class', 'prio-indicator red')
        }
    }
    
    function createDateTab() {
        if (!getListingElements.domElements.dateList.innerHTML.includes(getListingElements.domElements.dueDateIn.value)) {
            let newTab = document.createElement('div');
            newTab.setAttribute('class','date-sub-header subtitle')
            newTab.setAttribute('id',getListingElements.domElements.dueDateIn.value)
            newTab.innerText = getListingElements.domElements.dueDateIn.value;
            getListingElements.domElements.dateList.appendChild(newTab)

            var sidebarItems = getListingElements.domElements.dateList.childNodes;
            var itemsArr = [];
            for (var i in sidebarItems) {
                if (sidebarItems[i].nodeType == 1) { // get rid of the whitespace text nodes
                    itemsArr.push(sidebarItems[i]);
                }
            }

            itemsArr.sort(function(a, b) {
            return a.innerHTML == b.innerHTML
                    ? 0
                    : (a.innerHTML > b.innerHTML ? 1 : -1);
            });

            for (i = 0; i < itemsArr.length; ++i) {
                getListingElements.domElements.dateList.appendChild(itemsArr[i]);
            }
        }
    }
    return {handleCreateListing, setPrioIndicator}
})()