import './style.css'
import { Book } from './entities/Book.js';
import { Library } from './entities/Library.js';

const library = new Library();

const newBtn = document.querySelector("#newBtn")
const form = document.querySelector("#form-livro")
const modalNewBook = document.querySelector("#modal-newbook")


const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const imageInput = document.querySelector('#input-imagem');
const stockInput = document.querySelector('#stock');



newBtn.addEventListener("click", e => {
    modalNewBook.classList.remove("hidden")
})

form.addEventListener('submit', (event) => { addBock(event) })

function addBock(event) {
    event.preventDefault(); // impede o reload da página
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = Number(pagesInput.value);
    const stock = Number(stockInput.value);

    const imageFile = imageInput.files[0]; // arquivo da imagem
    const leitor = new FileReader()
    const id = crypto.randomUUID();
    leitor.onload = function (e) {
        const imagemBase64 = e.target.result;
        const newBook = new Book(id, title, author, pages, imagemBase64, stock);
        library.addBook(newBook);
        renderBooks();

    }
    if (imageFile) {
        leitor.readAsDataURL(imageFile);
    }
    renderBooks();
}

function renderBooks() {
    // const listOfBooks = document.querySelector("#list-books")

    // Array.from(listOfBooks.children).forEach(e => {
    //     e.remove();
    // })

    const allBooks = library.getAllBooks();
    allBooks.forEach(book => {
        createCard(book)
    })
}

function createCard(book) {
    const listOfBooks = document.querySelector("#list-books")

    const div = document.createElement("div");
    const image = document.createElement("img");
    image.src = book.image;
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const stock = document.createElement("p");

    title.innerText = book.title;
    author.innerText = book.author;
    stock.innerText = book.author;

    div.append(image, title, author, stock);
    listOfBooks.appendChild(div);

}

