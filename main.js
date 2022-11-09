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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ generateNewListing),\n/* harmony export */   \"getListingElements\": () => (/* binding */ getListingElements)\n/* harmony export */ });\n/* harmony import */ var _popup_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup-control */ \"./src/popup-control.js\");\n/* harmony import */ var _generate_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generate-project */ \"./src/generate-project.js\");\n\n\n\nfunction generateNewListing() {\n    getListingElements.domElements.addButton.addEventListener('click',generateListingFunctions.handleCreateListing, false)\n}\n\nconst getListingElements = (() => {\n    const domElements = {\n        projectNameIn : document.getElementById('project-name-in'),\n        dueDateIn : document.getElementById('due-date-in'),\n        priorityIn : document.getElementById('priority-in'),\n        addButton : document.getElementById('add-button'),\n        dateList : document.getElementById('dates-container'),\n    }\n    return {domElements}\n})()\n\n\n\n\nconst generateListingFunctions = (() => {\n    let id = 0;\n    function handleCreateListing() {\n        createDateTab()\n        ;(0,_generate_project__WEBPACK_IMPORTED_MODULE_1__.addNewProject)()\n        createProjectButton()\n    }\n    function createProjectButton() {\n        console.log(getListingElements.domElements.dueDateIn.value)\n        const newButton = document.createElement('button');\n        newButton.setAttribute('class','project');\n        newButton.setAttribute('id',`${id}`)\n        id++\n        newButton.innerText = getListingElements.domElements.projectNameIn.value;\n        newButton.addEventListener('click',_generate_project__WEBPACK_IMPORTED_MODULE_1__.updateDom, false)\n        \n        let tempDueDate = document.getElementById(getListingElements.domElements.dueDateIn.value)\n        tempDueDate.appendChild(newButton);\n        \n        _popup_control__WEBPACK_IMPORTED_MODULE_0__.popupFunctions.closeForm()\n        \n    }\n    function createDateTab() {\n        if (!getListingElements.domElements.dateList.innerHTML.includes(getListingElements.domElements.dueDateIn.value)) {\n            let newTab = document.createElement('div');\n            newTab.setAttribute('class','date-sub-header subtitle')\n            newTab.setAttribute('id',getListingElements.domElements.dueDateIn.value)\n            newTab.innerText = getListingElements.domElements.dueDateIn.value;\n            getListingElements.domElements.dateList.appendChild(newTab)\n        } else {\n            return\n        }\n    }\n    return {handleCreateListing}\n})()\n\n//# sourceURL=webpack://todo-list/./src/generate-listing.js?");

/***/ }),

/***/ "./src/generate-project.js":
/*!*********************************!*\
  !*** ./src/generate-project.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addNewProject\": () => (/* binding */ addNewProject),\n/* harmony export */   \"default\": () => (/* binding */ doSomething),\n/* harmony export */   \"updateDom\": () => (/* binding */ updateDom)\n/* harmony export */ });\n/* harmony import */ var _generate_listing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generate-listing */ \"./src/generate-listing.js\");\n\n \n\nfunction doSomething() {\n    /*\n    create factory constructor that will let me\n    create things like description, notes, and checklist items that are\n    stored in a variable so i can call that variable to the screen\n    when the associated button is pressed.\n    \n    only solution i can find is to use the same id solution i used in the li\n    */\n    \n}\n\nlet projectArray = [];\n\nfunction updateDom() {\n    getDomElements.domElements.projectHeaderTitle.textContent = projectArray[this.id].title;\n    getDomElements.domElements.projectHeaderDate.textContent = projectArray[this.id].dueDate;\n    getDomElements.domElements.projectChecklist.textContent = projectArray[this.id].checklist;\n    getDomElements.domElements.projectDescription.textContent = projectArray[this.id].description;\n    getDomElements.domElements.projectNotes.textContent = projectArray[this.id].notes;\n    \n    /*function selectRadioButton() {\n        if (status === \"Read\") {\n            readCheckbox.checked = true;\n        } else if (status === \"Unread\") {\n            unreadCheckbox.checked = true;\n        } else if (status === \"DNF\") {\n            dnfCheckbox.checked = true;\n        } else if (status === \"Reading\") {\n            readingCheckbox.checked = true;\n        }\n    }*/\n}\n\nfunction Project(title, dueDate, checklist, description, notes, priority) {\n    this.title = title;\n    this.dueDate = dueDate;\n    this.checklist = checklist;\n    this.description = description;\n    this.notes = notes;\n    this.priority = priority;\n}\n\n\nfunction addProjectToArray(title, dueDate, checklist, description, notes, priority) {\n    const project = new Project(title, dueDate, checklist, description, notes, priority);\n    projectArray.push(project);\n    \n    console.log(projectArray)\n    console.log(project)\n}\n // need to refactor\nfunction addNewProject() {\n    const title = _generate_listing__WEBPACK_IMPORTED_MODULE_0__.getListingElements.domElements.projectNameIn.value;\n    const dueDate = _generate_listing__WEBPACK_IMPORTED_MODULE_0__.getListingElements.domElements.dueDateIn.value;\n    const checklist = /*checklistTextBox.value*/ null;\n    const description = /*descriptionTextBox.value*/ null;\n    const notes = /*NotesTextBox.value;*/ null;\n    const priority = _generate_listing__WEBPACK_IMPORTED_MODULE_0__.getListingElements.domElements.priorityIn.value;\n\n    \n\n    \n    //if (title === \"\" || author === \"\" || pages === \"\" || status === \"\") \n    //{\n      //  return\n    //}\n\n    \n\n    addProjectToArray(title, dueDate, checklist, description, notes, priority);    \n}\n\nfunction faggot() {\n\n}\n\nconst getDomElements = (() => {\n    const domElements = {\n        projectHeaderTitle : document.getElementById('project-header-subtitle'),\n        projectHeaderDate : document.getElementById('project-date'),\n        projectChecklist : document.getElementById('checklist-text'),\n        projectDescription : document.getElementById('description-text'),\n        projectNotes : document.getElementById('notes-text'),\n        projectPriority : document.getElementById('priority')\n        \n    }\n    return {domElements}\n})()\n\nconst doSomethingElse = (() => {\n\n    return {}\n})()\n\n//# sourceURL=webpack://todo-list/./src/generate-project.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _popup_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup-control */ \"./src/popup-control.js\");\n/* harmony import */ var _generate_listing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generate-listing */ \"./src/generate-listing.js\");\n\n\n//import doSomething from \"./generate-project\"\n(0,_generate_listing__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\n;(0,_popup_control__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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