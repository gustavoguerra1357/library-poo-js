import './style.css'
import { Book } from './entities/Book.js';
import { Library } from './entities/Library.js';
import { Rent } from './entities/Rent.js';

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

//Adicionando livro
form.addEventListener('submit', (event) => {
    event.preventDefault(); // impede o reload da página
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = Number(pagesInput.value);
    const stock = Number(stockInput.value);

    const imageFile = imageInput.files[0]; // arquivo da imagem
    const leitor = new FileReader()
    leitor.onload = function (e) {
        const imagemBase64 = e.target.result;
        const newBook = new Book(title, author, pages, imagemBase64, stock);
        library.addBook(newBook);
        renderBooks();

    }
    if (imageFile) {
        leitor.readAsDataURL(imageFile);
    }
})



function renderBooks() {
    const listOfBooks = document.querySelector("#list-books");
    listOfBooks.innerHTML = ""
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

    div.addEventListener("click", e => {
        openBook();
    })

    div.append(image, title, author, stock);
    listOfBooks.appendChild(div);

}
function renderRents(book) {
    const rentsContainer = document.querySelector("#rents-container");
    rentsContainer.innerHTML = "";
    const rentsOfBook = book.rents;

    rentsOfBook.forEach(e => {
        const div = document.createElement("div");
        const devolvido = document.createElement("button");
        devolvido.innerText = "X"
        devolvido.classList.add("botao-devolvido");
        devolvido.addEventListener("click", () => {
            div.remove();
            const index = book.rents.indexOf(e); // Encontra a posição deste objeto específico
            if (index > -1) {
                book.rents.splice(index, 1); // Remove 1 item naquela posição
                book.stock += 1;
                document.querySelector("#stock-book").innerText = "Em Estoque: " + book.stock;
            }
        })
        div.innerText = "Nome: " + e.name + " Devolução: " + e.devolucao;
        div.appendChild(devolvido);
        rentsContainer.appendChild(div);
    })

}


function updateInfos(book) {
    document.querySelector("#image-book").src = book.image;
    document.querySelector("#title-book").innerText = "Titulo: " + book.title;
    document.querySelector("#author-book").innerText = "Autor: " + book.author;
    document.querySelector("#pages-book").innerText = "Páginas: " + book.pages;
    document.querySelector("#stock-book").innerText = "Em Estoque: " + book.stock;
}

function openBook(book) {
    const infoBook = document.querySelector("#modal-infoBook");
    const closeBtn = document.querySelector("#close-info");

    closeBtn.addEventListener("click", (x) => {
        infoBook.classList.add("hidden")
    })
    updateInfos(book)
    document.querySelector("#form-rent").addEventListener("submit", event => {
        event.preventDefault();
        const name = document.querySelector("#name-input").value;
        const date = document.querySelector("#date-input").valueAsDate;
        const rent = new Rent(name, date);
        book.rent(rent);
        updateInfos(book)



    })

    renderRents(book);
    infoBook.classList.remove("hidden");
}
