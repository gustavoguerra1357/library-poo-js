import './style.css'
import { Book } from './entities/Book.js';
import { Library } from './entities/Library.js';
import { Rent } from './entities/Rent.js';

const library = new Library();

const newBtn = document.querySelector("#newBtn")
const closeNewBtn = document.querySelector("#btn-cancelar")
const form = document.querySelector("#form-livro")
const modalNewBook = document.querySelector("#modal-newbook")


const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const imageInput = document.querySelector('#input-imagem');
const stockInput = document.querySelector('#stock');



newBtn.addEventListener("click", e => {
    modalNewBook.classList.remove("hidden")
});
closeNewBtn.addEventListener("click", e => {
    modalNewBook.classList.add("hidden")
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
        createCard(book, listOfBooks)
    })
}

function createCard(book, listOfBooks) {

    const div = document.createElement("div");
    const image = document.createElement("img");
    image.src = book.image;
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const stock = document.createElement("p");

    title.innerText = book.title;
    author.innerText = book.author;
    stock.innerText = "Em Estoque: " + book.stock;

    div.addEventListener("click", e => {
        e.stopPropagation();
        openBook(book);
    })

    div.append(image, title, author, stock);
    listOfBooks.appendChild(div);

}
function openBook(book) {
    toggleScroll();
    //Essa funcao é responsavel por abrir e mostrar todas as informações do livro
    const infoBook = document.querySelector("#modal-infoBook");
    const closeBtn = document.querySelector("#close-info");

    closeBtn.onclick = () => {
        infoBook.classList.add("hidden");
        toggleScroll();
        
    }
    updateInfos(book)

    const RentBtn = document.querySelector("#rent-btn");

    RentBtn.onclick = () => {
        const name = document.querySelector("#name-input").value;
        const date = document.querySelector("#date-input").valueAsDate;
        const rent = new Rent(name, date);
        library.rentBook(book, rent);
        updateInfos(book)
        renderRents(book);
    }

    renderRents(book);
    infoBook.classList.remove("hidden");
}
function renderRents(book) {
    const rentsContainer = document.querySelector("#rents-container");
    rentsContainer.innerHTML = "";
    const rentsOfBook = book.rents; // cada array vai ser um rent

    rentsOfBook.forEach(e => {
        const div = document.createElement("div");
        const devolvido = document.createElement("button");
        devolvido.innerText = "X"
        devolvido.classList.add("close-button-rents");
        devolvido.addEventListener("click", () => {
            div.remove();
            // const index = rentsOfBook.indexOf(e); // Encontra a posição deste objeto específico
            book.removerAluguel(e);
            library.removerAluguel(e)
            updateInfos(book);
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

document.querySelector("#rentsBtn").addEventListener("click", x => {
    const modalRents = document.querySelector("#modal-rents")
    document.querySelector("#rentsbook-list").innerHTML = ""
    if(modalRents.classList.contains("hidden")) {
        toggleScroll();
        modalRents.classList.remove("hidden");
    }
    const rents = library.getRentedBooks();
    rents.forEach((x) => { //x = [livro, rent]
        const div = document.createElement("div");
        const devolvido = document.createElement("button");
        devolvido.innerText = "X"
        devolvido.classList.add("close-button-rents")
        devolvido.addEventListener("click", () => {
            div.remove();
            // const index = rents.indexOf(x); // Encontra a posição deste objeto específico
            library.removerAluguel(x[1])

        })

        const formatedDate = new Intl.DateTimeFormat('pt-BR').format(x[1].devolucao)
        div.innerText = "Livro: " + x[0].title + ", Data de Devolução: " + formatedDate + ", pego por: " + x[1].name;
        div.classList.add("rents");
        div.appendChild(devolvido);
        document.querySelector("#rentsbook-list").appendChild(div);
    })
})

document.querySelector("#close-rents").addEventListener("click", x => {
    document.querySelector("#modal-rents").classList.add("hidden");
    toggleScroll();
})

function toggleScroll() {
    if (document.body.style.overflow == 'hidden') {
        document.body.style.overflow = '';
    }
    else {
        document.body.style.overflow = 'hidden';
    }
}
