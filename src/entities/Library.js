export class Library {
    constructor() {
        this.books = [];
        this.rentedBooks = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }
    getAllBooks() {
        return this.books;
    }
    rentBook(id) {
        const book = this.books.find(b => b.id === id);

        if (!book) {
            throw new Error('Livro não encontrado');
        }

        const success = book.rent();

        if (!success) {
            throw new Error('Livro sem estoque');
        }

        this.rentedBooks.push(book);
        return book;
    }

    getRentedBooks() {
        return this.rentedBooks;
    }

}
