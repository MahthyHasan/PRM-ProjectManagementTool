import React from "react";
import './drop.css';

import DropFileInput from "./Drop";
function DropPage() {
    const onFileChange = (files) => {
        console.log(files);
    }
    return (
        <div className="box">
            <h2 className="header">
                React drop files input
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
        </div>


    )

}

export default DropPage