import React, {useState, useEffect} from 'react';
import {Row, Col, Menu} from "antd";

import Search from 'antd/lib/input/Search';
import "./HomePage.css"
import MovieList from "../../components/MovieList";
import MovieListHeading from '../../components/MovieListHeading';
import AddFavourites from '../../components/AddFavourites';
import RemoveFavourites from '../../components/RemoveFavourites';
import OpenNotification from '../../components/OpenNotification';
import {
    getAllMovie,
    getFavouriteMovies,
    getMovieSearch,
    addToFavourite,
    removeFromFavourite
} from "../../service/movie";


const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    
    const getMovies = async (data) => {
        setLoading(true);

        await getAllMovie(data) 
            .then((res) => {
                setMovies(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getMovies("movies-in-theaters");
    }, []);

    //Search movies

    const getMovieRequest = async (searchValue) => {
        await getMovieSearch(current, searchValue)
            .then(async(res) => {
                setMovies(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    //get favourite movie
    const getFavMovies = async (data) => {
        setLoading(true);
        await getFavouriteMovies()
            .then((res) => {
                setFavourites(res.data);
                setMovies(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    //add Fav movie
    const addFavouriteMovie = async (movie) => {
        const checkFavourite = favourites.find(
            (favourite) => favourite.id === movie.id
        );
        if(checkFavourite === undefined) {
            const newFavouriteList = [...favourites, movie];
            await addToFavourite(movie)
                .then((res) => {
                    OpenNotification("Successfully added to favourite", "success");
                })
                .catch((err) => {});

            setFavourites(newFavouriteList);                
        }
        else {
            OpenNotification("Already added in favourite", "error");
        }
    };

    //remove from favourite
    const removeFavouriteMovie = async (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.id !== movie.id
        );

        const id = movie.id.toString();
        setLoading(true);
        await removeFromFavourite(id)
            .then((res) => {
                OpenNotification("Successfully removed from favourite", "success");
                setLoading(false);
                getFavMovies();
            })
            .catch((err) => {});
            setFavourites(newFavouriteList);
    };

    const [current, setCurrent] = useState("movies-in-theaters");
  const handleClick = (e) => {
    setCurrent(e.key);
    setSearchValue("");
    e.key === "favourite" ? getFavMovies(e.key) : getMovies(e.key);
  };

  const [loading, setLoading] = useState(false);
  const onSearch = (e) => {
    setLoading(true);
    getMovieRequest(e.target.value);
    setSearchValue(e.target.value);
  };

    
    return(
        <>
        <Row className="border-bottom" justify={'center'}>
        <Col span={20}>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme='dark'
          >
            <Menu.Item key="movies-in-theaters" className='custom-style'>Movies in theaters</Menu.Item>
            <Menu.Item key="movies-coming" className='custom-style'>Coming soon</Menu.Item>
            <Menu.Item key="top-rated-india" className='custom-style'>Top rated Indian</Menu.Item>
            <Menu.Item key="top-rated-movies" className='custom-style'>Top rated movies</Menu.Item>
            <Menu.Item key="favourite" className='custom-style'>Favourites</Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          <Search
            size="medium"
            placeholder="Search movie"
            onChange={onSearch}
            enterButton
            style={{ minWidth: "200px", marginTop: "5px", height: "50px" }}
            loading={loading}
            name="search"
            value={searchValue || ""}
          />
        </Col>
      </Row>
      <Row className="heading-row mt-3 ml-3">
        <MovieListHeading
          heading={current === "favourite" ? "Favourites" : "Movies"}
        />
      </Row>

      <MovieList
        loading={loading}
        current={current}
        movies={movies}
        handleFavouritesClick={
          current === "favourite" ? removeFavouriteMovie : addFavouriteMovie
        }
        favouriteComponent={
          current === "favourite" ? RemoveFavourites : AddFavourites
        }
      />

      {/* <Row>
        <MovieListHeading heading="Favourites" />
      </Row>

      <MovieList
        loading={loading}
        current={current}
        movies={favourites}
        handleFavouritesClick={removeFavouriteMovie}
        favouriteComponent={RemoveFavourites}
      /> */}
    </>
  );
}

export default HomePage;