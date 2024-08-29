import React from "react";
import './Loading.css';

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="loader">
                <span className="loader-dot">.</span>
            </div>
        </div>
    );
}