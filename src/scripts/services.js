import { notes, categories } from './data.js';

function getCategoryIcon(categoryId) {
  const category = categories.find(category => category.id === categoryId);
  return category ? category.icon : 'info_outline';
}

function getCategoryNameById(categoryId) {
  const category = categories.find(category => category.id === categoryId);
  return category ? category.name : '';
}

function getDatesInNoteContent(content) {
  const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
  const dates = content.match(dateRegex) || [];
  return dates.join(', ');
}

function getArchivedNotesCount(categoryName) {
  return notes.filter(note => note.category === getCategoryByName(categoryName) && !note.active).length;
}

function getCategoryByName(categoryName) {
  const category = categories.find(category => category.name === categoryName);
  return category ? category.id : null;
}

function getSelect() {
  return categories.map(category => `<option value="${category.id}">${category.name}</option>`).join('');
}

export {
  getCategoryIcon,
  getCategoryNameById,
  getDatesInNoteContent,
  getArchivedNotesCount,
  getCategoryByName,
  getSelect,
};
