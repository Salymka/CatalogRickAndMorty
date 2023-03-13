import React from 'react';
import styles from './FilterInput.scss'
import searchIcon from '../../ctatic/filterSearchIcon.png'
const FilterInput = ({filter, setFilter}) => {
    return (
        <div className={styles.filter}>
            <div className={styles.filter__bar}>
                <img src={searchIcon} alt={"filter"} className={styles.filter__png}/>
                <input
                    className={styles.filter__input}
                    placeholder={"Filter by name..."}
                    value={filter}
                    onChange={event => setFilter(event.target.value)}
                />
            </div>
        </div>
    );
};

export default FilterInput;