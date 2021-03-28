import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer, useState } from "react";
import BooksDatabase from '../database/books.js'
import UsersDatabase from '../database/users.js'
import { useHistory } from "react-router-dom";
import BookCard from './BookCard.jsx'

export default function BookForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [coverUrl, setCoverUrl] = useState(null)
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      owner_id: props.user.id,
      author: "",
      title: "",
      pages: "",
      description: "description is not needed",
      condition: "",
      publishing_house: "",
    }
  );
  const history = useHistory();

  const handleCancel = () => {
    history.push(`/browse`)
  }

  const onSubmit = () => {
    console.log(inputValues)
    const booksDatabase = new BooksDatabase()
    const usersDatabase = new UsersDatabase()

    booksDatabase.postBook(inputValues)
      .then((res) => {
        const bookId = res.book_id

        booksDatabase.uploadBookCover(selectedFile)
          .then((res) => {
            const fileName = res.file_name

            booksDatabase.addBookCover({ book_fk: bookId, url: fileName, is_cover_photo: 1 })
              .then(() => {
                usersDatabase.getUser(props.user.id).then(res => {
                  props.setUser(res.data)
                  history.push(`/browse/${bookId}`)
                })
              })
          })
      })
  }

  function onChangePicture(e) {
    const reader = new FileReader();
    setSelectedFile(e.target.files[0]);

    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("load", () => {
      setCoverUrl(reader.result)
    });
  }

  function handlePreview() {
    setPreview(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <div className="book-field">

        <div className="cover-field">
          <label htmlFor="cover">COVER : <span className="mandatory-field">*</span></label>
          <input name="cover" type="file" accept="image/*"
            ref={register({ required: true })}
            onChange={onChangePicture}
          />
          {errors.cover && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Cover must be uploaded</span>)}
          <BookCard
            src={coverUrl}
          />
        </div>

        <div className="info-field">
          <label htmlFor="title">TITLE : <span className="mandatory-field">*</span></label>
          <input
            name="title"
            className="input-orange"
            ref={register({ required: true })}
            onChange={(e) => setInputValues({ [e.target.name]: e.target.value })}
          />
          {errors.title && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Title must be specified</span>)}

          <label htmlFor="title">AUTHOR : <span className="mandatory-field">*</span></label>
          <input
            name="author"
            className="input-orange"
            ref={register({ required: true })}
            onChange={(e) => setInputValues({ [e.target.name]: e.target.value })}
          />
          {errors.author && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Author must be specified</span>)}

          <div className="pages-condition-fields">
            <div className="wraper pages">
              <label htmlFor="pages">PAGES : <span className="mandatory-field">*</span></label>
              <input
                name="pages"
                id="pages"
                type="number"
                className="input-orange"
                ref={register({ required: true })}
                onChange={(e) => setInputValues({ [e.target.name]: e.target.value })}
              />
            </div>

            <div className="wraper condition">
              <label htmlFor="condition">CONDITION : <span className="mandatory-field">*</span></label>
              <select
                name="condition"
                className="input-orange"
                ref={register({ required: true })}
                onChange={(e) => setInputValues({ [e.target.name]: e.target.value })}
              >
                <option value="0" defaultValue>select a condition</option>
                <option value="1">new</option>
                <option value="2">very good</option>
                <option value="3">good </option>
                <option value="4">damaged by water</option>
                <option value="5">old</option>
                <option value="6">used</option>
              </select>
            </div>
          </div>
          {errors.pages && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Pages must be specified</span>)}
          {errors.pages && errors.pages.type === 'pattern' && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Pages must be specified in numbers</span>)}
          {errors.condition && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Condition must be chosen</span>)}

          <label htmlFor="publishing_house">PUBLISHING HOUSE : <span className="mandatory-field">*</span></label>
          <input
            name="publishing_house"
            className="input-orange"
            ref={register({ required: true })}
            onChange={(e) => setInputValues({ [e.target.name]: e.target.value })} />
          {errors.publishing_house && (<span className="error"><FontAwesomeIcon icon="exclamation" className="exclamation"></FontAwesomeIcon>Publishing house must be specified</span>)}
        </div>
      </div>

      <div className="book-form-buttons">
        <button className="black-button" onClick={handleCancel}>CANCEL</button>
        <button type="submit" className="orange-button">POST</button>
      </div>

    </form >
  );
}