class Buku {
    constructor(judul, kategori, penerbit, jmlHalaman, isbn) {
        this.judul = judul;
        this.kategori = kategori;
        this.penerbit = penerbit;
        this.jmlHalaman = jmlHalaman;
        this.isbn = isbn;
    }
}

module.exports = {Buku:Buku};