import React, {useEffect, useRef, useState} from 'react';
import styles from "../CardWrapper/CardWrapper.scss";
import CharacterCard from "../CharacterCard/CharacterCard";

const CardWrapper = ({characters}) => {
    const ref = useRef(null);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        function resizeWidth() {
            setWidth(ref.current.offsetWidth);
        }
        resizeWidth()
        window.addEventListener('resize', resizeWidth)
        return () => {
            window.removeEventListener('resize', resizeWidth);
        };
    });


    return (
        <div className={styles.body}>
            <div ref={ref} className={styles.cardWrapper}>
                {characters.map((character, index) =>
                    <React.Fragment key={character.id}>
                        <CharacterCard card={character}/>
                        {!((index + 1) % Math.floor(width / 250)) &&

                            <div>

                            </div>
                        }
                    </React.Fragment>
                )
                }
            </div>
        </div>

    );
};

export default CardWrapper;