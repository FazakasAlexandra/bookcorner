export default class BooksDatabase {
    constructor() {
        this.baseUrl = 'http://afazakas.com/bookcorner/books'
    }

    uploadBookCover(selectedFile) {
        const formData = new FormData();

        formData.append('file', selectedFile);

        return fetch(
            `${this.baseUrl}/cover/upload`,
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
    }

    addBookCover(cover) {
        return fetch(
            `${this.baseUrl}/cover`,
            {
                method: 'POST',
                body: JSON.stringify(cover),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
    }

    postBook(book) {
        return fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify({
                title: book.title,
                author: book.author,
                condition_fk: book.condition,
                pages: book.pages,
                description: book.description,
                publishing_house : book.publishing_house,
                owner_id: book.owner_id,
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
    }

    updateBook(updatedBook) {
        return fetch(this.baseUrl, {
            method: 'PUT',
            body: JSON.stringify({
                id: updatedBook.id,
                title: updatedBook.title,
                author: updatedBook.author,
                condition_fk: updatedBook.condition_fk,
                pages: updatedBook.pages
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
    }

    deleteBook(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    }

    // get all books or get all books search results
    getAllBooks(url = this.baseUrl) {
        return fetch(url).then(response => response.json())
    }

    tradeBook({ tradedBookId, forBookId }) {
        return fetch(`${this.baseUrl}/proposed`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                bookId: tradedBookId,
                proposedForBookId: forBookId
            })
        })
            .then(response => response.json())
    }

    getBook(id) {
        return fetch(`${this.baseUrl}/${id}`)
            .then(response => response.json())
    }
}