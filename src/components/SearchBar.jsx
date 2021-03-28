import React, { useReducer } from "react";

export default function SearchBar(props) {
    const baseUrl = `http://afazakas.com/bookcorner`;
    const [searchInputs, setSearchInputs] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            type: "general",
            criteria: "title",
            term: "",
            termError: 0
        }
    );

    const handleInputsSearch = ({ name, value }) => setSearchInputs({ [name]: value })

    function validate() {
        if (searchInputs.term === "") {
            setSearchInputs({ ['termError']: 1 })
        } else {
            props.setIsSearch(true)
            props.fetchBooks(`${baseUrl}/books/${searchInputs.criteria}/${searchInputs.term}`)
        }
    }

    return (
        <div className="search-container">
            <div className="search">

                <button className="show-all-button"
                    onClick={() => {
                        props.showAllBooks()
                        props.setIsSearch(false)
                    }}>
                    SHOW ALL
                </button>

                <select
                    name="type"
                    id="pet-select"
                    className="search-input type"
                    onChange={(e) => handleInputsSearch(e.target)}>

                    <option value="general" defaultValue>General search</option>
                    <option value="trade">Trade search</option>

                </select>

                <select
                    name="criteria"
                    className="search-input criteria"
                    onChange={(e) => handleInputsSearch(e.target)}>

                    <option value="title" defaultValue>Title</option>
                    <option value="author">Author</option>
                </select>

                <input
                    placeholder=""
                    name="term"
                    type="text"
                    className={searchInputs.termError ? "search-input term error" : "search-input term"}
                    onChange={(e) => handleInputsSearch(e.target)}
                    onFocus={() => setSearchInputs({ ['termError']: 0 })}
                />

                <button onClick={() => validate()}
                    className={searchInputs.termError ? "search-button error" : "search-button"}>
                    <div className={searchInputs.termError ? "search-icon error" : "search-icon"}></div>
                </button>
            </div>
        </div>
    )
}