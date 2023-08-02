import { updateUI, showForm } from './views.js';

const archiveAllButton = document.querySelector('.btn-archive-all');
const deleteAllButton = document.querySelector('.btn-delete-all');
const buttonCreate = document.querySelector('.button-create');
const formContainer = document.querySelector('.form');

archiveAllButton.addEventListener('click', () => {
  notes.forEach(note => {
    note.active = false;
  });
  updateUI(formContainer); 
});

deleteAllButton.addEventListener('click', () => {
  notes.length = 0;
  updateUI(formContainer); 
});

buttonCreate.addEventListener('click', () => {
  showForm(formContainer); 
});

updateUI(formContainer);
