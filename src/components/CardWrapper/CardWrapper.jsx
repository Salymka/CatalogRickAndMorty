import React from 'react';
import styles from "./CardWrapper.module.scss";
import CharacterCard from "../CharacterCard/CharacterCard";

const CardWrapper = ({characters}) => {


    return (
        <div className={styles.body}>
            <div  className={styles.cardWrapper}>
                {characters.map((character, index) =>
                    <React.Fragment key={character.id}>
                        <CharacterCard card={character}/>
                    </React.Fragment>
                )
                }
            </div>
        </div>

    );
};

export default CardWrapper;