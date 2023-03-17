import React, {useEffect, useState} from 'react';
import {useParams,useNavigate} from "react-router-dom";
import {getCharacterById} from "../../api/api";
import styles from './CharacterPage.module.scss'
import goBack from '../../ctatic/arrowLeft.png'
import InfoOption from "../../components/InfoOption/InfoOption";
import Spinner from "../../components/Spinner/Spinner";

const CharacterPage = () => {
    const {id} = useParams()
    const [character, setCharacter] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getCharacterById(id)
            .then(characterData => setCharacter(characterData))
            .catch(e => console.log(e))
    })
    return (
        <div className={styles.body}>
            {/* eslint-disable-next-line no-restricted-globals */}
                <div className={styles.goBack} onClick={() => navigate(-1)}>
                    <img src={goBack} alt={'go back'} className={styles.goBack_arrow}/>
                    <label className={styles.goBack_label}>
                        GO BACK
                    </label>
            </div>
            {character
                ?
                <div className={styles.profile}>
                    <img src={character.image} className={styles.avatar} alt={"user icon"}/>
                    <label className={styles.name}>
                        {character.name}
                    </label>
                    <label className={styles.info}>
                        Informations
                    </label>
                    <InfoOption optionName={"Gender"} optionValue={character.gender}/>
                    <InfoOption optionName={"Status"} optionValue={character.status}/>
                    <InfoOption optionName={"Specie"} optionValue={character.specie ? character.specie : "unknown"}/>
                    <InfoOption optionName={"Origin"} optionValue={character.origin.name}/>
                    <InfoOption optionName={"Type"} optionValue={character.type ? character.type : "unknown"}/>
                    <div style={{marginBottom: 50}}></div>
                </div>
                :
                <div>
                    <Spinner/>
                </div>
            }

        </div>
    );
};

export default CharacterPage;