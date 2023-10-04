const addBookForm = document.getElementById("add-book-form");
const submitButton = document.getElementById("submit-btn");
const mainArea = document.getElementsByTagName("main")[0];
let books = [];

submitButton.addEventListener("click", (event) => {
    if (validateForms()) {
        addBook();
        resetForms();
    } 
    event.preventDefault();
});

class Book {
    constructor(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.html = ""
    }
}

function validateForms() {
    let areCorrect = true;
    const bookName = document.getElementById("bname");
    const bookNameError = document.getElementById("name-field-error");
    const authorName = document.getElementById("bauthor");
    const authorNameError = document.getElementById("author-field-error")
    const bookPages = document.getElementById("bpages");
    const bookPagesError = document.getElementById("pages-field-error");
    const readRadio = document.getElementById("read");
    const notReadRadio = document.getElementById("not-read");
    const readButtonsError = document.getElementById("read-field-error");

    if (bookName.value.length == 0) {
        areCorrect = false;
        bookNameError.style.display = "block";
    } else {
        bookNameError.style.display = "none";
    }

    if (authorName.value.length == 0) {
        areCorrect = false;
        authorNameError.style.display = "block";
    } else {
        authorNameError.style.display = "none";
    }

    if (bookPages.value.length == 0) {
        areCorrect = false;
        bookPagesError.style.display = "block";
        bookPagesError.textContent = "An empty book?";
    } else {
        let doesPagesContainsALetter = false;
        for (let i in bookPages.value) {
            const char = bookPages.value[i];
            if (char < '0' || char > '9') {
                doesPagesContainsALetter = true;
            }
        }
    
        if (doesPagesContainsALetter) {
            areCorrect = false;
            bookPagesError.style.display = "block";
            bookPagesError.textContent = "Only numbers!";
        } else {
            bookPagesError.style.display = "none";
        }
    }

    if (!readRadio.checked && !notReadRadio.checked) {
        areCorrect = false;
        readButtonsError.style.display = "block";
    } else if (readRadio.checked || notReadRadio.checked) {
        bookPagesError.style.display = "none";
    }


    return areCorrect;
}

function resetForms() {
    addBookForm.reset();
 
    document.getElementById("name-field-error").style.display = "none";
    document.getElementById("author-field-error").style.display = "none";
    document.getElementById("pages-field-error").style.display = "none";
    document.getElementById("read-field-error").style.display = "none";
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

    const cardButtonArea = document.createElement('div');
    cardButtonArea.classList.add('button-area');

    const removeBookButton = document.createElement('button');
    removeBookButton.addEventListener('click', (event) => {
        bookCard.remove();
        const removeIndex = books.indexOf(book);
        books.splice(removeIndex, 1);
        event.preventDefault();
    });
    removeBookButton.textContent = "Remove";
    cardButtonArea.append(removeBookButton);
    
    const readBookButton = document.createElement('button');
    readBookButton.addEventListener('click', (event) => {
        book.isRead = true;
        bookRead.textContent = "Read";
    })
    readBookButton.textContent = "Read";
    cardButtonArea.append(readBookButton);
    
    bookCard.append(cardButtonArea);

    mainArea.append(bookCard);
}