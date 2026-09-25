# Bookshelf

Open `bookshelf.html` directly in a browser or use the Bookshelf link in the portfolio navigation. No build tools or dependencies are required.

## Editing the collection

Edit the `books` array in `books.js`. All entries and reading notes are sample content. Each entry has a title, author, ISBN (for the Open Library cover), rating (an integer from 1 to 5, or `null`), status (`read`, `reading`, or `want-to-read`), genre, year, finishedDate (`YYYY-MM-DD` or `null`), review, optional quote, and tags array.

The final array mapping adds a `cover` URL from each ISBN. To use your own cover images, add a `cover` URL or relative image path to an entry; it takes precedence over the generated URL.

Set the year and target in `readingGoal` to change the annual goal. Statistics, tab counts, genres, and years update automatically from the array. The year filter uses finished year for read books and shelf year for unread books. Recently read puts finished books first; unrated books appear last when sorting by rating. Author sort uses the displayed author name.

## Files

- `bookshelf.html`: page structure and portfolio navigation/footer.
- `bookshelf.css`: responsive page styling, including reduced-motion support.
- `books.js`: sample collection and reading goal.
- `bookshelf.js`: search, filtering, sorting, statistics, cover fallbacks, and native dialog interactions.

Google Fonts and Open Library covers require an internet connection. System font and title/author cover fallbacks work without those services. The page does not save reading changes or send search input to a server.
