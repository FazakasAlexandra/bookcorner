export default function BookViewInfo(props) {
    return (
        <div className="single-book-info">
            <ul>
                <li><span>Author : {props.book.author}</span></li>
                <li><span>Title : <i>{props.book.title}</i></span></li>
                <li><span>Publishing house : {props.book.publishing_house}</span></li>
                <li><span>Pages : {props.book.pages}</span></li>
                <li><span>Condition : {props.book.condition}</span></li>
            </ul>
        </div>

    )
}