import React, {useEffect, useState} from 'react';
import axios from "axios";
import Search from "../Search/Search";

import './filmInfo.css'

const FilmInfo = props => {

    const [filmInfo, setFilmInfo] = useState({});

    const request = async () => {
        const data = await axios.get('http://api.tvmaze.com/search/shows?q=' + props.match.params.name);
        console.log(data.data[0].show)
        setFilmInfo(data.data[0].show)
    };

    useEffect(() => {
        request()
    }, [props.match.params.name]);

    return (
        <div>
            <Search {...props} />
            {filmInfo.id && (
                <div className='film-block'>
                    <div className='film-img' >
                        {filmInfo.image && <img src={filmInfo.image.original} />}
                    </div>
                    <div className='film-info'>
                        <h1>{filmInfo.name}</h1>
                        {filmInfo.genres && <h2>Genre: {filmInfo.genres}</h2>}
                        {filmInfo.premiered && <h2>Premiered: {filmInfo.premiered}</h2>}
                        {filmInfo.summary && <p className='film-text' >{filmInfo.summary.replace(/(\<(\/?[^>]+)>)/g, '')}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilmInfo;