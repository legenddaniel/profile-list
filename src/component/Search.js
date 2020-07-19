import React from 'react';

import Context from './Context';

// Some Hooks are not working well in HOC
function Search(SearchBy) {
    let setSearchType;
    switch (SearchBy) {
        case SearchByName:
            setSearchType = 'setSearchName';
            break;
        case SearchByTag:
            setSearchType = 'setSearchTag';
            break;
    }

    return class Search extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
        }

        static contextType = Context;

        handleChange(e) {
            this.context[setSearchType](e.target.value.toLowerCase());
        }

        render() {
            return <SearchBy onChange={this.handleChange} />;
        }
    }
}

function SearchByName(props) {
    return (
        <div className="input-wrapper">
            <input type="search" id="name-input" placeholder="Search by name" className="input"
                onChange={props.onChange} />
        </div>
    )
}

function SearchByTag(props) {
    return (
        <div className="input-wrapper">
            <input type="search" id="tag-input" placeholder="Search by tags" className="input"
                onChange={props.onChange} />
        </div>
    )
}

export const NameSearch = Search(SearchByName);
export const TagSearch = Search(SearchByTag);