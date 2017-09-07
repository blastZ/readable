import React from 'react';
import './404.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
    <div className="text-wrapper">
        <div className="title" data-content="404">
            404
        </div>
        <div className="subtitle" data-content="Oops, the page you're looking for doesn't exist">
            Oops, the page you're looking for doesn't exist.
        </div>
        <div className="buttons">
            <Link to="/" className="button">Go to homepage</Link>
        </div>
    </div>
);

export default ErrorPage;
