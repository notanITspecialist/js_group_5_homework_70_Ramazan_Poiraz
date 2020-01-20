import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactAutocomplete from "react-autocomplete";

import './Search.css'

const nanoid = require('nanoid');

const Search = props => {
    const initialValue = '';
    const initialList = [{label:''}];

    const [value, setValue] = useState(initialValue);
    const [list, setList] = useState(initialList);

    const request = async () => {
        if(value !== ''){
            const data = await axios.get('http://api.tvmaze.com/search/shows?q=' + value);
            const redactData = data.data.map(elem => ({label: elem.show.name}));
            setList(redactData)
        } else {
            setList(initialList)
        }
    };

    useEffect(() => {
        request()
    }, [value]);

    const changeState = async e => {
        setValue(e);
    };

    const search = elem => {
        changeState(elem);
            props.history.replace('/show/' + elem)
    };

    return (
        <div className='search-block'>
            <ReactAutocomplete
                getItemValue={(item) => item.label}
                items={list}
                renderItem={(item, isHighlighted) =>
                    <div key={nanoid()} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                    </div>
                }
                value={value}
                onChange={(e) => changeState(e.target.value)}
                onSelect={(val) => search(val)}
            />
        </div>
    );
};

export default Search;