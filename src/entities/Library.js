export class Library {
    constructor() {
        this.books = [];
        this.rentedBooks = []; // [book, rent]
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
    }
    getAllBooks() {
        return this.books;
    }
    rentBook(book, rent) {
        if (!book) {
            throw new Error('Livro não encontrado');
        }

        const success = book.rent(rent);

        if (!success) {
            throw new Error('Livro sem estoque');
        }

        this.rentedBooks.push([book, rent]);
        return book;
    }

    getRentedBooks() {
        return this.rentedBooks;
    }
    removerAluguel(rentToRemove) {
        const registro = this.rentedBooks.find(item => item[1] === rentToRemove);//retorna [book, rent]
        if (registro) {
            const [book, rent] = registro;
            book.removerAluguel(rent);
            this.rentedBooks = this.rentedBooks.filter(item => item[1] !== rentToRemove);
        }
    }

}
