import BookCard from './components/BookCard.jsx'
import React, { useEffect, useState } from "react";
import SearchBar from './components/SearchBar.jsx'
import Slogan from './components/Slogan.jsx'
import Pagination from './components/Pagination.jsx'
import { useHistory } from "react-router-dom";
import ReactModal from 'react-modal';
import BookView from './BookView.jsx'
import BooksDatabase from './database/books.js'

export default function Browse(props) {
    let [records, setRecords] = useState([])
    let [books, setBooks] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [offset, setOffset] = useState(0)
    const booksDatabase = new BooksDatabase()
    const history = useHistory();

    useEffect(() => {
        fetchBooks(`http://afazakas.com/bookcorner/books/offset/${offset}`)
    }, [offset])

    function generateBookCards() {
        if (books.length > 0) {
            return books.map(book => {
                return <BookCard
                    key={book.id}
                    url={book.photos.find((photo) => parseInt(photo.is_cover_photo)).url}
                    title={book.title}
                    handleCardClick={() => {
                        history.push(`browse/${book.id}`)
                        props.handleBlur(true)
                    }}
                />
            });
        } else {
            return <div style={{ padding: "4rem" }}><p>Books not found</p></div>
        }
    }

    function fetchBooks(url) {
        booksDatabase.getAllBooks(url).then((res) => setBrowseStates(res))
    }

    function setBrowseStates({ data, records }) {
        setBooks(data)
        setRecords(records)
    }
    
    return (
        <>
            <Slogan />
            <SearchBar
                fetchBooks={fetchBooks}
                showAllBooks={fetchBooks}
                setIsSearch={(bool) => setIsSearch(bool)}
            />

            <div className="book-cards-container">
                {generateBookCards()}
            </div>
            {
                isSearch ? '' :
                <Pagination
                    fetchBooks={fetchBooks}
                    records={records}
                    offset={offset}
                    setOffset={(newOffset) => setOffset(newOffset)}
                />
            }
            <ReactModal
                isOpen={props.modalState}
                contentLabel="Minimal Modal Example"
            >
                <BookView
                    handleBlur={props.handleBlur}
                    isAuth={props.isAuth}
                    user={props.user}
                    setUser={props.setUser}
                />
            </ReactModal>
        </>
    );
}
