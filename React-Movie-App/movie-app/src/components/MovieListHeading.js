import React from 'react';

const MovieListHeading = (props) => {
    return (
        <div className='col pl-1'>
            <h1 style={{marginLeft:80}}>{props.heading}</h1>
        </div>
    );
};

export default MovieListHeading;
