import React from 'react';
import styles from './CharacterCard.scss'

const CharacterCard = ({card}) => {
    return (
        <div key={card.id} className={styles.card}>
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

    );
};

export default CharacterCard;