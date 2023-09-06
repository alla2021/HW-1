import { updateUI, showArchivedNotes, showForm, createArchivedNoteElement } from './views.js';
import { notes } from '../scripts/data.js'

const archiveAllButton = document.querySelector('.btn-archive-all');
const deleteAllButton = document.querySelector('.btn-delete-all');

const buttonCreate = document.querySelector('.button-create');
const formContainer = document.querySelector('.form');
//summary table
const archivedListButton = document.querySelector('.archived-list-btn');
const activeListButton = document.querySelector('.active-list-btn');
const archivedNotesContainer = document.querySelector('.archived-notes');

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
  const createNoteBtn = document.querySelector('.button-create');
  createNoteBtn.style.display = 'none';
});

//summary table
archivedListButton.addEventListener('click', () => {
  showArchivedNotes(archivedNotesContainer);
});

activeListButton.addEventListener('click', () => {
  archivedNotesContainer.innerHTML = '';
  updateUI(formContainer);
});

updateUI(formContainer);
