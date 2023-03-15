import React from 'react';
import styles from './InfoOption.module.scss'

const InfoOption = ({optionName, optionValue}) => {
    return (
        <div className={styles.option}>
            <label className={styles.option_name}>
                {optionName}
            </label>
            <label className={styles.option_value}>
                {optionValue}
            </label>
        </div>
    );
};

export default InfoOption;