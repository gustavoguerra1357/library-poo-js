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

form.addEventListener('submit', (event) => {addBock(event)})

function addBock(event) {
    event.preventDefault(); // impede o reload da página
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = Number(pagesInput.value);
    const imageFile = imageInput.files[0]; // arquivo da imagem
    const stock = Number(stockInput.value);
    if (!imageFile) {
        alert('Selecione uma imagem');
        return;
    }
    const imageUrl = URL.createObjectURL(imageFile);
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, imageUrl, stock);
    library.addBook(newBook);
    renderBooks();
    console.log(library.getAllBooks());
}

function renderBooks() {
    // acessa library e for each e exibi
    const allBooks = library.getAllBooks();
    allBooks.forEach(e => {
        console.log(e)
    })
}

