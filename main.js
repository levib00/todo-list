/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/generate-listing.js":
/*!*********************************!*\
  !*** ./src/generate-listing.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ generateNewListing),\n/* harmony export */   \"getListingElements\": () => (/* binding */ getListingElements)\n/* harmony export */ });\n/* harmony import */ var _popup_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup-control */ \"./src/popup-control.js\");\n/* harmony import */ var _generate_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generate-project */ \"./src/generate-project.js\");\n\n\n\nfunction generateNewListing() {\n    getListingElements.domElements.addButton.addEventListener('click',generateListingFunctions.handleCreateListing, false)\n}\n\nconst getListingElements = (() => {\n    const domElements = {\n        projectNameIn : document.getElementById('project-name-in'),\n        dueDateIn : document.getElementById('due-date-in'),\n        priorityIn : document.getElementById('priority-in'),\n        addButton : document.getElementById('add-button'),\n        dateList : document.getElementById('dates-container'),\n    }\n    return {domElements}\n})()\n\n\n\n\nconst generateListingFunctions = (() => {\n    let id = 0;\n    function handleCreateListing() {\n        if (getListingElements.domElements.projectNameIn.value === \"\" || \n          getListingElements.domElements.dueDateIn.value === \"\" || \n          getListingElements.domElements.priorityIn.value === \"\") {\n            return\n        }\n        createDateTab()\n        ;(0,_generate_project__WEBPACK_IMPORTED_MODULE_1__.addNewProject)()\n        createProjectButton()\n    }\n    function createProjectButton() {\n        console.log(getListingElements.domElements.dueDateIn.value)\n        const newButton = document.createElement('button');\n        newButton.setAttribute('class','project');\n        newButton.setAttribute('id',`${id}`)\n        id++\n        newButton.innerText = getListingElements.domElements.projectNameIn.value;\n        newButton.addEventListener('click',_generate_project__WEBPACK_IMPORTED_MODULE_1__.handleSelectedProject, false)\n        \n        let tempDueDate = document.getElementById(getListingElements.domElements.dueDateIn.value)\n        tempDueDate.appendChild(newButton);\n        \n        _popup_control__WEBPACK_IMPORTED_MODULE_0__.popupFunctions.closeForm()\n        \n        return \n    }\n    function createDateTab() {\n        if (!getListingElements.domElements.dateList.innerHTML.includes(getListingElements.domElements.dueDateIn.value)) {\n            let newTab = document.createElement('div');\n            newTab.setAttribute('class','date-sub-header subtitle')\n            newTab.setAttribute('id',getListingElements.domElements.dueDateIn.value)\n            newTab.innerText = getListingElements.domElements.dueDateIn.value;\n            getListingElements.domElements.dateList.appendChild(newTab)\n        } else {\n            return\n        }\n    }\n    return {handleCreateListing}\n})()\n\n//# sourceURL=webpack://todo-list/./src/generate-listing.js?");

/***/ }),

/***/ "./src/generate-project.js":
/*!*********************************!*\
  !*** ./src/generate-project.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addNewProject\": () => (/* binding */ addNewProject),\n/* harmony export */   \"handleSelectedProject\": () => (/* binding */ handleSelectedProject)\n/* harmony export */ });\n/* harmony import */ var _generate_listing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generate-listing */ \"./src/generate-listing.js\");\n\n \n\n//refactor\n\nfunction handleSelectedProject() { //TODO: refactor this function to make it cleaner\n    let currentProject = this.id\n    \n    projectFunctions.checkPrio(currentProject)\n    \n    let executed = false;\n\n    updateDom()\n    \n    getProjectDomElements.domElements.notesEdit.thisSection = getProjectDomElements.domElements.projectNotes;\n    getProjectDomElements.domElements.notesEdit.thisProperty = 'notes';\n    \n    getProjectDomElements.domElements.descriptionEdit.thisSection = getProjectDomElements.domElements.projectDescription;\n    getProjectDomElements.domElements.descriptionEdit.thisProperty =  'description';\n \n    let checklistBool = false;\n    \n    if(getProjectDomElements.projectLogic.applyEventListeners) {\n        getProjectDomElements.domElements.notesEdit.addEventListener('click', editText, false); // !\n        getProjectDomElements.domElements.descriptionEdit.addEventListener('click', editText, false); // !\n        getProjectDomElements.domElements.checklistEdit.addEventListener('click', function() { // !\n            checklistBool = true;\n        });\n        getProjectDomElements.domElements.checklistEdit.addEventListener('click', editText,false) // !\n        getProjectDomElements.projectLogic.applyEventListeners = false\n    }\n\n    function editText(thisProject) {\n        if (!executed) {\n            const $this = this\n            let thisSection = thisProject.currentTarget.thisSection\n            let thisProperty = thisProject.currentTarget.thisProperty\n            \n            function editChecklist() { \n                const checklistItem = document.createElement('div');\n                checklistItem.setAttribute('class','checklist-item');\n                getProjectDomElements.domElements.projectChecklist.appendChild(checklistItem)\n        \n                const checkboxContainer = document.createElement('label');\n                checkboxContainer.setAttribute('class','checkbox-container');\n                checklistItem.appendChild(checkboxContainer);\n        \n                const checkbox = document.createElement('input');\n                checkbox.setAttribute('type','checkbox')\n                checkbox.setAttribute('class','check-button');\n                checkboxContainer.appendChild(checkbox);\n        \n                const checkmark = document.createElement('span');\n                checkmark.setAttribute('class','checkmark');\n                checkboxContainer.appendChild(checkmark)\n        \n                let checklistText = document.createElement('div');\n                checklistText.setAttribute('class','project-text');\n                checklistItem.appendChild(checklistText);\n        \n                thisSection = checklistText\n                thisProperty = 'checklist'\n                console.log('thisSection',thisSection,'thisProperty',thisProperty)\n            }\n\n            addEnterButton($this, enterEdit)\n\n            if (checklistBool) {\n                editChecklist()\n            } else {\n                var temp = thisSection.textContent\n                thisSection.textContent = ''\n            }\n            \n            let textBox = document.createElement('textarea');\n            thisSection.appendChild(textBox)\n\n            textBox.textContent = temp\n            \n            executed = true\n\n            function enterEdit() {\n                thisSection.textContent = textBox.value;\n                if (checklistBool) {\n                    getProjectDomElements.projectLogic.projectArray[currentProject][thisProperty] = getProjectDomElements.domElements.projectChecklist.innerHTML;\n                } else {\n                    getProjectDomElements.projectLogic.projectArray[currentProject][thisProperty] = textBox.value;\n                }\n                this.remove();\n                textBox.remove();\n                executed = false\n                checklistBool = false;\n            }\n        }\n    }\n\n    function addEnterButton($this, enterEdit) {\n        var enterButton = document.createElement('button')\n        const element = $this.parentNode.children[1]\n        enterButton.setAttribute('class','enter-button')\n        enterButton.textContent = 'Enter'\n        $this.parentNode.insertBefore(enterButton, element);\n        enterButton.addEventListener('click', enterEdit, false)\n    }\n    \n    function updateDom() {\n        getProjectDomElements.domElements.projectHeaderTitle.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].title;\n        getProjectDomElements.domElements.projectHeaderDate.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].dueDate;\n        getProjectDomElements.domElements.projectChecklist.innerHTML = getProjectDomElements.projectLogic.projectArray[currentProject].checklist;\n        getProjectDomElements.domElements.projectDescription.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].description;\n        getProjectDomElements.domElements.projectNotes.textContent = getProjectDomElements.projectLogic.projectArray[currentProject].notes;\n    }\n    projectFunctions.selectRadioButton(currentProject)\n}\n\nfunction Project(title, dueDate, checklist, description, notes, priority) {\n    this.title = title;\n    this.dueDate = dueDate;\n    this.checklist = checklist; \n    this.description = description;\n    this.notes = notes;\n    this.priority = priority;\n}\n\nfunction addNewProject() {\n    const title = _generate_listing__WEBPACK_IMPORTED_MODULE_0__.getListingElements.domElements.projectNameIn.value;\n    const dueDate = _generate_listing__WEBPACK_IMPORTED_MODULE_0__.getListingElements.domElements.dueDateIn.value;\n    const checklist = null;\n    const description = null;\n    const notes = null;\n    const priority = _generate_listing__WEBPACK_IMPORTED_MODULE_0__.getListingElements.domElements.priorityIn.value;\n\n    projectFunctions.addProjectToArray(title, dueDate, checklist, description, notes, priority);    \n}\n\nconst getProjectDomElements = (() => {\n    const domElements = {\n        projectHeaderTitle : document.getElementById('project-header-subtitle'),\n        projectHeaderDate : document.getElementById('project-date'),\n        projectChecklist : document.getElementById('checklist-text'),\n        projectDescription : document.getElementById('description-text'),\n        projectNotes : document.getElementById('notes-text'),\n        projectPriority : document.getElementById('priority'),\n        lowPrioCheckbox : document.getElementById('low-prio'),\n        medPrioCheckbox : document.getElementById('medium-prio'),\n        highPrioCheckbox : document.getElementById('high-prio'),\n        descriptionEdit : document.getElementById('description-edit'),\n        notesEdit : document.getElementById('notes-edit'),\n        checklistEdit : document.getElementById('checklist-edit'),\n    }\n    const projectLogic = {\n        projectArray : [],\n        applyEventListeners : true\n    }\n    return {domElements,projectLogic}\n})()\n\nconst projectFunctions = (() => {\n    function selectRadioButton(currentProject) {\n        if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === \"low\") {\n            getProjectDomElements.domElements.lowPrioCheckbox.checked = true;\n        } else if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === \"med\") {\n            getProjectDomElements.domElements.medPrioCheckbox.checked = true;\n        } else if (getProjectDomElements.projectLogic.projectArray[currentProject].priority === \"high\") {\n            getProjectDomElements.domElements.highPrioCheckbox.checked = true;\n        }\n    }\n\n    function checkPrio(currentProject) {\n        const prioButtons = document.getElementsByClassName('prio-button');\n        for(var i = 0; i < prioButtons.length; i++) {\n            prioButtons[i].onclick = function() {\n                getProjectDomElements.projectLogic.projectArray[currentProject].priority = this.value;\n                console.log(getProjectDomElements.projectLogic.projectArray[currentProject]);\n            }\n        }\n    }\n    \n    function addProjectToArray(title, dueDate, checklist, description, notes, priority) {\n        const project = new Project(title, dueDate, checklist, description, notes, priority);\n        getProjectDomElements.projectLogic.projectArray.push(project);\n    }\n\n    return {selectRadioButton, checkPrio,addProjectToArray}\n})()\n\n//# sourceURL=webpack://todo-list/./src/generate-project.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _popup_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup-control */ \"./src/popup-control.js\");\n/* harmony import */ var _generate_listing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generate-listing */ \"./src/generate-listing.js\");\n\n\n(0,_generate_listing__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\n;(0,_popup_control__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/popup-control.js":
/*!******************************!*\
  !*** ./src/popup-control.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ popupControl),\n/* harmony export */   \"popupFunctions\": () => (/* binding */ popupFunctions)\n/* harmony export */ });\nfunction popupControl() {\n    getElements.domElements.closeButton.addEventListener(\"click\", popupFunctions.closeFormButton, false);\n    getElements.domElements.addNewButton.addEventListener('click', popupFunctions.showForm, false )\n}\n\n\n\nconst popupFunctions = (() => {\n    function closeFormButton() {\n        console.log(document.getElementById(\"project-name-in\").value)\n        document.getElementById(\"project-name-in\").innerText = \"\";\n        document.getElementById(\"due-date-in\").value = \"\";\n        document.getElementById(\"priority-in\").value = \"\";\n        \n        closeForm()\n    }\n    function finishFadeOut() {\n        getElements.domElements.popup.classList.remove(\"show\");\n    }\n    function closeForm() {\n        getElements.domElements.popup.setAttribute(\"class\",\"show hide\");\n        getElements.domElements.header.classList.remove(\"blur\");\n        getElements.domElements.content.classList.remove(\"blur\");\n        setTimeout(finishFadeOut, 200)\n    }\n\n    function showForm() {\n        getElements.domElements.popup.setAttribute(\"class\",\"show\");\n        getElements.domElements.content.setAttribute(\"class\",\"blur\");\n        getElements.domElements.header.setAttribute(\"class\", \"blur\");\n    }\n    return {closeForm, showForm, closeFormButton}\n})()\n\n\nconst getElements = (() => {\n    const domElements = {\n        popup : document.getElementById(\"form-pop\"),\n        header : document.getElementById(\"header\"),\n        content : document.getElementById(\"content\"),\n        addNewButton : document.getElementById(\"add-new-button\"),\n        closeButton : document.getElementById(\"close-form\")\n    }\n    return {domElements}\n    \n})()\n\n\n//# sourceURL=webpack://todo-list/./src/popup-control.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;