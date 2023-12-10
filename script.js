const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
console.log('hello baby');
async function fetchBooks() {
  try {
    const response = await fetch('/api/books');
    const books = await response.json();

    bookList.innerHTML = '';
    books.forEach(book => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${book.title}</h3><p>Author: ${book.author}</p><p>Genre: ${book.genre}</p>`;
      bookList.appendChild(div);
    });
  } catch (err) {
    console.error('Error fetching books:', err);
  }
}
console.log('hello baby 2');
bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;

  const bookData = { title, author, genre };

  try {
    await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
      
    });
    fetchBooks();
    console.log('hello baby 3');
  } catch (err) {
    console.error('Error adding book:', err);
  }
});

fetchBooks();
