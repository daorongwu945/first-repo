// Replace these sample entries with your own reading history.
// Dates use YYYY-MM-DD for reliable sorting. year is finished year (or shelf year for unread books).
// Covers are loaded from Open Library; a local title/author fallback appears if unavailable.
const readingGoal = { year: 2026, target: 30 };
const books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    isbn: "9781408894620",
    rating: 5,
    status: "read",
    genre: "Fantasy",
    year: 2026,
    finishedDate: "2026-09-18",
    review: "A magical and imaginative start to the Harry Potter series. The world-building is charming, the characters are memorable, and it was an enjoyable read from beginning to end.",
    tags: ["Fantasy", "Magic", "Adventure"]
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J. K. Rowling",
    isbn: "9781338878936",
    rating: 5,
    status: "read",
    genre: "Fantasy",
    year: 2026,
    finishedDate: "2026-08-25",
    review: "A darker and more mysterious follow-up to the first book. I enjoyed the suspense around the Chamber of Secrets, the new characters, and how the story expanded the magical world of Hogwarts.",
    tags: ["Fantasy", "Magic", "Mystery"]
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J. K. Rowling",
    isbn: "9781338878943",
    rating: 5,
    status: "read",
    genre: "Fantasy",
    year: 2026,
    finishedDate: "",
    review: "One of the strongest books in the series. The mystery surrounding Sirius Black is compelling, and the story adds more depth to Harry's past while introducing some unforgettable characters.",
    tags: ["Fantasy", "Magic", "Mystery"]
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    author: "J. K. Rowling",
    isbn: "9781338878950",
    rating: 5,
    status: "read",
    genre: "Fantasy",
    year: 2026,
    finishedDate: "",
    review: "The series becomes much bigger and more intense here. The Triwizard Tournament makes the story exciting, while the ending marks a major turning point for Harry and the wizarding world.",
    tags: ["Fantasy", "Magic", "Adventure"]
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    author: "J. K. Rowling",
    isbn: "9781338878967",
    rating: 5,
    status: "read",
    genre: "Fantasy",
    year: 2026,
    finishedDate: "",
    review: "A longer and more emotional entry in the series. Harry's frustration, the resistance against Umbridge, and the formation of Dumbledore's Army make this feel like a story about growing up and standing up for what matters.",
    tags: ["Fantasy", "Magic", "Resistance"]
  },
  {
    title: "Harry Potter and the Half-Blood Prince",
    author: "J. K. Rowling",
    isbn: "9781338878974",
    rating: 5,
    status: "read",
    genre: "Fantasy",
    year: 2026,
    finishedDate: "",
    review: "A fascinating mix of mystery, character development, and darker history. Learning more about Voldemort's past gives the story much more depth, and the ending is one of the most memorable in the series.",
    tags: ["Fantasy", "Magic", "Dark Fantasy"]
  },
  {
    title: "Harry Potter and the Deathly Hallows",
    author: "J. K. Rowling",
    isbn: "9781338878981",
    rating: 5,
    status: "read",
    genre: "Fantasy",
    year: 2026,
    finishedDate: "",
    review: "A powerful conclusion to the series. The story brings together years of friendships, sacrifices, mysteries, and conflicts, giving the characters and the wizarding world a satisfying final chapter.",
    tags: ["Fantasy", "Magic", "Adventure"]
  }
].map(book => ({
  ...book,
  cover: book.cover || `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
}));
