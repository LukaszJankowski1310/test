import React from "react";
import "../styles/Loading.css"

function Loading() {
    return (
        <div className="loading">
            <h1 className="loading__title">Loading ...</h1>
            <div className="loading__circle"></div>
        </div>
 
    )
}
export default Loading;