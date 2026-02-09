export class Book {
    constructor(title, author, pages, image, stock) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.image = image;
        this.stock = stock;
        this.rents = []
    }
    rent(rent) {
        if (this.stock > 0) {
            this.stock--;
            this.rents.push(rent)
            return true;
        } else {
            return false;
        }
    }

}


