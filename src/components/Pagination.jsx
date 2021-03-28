import React, { useEffect, useState, useRef } from "react";

export default function Pagination(props) {
    const {offset} = props

    return (
        <div className="pagination">
            <div class="pagination-previous pagination-group"
                onClick={() => offset === 0 ? null : props.setOffset(parseInt(offset) - 9)}>

                {offset === 0 ? '' : <><span className="pagination-arrow prev"> {"<"} </span><h3>PREV</h3></>}

            </div>

            <div className="pagination-dot"></div>

            <div className="pagination-next pagination-group"
                onClick={() => offset === 15 ? null : props.setOffset(parseInt(offset) + 9)}>

                {props.records - 9 <= offset ? '' : <><h3>NEXT</h3><span className="pagination-arrow next"> {">"} </span></>}

            </div>
        </div>
    )
}