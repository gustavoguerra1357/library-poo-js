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

    // get title() {
    //     return this.title
    // }
    // get author() {
    //     return this.author
    // }
    // get pages() {
    //     return this.pages
    // }
    // get image() {
    //     return this.image
    // }
    // get stock() {
    //     return this.stock
    // }
}


