import { notes, categories } from './data.js';
import { getCategoryNameById, getDatesInNoteContent, getCategoryIcon, getSelect } from './services.js';

function updateUI(formContainer) {
    try {
        const notesListContainer = document.querySelector('.notes-list');
        notesListContainer.innerHTML = ''; 
        notes.forEach(note => {
            if (note.active) {
                const noteElement = createNoteElement(note, formContainer); 
                notesListContainer.appendChild(noteElement);
            }
        });
        updateSummaryTable();
    } catch (error) {
        console.error('An error occurred while updating the UI:', error);
    }
}

function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
    <div class="note__icon"><i class="material-icons">${getCategoryIcon(note.category)}</i></div>
    <div class="note__name">${note.name}</div>
    <div class="note__created">${note.created}</div>
    <div class="note__category">${getCategoryNameById(note.category)}</div>
    <div class="note__content">${note.content}</div>
    <div class="note__dates">${getDatesInNoteContent(note.content)}</div>
    <button class="btn-edit note-btn">
        <i class="material-icons">create</i>
    </button>
    <button class="btn-archive note-btn">
        <i class="material-icons">archive</i>
    </button>
    <button class="btn-delete note-btn">
        <i class="material-icons">delete</i>
    </button>
    `;

    const editButton = noteElement.querySelector('.btn-edit');
    editButton.addEventListener('click', () => {
        showEditForm(note, formContainer);
    });

    const archiveButton = noteElement.querySelector('.btn-archive');
    archiveButton.addEventListener('click', () => {
    note.active = false;
    updateUI();
    });

    const deleteButton = noteElement.querySelector('.btn-delete');
    deleteButton.addEventListener('click', () => {
    const index = notes.findIndex(item => item.id === note.id);
    if (index !== -1) {
        notes.splice(index, 1);
    }
    updateUI();
    });
    return noteElement;
}

function showForm(formContainer) {
    formContainer.innerHTML = `
        <form class="form-note">
        <div class="form-note__title">Name:</div>
        <input class="form-note__name">
        <div class="form-note__title">Category:</div>
        <select class="form-note__select">
            ${getSelect()}
        </select>
        <div class="form-note__title">Content:</div>
        <textarea class="form-note__content"></textarea>
        <div class="">
            <input class="form-note__checkbox" type="checkbox" checked>
            <span class="form-note__title">Active</span>
        </div>
        <div>
            <input class="form-note__btn btn-save" type="submit" value="Create">
            <input class="form-note__btn btn-cancel" type="reset" value="Cancel">
        </div>
        </form>
    `;

    const createButton = formContainer.querySelector('.btn-save');
    const cancelButton = formContainer.querySelector('.btn-cancel');

    createButton.addEventListener('click', (event) => {
        event.preventDefault();

        const name = formContainer.querySelector('.form-note__name').value;
        const category = formContainer.querySelector('.form-note__select').value;
        const content = formContainer.querySelector('.form-note__content').value;
        const active = formContainer.querySelector('.form-note__checkbox').checked;

        const newNote = {
            id: notes.length + 1, 
            name: name,
            created: new Date().toLocaleDateString(), 
            content: content,
            category: parseInt(category), 
            active: active,
        };
        notes.push(newNote);
        formContainer.innerHTML = '';
        updateUI();
    });

    cancelButton.addEventListener('click', () => {
        formContainer.innerHTML = '';
    });

    
}

function showEditForm(note, formContainer) {
    formContainer.innerHTML = `
        <form class="form-note">
        <div class="form-note__title">Name:</div>
        <input class="form-note__name" value="${note.name}">
        <div class="form-note__title">Category:</div>
        <select class="form-note__select">
            ${getSelect(note.category)}
        </select>
        <div class="form-note__title">Content:</div>
        <textarea class="form-note__content">${note.content}</textarea>
        <div class="form-note__checkboxdiv">
            <input class="form-note__checkbox" type="checkbox" ${note.active ? 'checked' : ''}>
            <span class="form-note__title">Active</span>
        </div>
        <div>
            <input class="form-note__btn update-btn" type="submit" value="Update">
            <input class="form-note__btn cancel-btn" type="button" value="Cancel">
        </div>
        </form>
    `;

    const updateButton = formContainer.querySelector('.update-btn');
    const cancelButton = formContainer.querySelector('.cancel-btn');

    updateButton.addEventListener('click', (event) => {
        event.preventDefault();

        const name = formContainer.querySelector('.form-note__name').value;
        const category = formContainer.querySelector('.form-note__select').value;
        const content = formContainer.querySelector('.form-note__content').value;
        const active = formContainer.querySelector('.form-note__checkbox').checked;

        note.name = name;
        note.category = parseInt(category);
        note.content = content;
        note.active = active;

        formContainer.innerHTML = '';
        updateUI();
    });

    cancelButton.addEventListener('click', () => {
        formContainer.innerHTML = '';
    });
}

function updateSummaryTable() {
    const activeNotesByCategory = categories.map(category => {
        return {
            category: category.name,
            count: notes.filter(note => note.category === category.id && note.active).length,
            archivedCount: notes.filter(note => note.category === category.id && !note.active).length,
            icon: category.icon,
        };
    });

    const summaryTable = document.querySelector('.categories-list');
    summaryTable.innerHTML = ''
    activeNotesByCategory.forEach(item => {
        const row = document.createElement('div');
        row.classList.add('summary-row');
        row.innerHTML = `
            <div class="note__icon">
                <i class="material-icons">${item.icon}</i>  
            </div>
            <div>${item.category}</div>
            <div>${item.count}</div>
            <div>${item.archivedCount}</div>
        `;
        summaryTable.appendChild(row);
    });
}

function showArchivedNotes(archivedNotesContainer) {
    archivedNotesContainer.innerHTML = '';

    notes.forEach(note => {
        if (!note.active) {
            const noteElement = createArchivedNoteElement(note);
            archivedNotesContainer.appendChild(noteElement);
        }
    });
}

function createArchivedNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('archived-note');
    noteElement.innerHTML = `<div class="note__icon"><i class="material-icons">${getCategoryIcon(note.category)}</i></div>
    <div class="note__name">${note.name}</div>
    <div class="note__created">${note.created}</div>
    <div class="note__category">${getCategoryNameById(note.category)}</div>
    <div class="note__content">${note.content}</div>
    <div class="note__dates">${getDatesInNoteContent(note.content)}</div>
    <button class="btn-unarchive note-btn">
            <i class="material-icons">unarchive</i>
        </button>
    `;

    const unarchiveButton = noteElement.querySelector('.btn-unarchive');
    unarchiveButton.addEventListener('click', () => {
        unarchiveNote(note.id);
        noteElement.remove();
        updateUI();
    });

    return noteElement;
}

function unarchiveNote(noteId) {
    const note = notes.find(note => note.id === noteId);
    if (note) {
        note.active = true;
    }
}

export {
    updateUI,
    createNoteElement,
    showEditForm,
    showForm,
    updateSummaryTable,
    showArchivedNotes,
    createArchivedNoteElement,
};
