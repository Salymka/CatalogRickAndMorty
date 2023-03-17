import React from 'react';
import styles from './CharacterCard.module.scss'
import {Link} from "react-router-dom";

const CharacterCard = ({card, filters}) => {
    return (
        <Link to={`character/${card.id}`} className={styles.card__link}>
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
        </Link>


    );
};

export default CharacterCard;