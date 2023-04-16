import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes as Routing,
} from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import SingleMovie from "../pages/SinglePage/SinglePage";

const Routes = () => {
    return (
        <Router>
            <Routing>
                <Route exact path="/" element={<HomePage/>} />
                <Route exact path="/:title" element={<SingleMovie />} />
            </Routing>
        </Router>
    );
}

export default Routes;