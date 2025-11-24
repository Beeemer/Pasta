import React from "react";
import '../CSS/Header.css'

export default function Header({ answered, total }) {
    const progress = total === 0 ? 0 : (answered / total) * 100;

    return (
        <header className="header">
            <div className="header-title">Pasta Gigli Form</div>

        </header>
    );
}
