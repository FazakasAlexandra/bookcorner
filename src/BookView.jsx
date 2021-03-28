import './css/style.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TradeList from './components/TradeList.jsx';
import BookViewInfo from './components/BookViewInfo.jsx';
import BooksDatabase from './database/books.js'
import UsersDatabase from './database/users.js'

function BookView(props) {
    const baseUrl = `http://afazakas.com/bookcorner`;
    let { id } = useParams();
    let history = useHistory()
    const [book, setBook] = useState({});
    const [tradedBooksIds, setTradedBooks] = useState([])
    const [isNrShown, setNrShown] = useState(false);
    const [tradeOn, setTrade] = useState(false);
    const [infoOn, setInfo] = useState(false);
    const booksDatabase = new BooksDatabase;
    const usersDatabase = new UsersDatabase;

    useEffect(() => {
        booksDatabase.getBook(id).then((res) => {
            setBook(res.data)
            console.log(props.user.id !== res.data.owner.id)
        });
    }, {})

    function getTradeBooks() {
        return book.trade.map(trade => {
            return <div className="single-info-trade-container">
                <div className="wraper"><h5>Author </h5> <span>{trade.author}</span></div>
                <div className="wraper"><h5>Title </h5> <span>{trade.title}</span></div>
                <div className="wraper"><h5>Language </h5> <span>{trade.language}</span></div>
            </div>
        })
    }

    function handleProposeTrade() {
        if (props.isAuth) {
            if (infoOn) setInfo(false)
            setTrade(true);
        } else {
            history.push(`/signin`)
            props.handleBlur(false)
        }
    }

    function handleTradeDone() {
        setTrade(false)
        if (tradedBooksIds.length > 0) {
            Promise.allSettled(tradedBooksIds.map((tradedBookId) => booksDatabase.tradeBook({ tradedBookId, forBookId: book.id })))
                .then(() => {
                    usersDatabase.getUser(props.user.id).then((res) => {
                        props.setUser(res.data)
                        setTradedBooks([])
                    })
                })
        }
    }

    return (
        <>
            <div className="single">

                {/* EXIT BOOK VIEW BUTTON */}
                <FontAwesomeIcon icon="times-circle" onClick={() => {
                    history.push(`/browse`)
                    props.handleBlur(false)
                }} />

                {
                    !book['photos'] ?
                        /* SPINER RENDERS IF BOOK IS NOT SET */
                        <><FontAwesomeIcon icon="circle-notch" spin style={{ fontSize: "5rem" }} /></> :

                        /* BOOK VIEW RENDERS IF BOOK IS SET */
                        <>
                            <div className="single-section-1">

                                {/* PHONE BUTTON */}
                                {
                                    isNrShown ? <p class="phone" onClick={() => setNrShown(false)}>{book.owner.phone}</p> :
                                        <button className="propose-trade black-button" onClick={() => setNrShown(true)}>SHOW PHONE NUMBER</button>
                                }

                                {/* BOOK COVER */}
                                <figure>
                                    <img className="single-photo" src={`${baseUrl}/public/assets/books_pictures/${book.photos.find((photo) => parseInt(photo.is_cover_photo)).url}`} alt="book-cover" />
                                </figure>
                            </div>

                            <div className="trade-wraper" style={{ display: 'flex', width: 'fit-content' }}>
                                <div className="single-section-2">
                                    <div className="single-info-trade">

                                        {/* TRADE BUTTON RENDERS ONLY IF THE USER DIFFERS FROM THE BOOK OWNER */}
                                        {props.user.id != book.owner.id ?
                                            /* TRADE BUTTONS */
                                            tradeOn ?
                                                <button className="black-button" onClick={handleTradeDone}>DONE</button> :
                                                <button className="black-button" onClick={() => handleProposeTrade()}>TRADE</button>
                                            : null
                                        }

                                        {/* CANCEL TRADE BUTTON */}
                                        {tradeOn ? <button className="black-button" onClick={() => setTrade(false)}>CANCEL</button> : ''}

                                        {/* INFO BUTTONS */}
                                        {
                                            infoOn ?
                                                <button className="orange-button" onClick={() => setInfo(false)}>HIDE DETAILS</button> :
                                                <button className="orange-button" onClick={() => {
                                                    if (tradeOn) setTrade(false)
                                                    setInfo(true)
                                                }}>SHOW DETAILS</button>
                                        }

                                        {/* TRADE PREFFERENCES LIST */}
                                        <h3 style={{ marginBottom: '0px' }}>PREFFERS</h3>
                                        {
                                            book['trade'] < 1 ?
                                                <h3 style={{ paddingBottom: '1rem', fontSize: '1rem' }}>ANY BOOK</h3> :
                                                getTradeBooks()
                                        }
                                    </div>
                                </div>

                                {/* TRADE LIST */}
                                {tradeOn ? <TradeList user={props.user} setTradedBooks={(tradedBooksIds) => setTradedBooks(tradedBooksIds)} /> : ''}

                                {/* INFO BOOK LIST */}
                                {infoOn ? <BookViewInfo book={book} /> : ''}
                            </div>
                        </>
                }
            </div>
        </>
    );
}

export default BookView;
