import React from 'react';
import styles from './FilterInput.module.scss'
import searchIcon from '../../ctatic/filterSearchIcon.png'


const FilterInput = ({value, onChange, disable}) => {
    return (
        <div className={styles.filter}>
            <div className={styles.filter__bar}>
                <img src={searchIcon} alt={"filter"} className={styles.filter__png}/>
                <input
                    disabled={disable.current}
                    className={styles.filter__input}
                    placeholder={"Filter by name..."}
                    value={value || ''}
                    onChange={event => onChange(event.target.value, null)}
                />
            </div>
        </div>
    );
};

export default FilterInput;