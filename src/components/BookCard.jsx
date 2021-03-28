import React from 'react';

export default function BookCard(props) {
  const baseUrl = `http://afazakas.com/bookcorner`;
  const scribbles = [
    "scribbles/scribbles1.svg",
    "scribbles/scribbles2.svg",
    "scribbles/scribbles3.svg",
    "scribbles/scribbles4.svg",
    "scribbles/scribbles5.svg",
    "scribbles/scribbles6.svg"
  ]

  const getRandomScribbleImg = () => scribbles[Math.floor(Math.random() * (scribbles.length - 0) + 0)]

  return (
    <div className="book-card" onClick={props.handleCardClick} style={{ backgroundImage: `url(/assets/${getRandomScribbleImg()})` }}>
      <figure className="book-card-image-container">
        <img className="book-card-image" src={props.src || `${baseUrl}/public/assets/books_pictures/${props.url}`} alt="" />
      </figure>
    </div>
  );
}
