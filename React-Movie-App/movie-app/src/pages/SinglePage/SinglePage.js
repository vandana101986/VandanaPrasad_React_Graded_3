import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Card, Row, Col, Image, Button} from "antd";

import "./SinglePage.css";

const baseUrl = process.env.REACT_APP_baseUrl;

const SingleMovie = () => {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getMovies = async () => {
        await axios
            .get(
                `${baseUrl}${localStorage.getItem(
                    "movie_type"
                )}?id=${localStorage.getItem("movie_id")}`
            )
            .then((res) => {
                setMovie(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => { 
                setLoading(false);
            });
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <Card
            className="single-card-style"
            loading = {loading}

            title = {
                <>
                    <div className="home-button">
                        <Button                             
                            onClick={() => navigate("/")} 
                            type="link" 
                            style={{fontSize:"xx-large", 
                                    padding:0,
                                    textAlign:"top",
                                    outline:"none",
                                    }}>&larr;
                        </Button>
                    </div>
                    <div className="movie-title">
                        <h2>
                            {movie.title}
                            <label style={{color:"grey", 
                                        display:"inline-block", 
                                        fontSize:"1vmax"
                                        }}>({movie.year})
                            </label>
                        </h2>
                    </div>
                </>
            }
        >
            <Row>
                <Col className="poster-col" xs={23} xm={15} xl={7}>
                    <Image src={movie.posterurl}  />
                </Col>
                <Col xs={1} xm={1} xl={1}></Col>
                <Col xs={24} xm={16} xl={16} className="p-3 ">
                    
                    <Row>
                        <Col xs={12} xm={8} xl={8} className="details">Imdb rating :</Col>
                        <Col xs={12} xm={16} xl={16} className="pl-2 mb-2">{movie.imdbRating}</Col>
                    </Row>
                    <Row>
                        <Col xs={12} xm={8} xl={8} className="details">Content rating :</Col>
                        <Col xs={12} xm={16} xl={16} className="pl-2 mb-2">{movie.imdbRating}</Col>
                    </Row>
                    <Row>
                        <Col xs={12} xm={8} xl={8} className="details">Average rating :</Col>
                        <Col xs={12} xm={16} xl={16} className="pl-2 mb-2">{movie.imdbRating}</Col>
                    </Row>
                    <Row>
                        <Col xs={12} xm={8} xl={8} className="details">Duration :</Col>
                        <Col xs={12} xm={16} xl={16} className="pl-2 mb-2">{movie.imdbRating}</Col>
                    </Row>
                    <Row>
                        <Col xs={12} xm={8} xl={8} className="details">Genres :</Col>
                        <Col xs={12} xm={16} xl={16} className="pl-2 mb-2" style={{wordWrap:"-moz-initial"}}>
                            {movie &&
                                movie.genres &&
                                movie.genres.map((item) => item).join(", ")}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} xm={8} xl={8} className="details">Release Date :</Col>
                        <Col xs={12} xm={16} xl={16} className="pl-2 mb-2">{movie.releaseDate}</Col>
                    </Row>
                    <Row>
                        <Col xs={12} xm={8} xl={8} className="details">Story line :</Col>
                        <Col xs={24} xm={24} xl={24} className="pl-2 mb-2" style={{textAlign:"justify"}}>{movie.storyline}</Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );

};

export default SingleMovie;