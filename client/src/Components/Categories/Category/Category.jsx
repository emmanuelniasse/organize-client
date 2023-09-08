import React from 'react';
import { Link } from 'react-router-dom';

export default function Category(props) {
    return (
        // <Link to={`/${props.slug}`}>
        <div className={'category ' + props.bg}>
            {/* {props.children} */}
            <h3>{props.name}</h3>
            <p>12/20 de moyenne générale</p>
        </div>
        // </Link>
    );
}
