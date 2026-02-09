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
    devolver(indice) {
        if(indice > -1) {
            this.rents.splice(indice, 1); // Remove 1 item naquela posição
            this.stock += 1;
            return true
        }
        return false;
    }

}


