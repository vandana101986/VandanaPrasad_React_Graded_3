import React from 'react';
import {useNavigate} from "react-router-dom";
import { Card, Spin, Row, Col} from "antd";
import Meta from 'antd/es/card/Meta';

import "./MovieList.css"

const MovieList = (props) => {
    const navigate = useNavigate();
    const FavouriteComponent = props.favouriteComponent;
    const handleClick = (movie) => {
        navigate(`${movie.title}`);
        localStorage.setItem("movie_id", movie.id);
        localStorage.setItem("movie_type", props.current);
    };

    return(
        <>
          {props.loading ? (
            //When MovieList is still loading show spinner
          <Row justify="center" align="middle" className='vh-100 text-center'>
            <Col span={24}>
                <Spin size="large" />
            </Col>
          </Row>
          ) : (
            //When MovieList is loaded
          <Row>
            {props.movies.length === 0 ? (
                //When there are 0 movies in the list
            <Row justify="center" align="middle" className="vh-100 text-center">
                <Col span={24}>
                    <h5>No Data Found !!</h5>
                </Col>
            </Row>
                ) : (
                //else do nothing
                    ""
                )}
            {
                props.movies.map((movie,index) => (
                    <Card
                        key={movie.id}
                        className='m-3 card-style'
                        hoverable="false"
                      
                        
                        cover={
                            <img
                            alt={movie.title}
                            src={movie.posterurl}
                            height="300px"
                            onClick={() => handleClick(movie)} />
                        }
                    >
                        <Meta 
                            title={movie.title}
                            description={
                                <Row
                                    className='align-items-center justify-content-center'
                                    onClick={() => props.handleFavouritesClick(movie)}>
                                        <FavouriteComponent />
                                </Row>
                            }
                        />
                    </Card>
                ))
            }
          </Row>
          )}  {""}
        </>
    );
};

export default MovieList;