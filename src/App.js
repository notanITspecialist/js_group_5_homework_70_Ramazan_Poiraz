import React from 'react';
import Search from "./Components/Search/Search";
import {Route, Switch} from "react-router";
import FilmInfo from "./Components/filmInfo/filmInfo";

function App() {
    return (
        <Switch>
            <Route path='/' exact component={Search}/>
            <Route path='/show/:name' component={FilmInfo}/>
        </Switch>
    )
}

export default App;
