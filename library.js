const addBookForm = document.getElementById("add-book-form");
const submitButton = document.getElementById("submit-btn");
const mainArea = document.getElementsByTagName("main")[0];
let books = [];

submitButton.addEventListener("click", (event) => {
    addBook();
    addBookForm.reset();
    event.preventDefault();
});

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.html = ""
}

function addBook() {
    const forms = addBookForm.elements;

    let book = new Book(forms["bname"].value, forms["bauthor"].value, forms["bpages"].value, forms["read"].checked)
    books.push(book);

    const bookCard = document.createElement('div');
    bookCard.classList.add('card');

    const bookName = document.createElement('h2');
    bookName.textContent = book.name;
    bookCard.append(bookName);

    const bookAuthor = document.createElement('h3');
    bookAuthor.textContent = book.author;
    bookCard.append(bookAuthor);

    const pageReadRow = document.createElement('div');
    pageReadRow.classList.add('page-read-row');

    const bookPages = document.createElement('p');
    bookPages.classList.add('pages')
    bookPages.textContent = `${book.pages} pages`;
    pageReadRow.append(bookPages);

    const bookRead = document.createElement('p');
    bookRead.textContent = book.read ? "Read" : "Not Read";
    pageReadRow.append(bookRead);

    bookCard.append(pageReadRow);

    const removeButtonArea = document.createElement('div');
    removeButtonArea.classList.add('remove-button-area');
    const removeBookButton = document.createElement('button');
    removeBookButton.addEventListener('click', (event) => {
        bookCard.remove();
        const removeIndex = books.indexOf(book);
        books.splice(removeIndex, 1);
        event.preventDefault();
    });
    removeBookButton.textContent = "Remove";
    removeButtonArea.append(removeBookButton);
    bookCard.append(removeButtonArea);


    mainArea.append(bookCard);
}