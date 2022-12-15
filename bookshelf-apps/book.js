const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-bookshelf';
const STORAGE_KEY = 'BOOKSHELF_APPS';

let ID_BOOKS_COMPLETED = "completeBookshelfList";
let ID_BOOKS_UNCOMPLETED = "incompleteBookshelfList";
let ID_BOOK = "bookId";

// Find Book by ID
function findBook(bookId) {
  for (const bookItem of books) {
      if (bookItem.id === bookId) {
          return bookItem;
      }
  }
  return null;
}

function generateID() {
  return +new Date();
}

function generateBooksId(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}

// Function search Book -> baru ditambahakn 
function findBook(bookId){
  for(book of books){
      if(book.id === bookId)
      return book;
  }
  return null;
}

function IndexBook(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

// INI DITAMBAH
function isStorageExist() {
  if (typeof (Storage) === undefined) {
      alert('Browser Anda tidak mendukung local storage, harap gunakan browser lain!');
      return false;
  }
  return true;
}

// INI DITAMBAH untuk save book
// Save Book to Local Storage
function saveData() {
  if (isStorageExist()) {
      const parsed = JSON.stringify(books);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// INI DITAMBAH untuk get book 
// Get Book from Local Storage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
      for (const book of data) {
          books.push(book);
      }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}



function storageBook() {
  let completedBook = document.getElementById(ID_BOOKS_COMPLETED);
  let uncompletedBook = document.getElementById(ID_BOOKS_UNCOMPLETED);

  let bookTitle = document.getElementById('inputBookTitle').value;
  let bookAuthor = document.getElementById('inputBookAuthor').value;
  let bookYear = document.getElementById('inputBookYear').value;
  let isComplete = document.getElementById('inputBookIsComplete').checked;

  const generateId = generateID()
  let submitObjectBook = generateBooksId(generateId, bookTitle, bookAuthor, bookYear, isComplete)
  // let bookNew = makeBooks(bookTitle, bookAuthor, bookYear, isComplete)

  // ganti ini
  let bookNew = makeBooks(submitObjectBook)

  bookNew[ID_BOOK] = submitObjectBook.id;

  if (isComplete) {
    completedBook.append(bookNew);
  } else {
    uncompletedBook.append(bookNew);
  }

  books.push(submitObjectBook);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function makeBooks(submitObjectBook) {
  const nameBookTitle = document.createElement('h2');
  nameBookTitle.innerText = submitObjectBook.title;

  const nameBookAuthor = document.createElement('p');
  nameBookAuthor.classList.add('author');
  nameBookAuthor.innerText = "Author Buku : " + submitObjectBook.author;

  const nameBookYear = document.createElement('p');
  nameBookYear.classList.add('year');
  nameBookYear.innerText = "Tahun Buku : " + submitObjectBook.year;

  const section = document.createElement('article');
  section.classList.add('book_item');
  section.append(nameBookTitle, nameBookAuthor, nameBookYear);


  const btnSectionBook = document.createElement("div");
  btnSectionBook.classList.add("action");

  if (submitObjectBook.isComplete) {
    // ini diubah
    btnSectionBook.append(buttonFinished(submitObjectBook.id), buttonDelete(submitObjectBook.id));
  } else {
    // ini diubah
    btnSectionBook.append(buttonUnfinished(submitObjectBook.id), buttonDelete(submitObjectBook.id));
  }

  section.append(btnSectionBook);
  return section;

}

function buttonFinished(bookId) {
  const button = makeButton('btn_finished', 'belum selesai dibaca ', 'green');
  button.addEventListener('click', function () {
    bookToUnfinished(bookId);
  });
  return button;
}

function buttonUnfinished(bookId) {
  const button = makeButton('btn_unfinished', 'selesai dibaca ', 'green');
  button.addEventListener('click', function () {
    bookToFinished(bookId);
  });
  return button;
}

function buttonDelete(bookId) {
  const button = makeButton('btn_deleted', 'Hapus ', 'red');
  button.addEventListener('click', function () {
    bookToDeleted(bookId);
  });
  return button;
}

function makeButton(btnclass, text, color) {
  const button = document.createElement('button');
  button.innerText = text;
  button.classList.add(btnclass, color);
  return button;
}

// Add Book to complete read bookshelf
function bookToFinished(bookId) {
  console.log(bookId);
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  console.log(bookTarget);
  document.dispatchEvent(new Event(RENDER_EVENT));
  const book = findBook(bookElement[ID_BOOK]);
  saveData();
}

// Add Book to unread bookshelf
function bookToUnfinished(bookId) {
  console.log(bookId);
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  console.log(bookTarget);
  document.dispatchEvent(new Event(RENDER_EVENT));
  const book = findBook(bookElement[ID_BOOK]);
  saveData();
}


function bookToDeleted(bookId) {
  const bookTarget = IndexBook(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}



document.addEventListener('DOMContentLoaded', function () {
  const submitBook = document.getElementById('inputBook');
  submitBook.addEventListener('submit', function (event) {
    event.preventDefault();
    storageBook();
  })

  // INI DITAMBAH
  if (isStorageExist()) {
    loadDataFromStorage();
  }
})

// INI DITAMBAH
document.addEventListener(SAVED_EVENT, () => {
  console.log('Buku di simpan!');
});

document.addEventListener(RENDER_EVENT, function () {
  // console.log(books);
  const uncompletedBookList = document.getElementById('incompleteBookshelfList');
  const completedBookList = document.getElementById('completeBookshelfList');
  uncompletedBookList.innerHTML = '';
  completedBookList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBooks(bookItem);
    

    if (bookItem.isComplete) {
      completedBookList.append(bookElement);
    } else {
      uncompletedBookList.append(bookElement);
    }
  }
});

searchBook.addEventListener('submit', function(e){
  event.preventDefault();
  const searchBookByTitle = document.getElementById('searchBookTitle').value.toLowerCase();
  const bookItem = document.querySelectorAll(".book_item");

  for (book of bookItem){
      let text = book.querySelector(".book_item > h2").innerText;
      if(text.toLowerCase().indexOf(searchBookByTitle) > -1){
          book.style.display = '';
      }else{
          book.style.display = 'none';
      }
  }
  
})