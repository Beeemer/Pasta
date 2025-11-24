import React from 'react';
import '../CSS/Footer.css'

function Footer(props) {
    return (
        <footer>
            <div >
                <nav>
                    <a href="#">За нас</a>
                    <a href="#">Контакт</a>
                    <a href="https://www.instagram.com/pastastgigli/" target="_blank">Инстаграм</a>
                    <a href="#">Политика</a>
                </nav>

                <p>
                    © {new Date().getFullYear()} Gigli form.
                </p>
            </div>
        </footer>
    );
}

export default Footer;