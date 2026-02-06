export class Book {
    constructor(id, title, author, pages, image, stock) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.image = image;
        this.stock = stock;
    }
    rent() {
        if (this.stock > 0) {
            this.stock--;
            return true;
        } else {
            return false;
        }
    }
}


