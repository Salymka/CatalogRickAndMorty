import React from 'react';
import styles from './CharacterCard.module.scss'
import {Link, NavLink} from "react-router-dom";

const CharacterCard = ({card, filters}) => {
    return (
        <NavLink to={`character/${card.id}`} className={styles.card__link}>
            <div
                key={card.id}
                className={styles.card}
            >
                <img
                    src={card.image}
                    alt={card.id.toString()}
                    className={styles.card_img}/>
                <label className={styles.card_name}>
                    {card.name}
                </label>
                <label className={styles.card_species}>
                    {card.species}
                </label>
            </div>
        </NavLink>


    );
};

export default CharacterCard;