const Buku = require('./Buku');

// class Buku {
//     constructor(judul, kategori, penerbit, jmlHalaman, isbn) {
//         this.judul = judul;
//         this.kategori = kategori;
//         this.penerbit = penerbit;
//         this.jmlHalaman = jmlHalaman;
//         this.isbn = isbn;
//     }
// }

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.judul}</td>
            <td>${book.kategori}</td>
            <td>${book.penerbit}</td>
            <td>${book.jmlHalaman}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#judul').value = '';
        document.querySelector('#kategori').value = '';
        document.querySelector('#penerbit').value = '';
        document.querySelector('#jmlHalaman').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Bersihkan dalam 3 detik
        setTimeout(() => document.querySelector('.alert').remove(), 2000)
    }
}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Buku
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add Buku
document.querySelector('#book-form').addEventListener('submit',  e => {
    // Prevent submit aktual
    e.preventDefault();

    // Get nilai form
    const judul = document.querySelector('#judul').value;
    const kategori = document.querySelector('#kategori').value;
    const penerbit = document.querySelector('#penerbit').value;
    const jmlHalaman = document.querySelector('#jmlHalaman').value;
    const isbn = document.querySelector('#isbn').value;

    // Validasi
    if(judul === '' || kategori === '' || penerbit === '' || jmlHalaman === '' || isbn === '') {
        UI.showAlert('Lengakapi semua data', 'danger')
    } else {

        // Instatiate Buku
        const books = new Buku(judul, kategori, penerbit, jmlHalaman, isbn);

        // Add buku ke UI
        UI.addBookToList(books);

        // Add buku ke store
        Store.addBook(books)

        // Tampilkan pesan sukses
        UI.showAlert('Buku ditambahkan', 'success')

        // Clear field
        UI.clearFields();
    }
})

// Event: Remove Buku
document.querySelector('#book-list').addEventListener('click', e => {
    // Remove buku dari UI
    UI.deleteBook(e.target);

    // Remove buku dari store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Tampilkan pesan remove
    UI.showAlert('Buku dihapus', 'success')
});