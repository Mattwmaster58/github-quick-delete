// ==UserScript==
// @name         GitHub Quick Delete
// @namespace    Mattwmaster58 Scripts
// @version      0.1
// @description  Delete GitHub repos without confirmations
// @author       Mattwmaster58
// @include      /^https:\/\/github\.com/.*/.*/settings/?$/i
// ==/UserScript==

let deleteButton = getDeleteButton();
if (deleteButton.innerHTML.search('Delete this repository') === -1) {
    console.error('selected wrong delete button or the text has changed!', deleteButton)
} else {
    console.log('changing delete button text');
    deleteButton.innerHTML = 'Delete this repository (no confirmation!)';
    deleteButton.onclick = submitDeleteForm;
}

function getDeleteButton() {
    const nodes = document.querySelectorAll('.btn-danger[role="button"]');
    return nodes[nodes.length - 1];
}

function submitDeleteForm() {
    try {
        let deleteForm = document.querySelector('form[action$="delete"]')
        let repoName = deleteForm.action.match(/\.com\/(.*\/.*)\/settings\/delete/)[1];
        console.log(`repo name found: ${repoName}`);
        deleteForm.querySelector('input:not([type=hidden])').value = repoName;
        console.log('submitting delete form');
        deleteForm.submit()
    } catch (error) {
        console.error('error occurred trying to submit delete form:', error);
    }
}