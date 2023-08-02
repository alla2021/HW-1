import { notes, categories } from './data.js';
import { getArchivedNotesCount, getCategoryNameById, getDatesInNoteContent, getCategoryIcon, getSelect } from './services.js';

const formContainer = document.querySelector('.form');

function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
    <div class="note__icon"><i class="material-icons">${getCategoryIcon(note.category)}</i></div>
    <div class="note-name">${note.name}</div>
    <div class="note-created">${note.created}</div>
    <div class="note-category">${getCategoryNameById(note.category)}</div>
    <div class="note-content">${note.content}</div>
    <div class="note-dates">${getDatesInNoteContent(note.content)}</div>
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
        <textarea class="form-note__content" cols="35" rows="10">${note.content}</textarea>
        <div class="form-note__checkboxdiv">
            <input class="form-note__checkbox" type="checkbox" ${note.active ? 'checked' : ''}>
            <span class="form-note__label4">Active</span>
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
        <textarea class="form-note__content" cols="35" rows="10"></textarea>
        <div class="form-note__checkboxdiv">
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
            category: category, 
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



    function updateSummaryTable() {
    const activeNotesByCategory = categories.map(category => {
        return {
        category: category.name,
        count: notes.filter(note => note.category === category.id && note.active).length,
        icon: category.icon, // Add the icon property to the category object
        };
    });

    const summaryTable = document.querySelector('.header-result-table');
    summaryTable.innerHTML = '';

    // Add table headers
    const headerRow = document.createElement('div');
    headerRow.classList.add('table-header');
    headerRow.innerHTML = `
        <div>Note Category</div>
        <div class="active-list">Active</div>
        <div class="archived-list">Archived</div>
    `;
    summaryTable.appendChild(headerRow);

    // Add table rows
    activeNotesByCategory.forEach(item => {
        const row = document.createElement('div');
        row.classList.add('summary-row');
        row.innerHTML = `
        <div><i class="${getCategoryIcon(item.icon)}"></i> ${item.category}</div>
        <div>${item.count}</div>
        <div>${getArchivedNotesCount(item.category)}</div>
        `;
        summaryTable.appendChild(row);
    });
}

    export {
    updateUI,
    createNoteElement,
    showEditForm,
    showForm,
    updateSummaryTable,
    };
