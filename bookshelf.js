'use strict';
const $ = selector => document.querySelector(selector);
const statusLabels = { read: 'Read', reading: 'Reading', 'want-to-read': 'Want to Read' };
let activeStatus = 'all';
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const dateLabel = date => date ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`)) : 'Not finished yet';
const stars = rating => rating == null ? '<span class="status-label">Not rated yet</span>' : `<span class="rating" role="img" aria-label="${rating} out of 5 stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>`;
function coverHTML(book) {
  return `<div class="cover"><img src="${escapeHTML(book.cover)}" alt="Cover of ${escapeHTML(book.title)}" loading="lazy" referrerpolicy="no-referrer"></div>`;
}
function attachCoverFallbacks(root) {
  root.querySelectorAll('.cover img').forEach(img => {
    img.addEventListener('error', () => {
      const book = books.find(book => book.cover === img.getAttribute('src'));
      const fallback = document.createElement('div');
      fallback.className = 'cover-fallback';
      fallback.innerHTML = `<span>${escapeHTML(book.title)}</span><small>${escapeHTML(book.author)}</small>`;
      img.replaceWith(fallback);
    }, { once: true });
  });
}
function getFilteredBooks() {
  const query = $('#search').value.trim().toLocaleLowerCase();
  const filtered = books.filter(book => (activeStatus === 'all' || book.status === activeStatus)
    && ($('#genre').value === 'all' || book.genre === $('#genre').value)
    && ($('#year').value === 'all' || String(book.year) === $('#year').value)
    && `${book.title} ${book.author}`.toLocaleLowerCase().includes(query));
  const sorters = {
    recent: (a, b) => (b.finishedDate || '').localeCompare(a.finishedDate || '') || a.title.localeCompare(b.title),
    rating: (a, b) => (b.rating ?? -1) - (a.rating ?? -1) || a.title.localeCompare(b.title),
    title: (a, b) => a.title.localeCompare(b.title),
    author: (a, b) => a.author.localeCompare(b.author) || a.title.localeCompare(b.title)
  };
  return filtered.sort(sorters[$('#sort').value]);
}
function gridHTML(collection) {
  return `<div class="book-grid">${collection.map(book => `<article class="book-card"><button class="book-button" type="button" data-book="${books.indexOf(book)}" aria-label="View details for ${escapeHTML(book.title)} by ${escapeHTML(book.author)}">${coverHTML(book)}<span class="book-title">${escapeHTML(book.title)}</span><span class="book-author">${escapeHTML(book.author)}</span></button><div class="book-meta">${book.rating == null ? `<span class="status-label">${statusLabels[book.status]}</span>` : stars(book.rating)}<span>${book.finishedDate ? dateLabel(book.finishedDate) : 'On my shelf'}</span></div></article>`).join('')}</div>`;
}
function renderBooks() {
  const filtered = getFilteredBooks();
  $('#result-count').textContent = `Showing ${filtered.length} of ${books.length} books`;
  $('#empty').hidden = filtered.length > 0;
  if ($('#group-years').checked) {
    const years = [...new Set(filtered.map(book => book.year))].sort((a, b) => b - a);
    $('#book-results').innerHTML = years.map(year => `<h2 class="year-heading">${year}</h2>${gridHTML(filtered.filter(book => book.year === year))}`).join('');
  } else $('#book-results').innerHTML = gridHTML(filtered);
  attachCoverFallbacks($('#book-results'));
}
const read = books.filter(book => book.status === 'read');
const thisYear = read.filter(book => book.year === readingGoal.year).length;
const rated = read.filter(book => book.rating != null);
$('#total-read').textContent = read.length;
$('#year-read').textContent = thisYear;
$('#average-rating').textContent = rated.length ? (rated.reduce((sum, book) => sum + book.rating, 0) / rated.length).toFixed(1) : '—';
$('#currently-reading').textContent = books.filter(book => book.status === 'reading').length;
$('#goal-title').textContent = `${readingGoal.year} Reading Goal`;
$('#goal-count').textContent = thisYear;
$('#goal-count').nextElementSibling.textContent = ` / ${readingGoal.target} books`;
$('#goal-progress').max = readingGoal.target;
$('#goal-progress').value = thisYear;
$('#goal-progress').textContent = `${thisYear} / ${readingGoal.target} books`;
$('#goal-progress').setAttribute('aria-label', `${readingGoal.year} reading goal`);
$('#goal-percent').textContent = `${Math.round(thisYear / readingGoal.target * 100)}%`;
$('#goal-note').textContent = thisYear < readingGoal.target ? `${readingGoal.target - thisYear} more adventures to go.` : 'Goal reached. Keep exploring!';
for (const genre of [...new Set(books.map(book => book.genre))].sort()) $('#genre').add(new Option(genre, genre));
for (const year of [...new Set(books.map(book => book.year))].sort((a, b) => b - a)) $('#year').add(new Option(year, year));
document.querySelectorAll('[data-status]').forEach(button => {
  button.querySelector('span').textContent = button.dataset.status === 'all' ? books.length : books.filter(book => book.status === button.dataset.status).length;
  button.addEventListener('click', () => {
    activeStatus = button.dataset.status;
    document.querySelectorAll('[data-status]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    renderBooks();
  });
});
$('#search').addEventListener('input', renderBooks);
['#genre', '#year', '#sort', '#group-years'].forEach(selector => $(selector).addEventListener('change', renderBooks));
$('#reset').addEventListener('click', () => {
  $('#search').value = ''; $('#genre').value = 'all'; $('#year').value = 'all'; $('#sort').value = 'recent';
  $('[data-status="all"]').click(); $('#search').focus();
});
const dialog = $('#book-dialog');
let lastTrigger;
$('#book-results').addEventListener('click', event => {
  const trigger = event.target.closest('[data-book]');
  if (!trigger) return;
  lastTrigger = trigger;
  const book = books[Number(trigger.dataset.book)];
  $('#detail-content').innerHTML = `<div class="detail-layout">${coverHTML(book)}<div><h2 id="detail-title">${escapeHTML(book.title)}</h2><p class="detail-author">${escapeHTML(book.author)}</p>${stars(book.rating)}<dl><dt>Status</dt><dd>${statusLabels[book.status]}</dd><dt>Finished</dt><dd>${dateLabel(book.finishedDate)}</dd><dt>Genre</dt><dd>${escapeHTML(book.genre)}</dd></dl><h3>My reading notes</h3><p>${escapeHTML(book.review)}</p><h3>Favourite quote</h3>${book.quote ? `<blockquote>“${escapeHTML(book.quote)}”</blockquote>` : '<p>No quote saved yet.</p>'}<div class="detail-tags">${(book.tags || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div><p class="detail-sample">Sample entry · replace these notes with your own.</p></div></div>`;
  attachCoverFallbacks($('#detail-content'));
  dialog.showModal();
  $('.close-dialog').focus();
});
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => lastTrigger?.focus());
renderBooks();
