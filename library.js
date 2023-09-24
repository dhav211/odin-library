const addBookForm = document.getElementById("add-book-form");
const submitButton = document.getElementById("submit-btn");
let books = [];

submitButton.addEventListener("click", (event) => {
    addBook();
    event.preventDefault();
});

function addBook() {
    // const form = element.closest('form');
    const forms = addBookForm.elements;
    books.push(forms["bname"].value);
    // console.log(form.elements["bname"].value);
    console.log(`Add book named ${forms["bname"].value}`);
    console.log(`You have ${books.length} in your library`);
    for (let i = 0; i < forms.length - 1; i++) {
        forms[i].value = "";
    }
}