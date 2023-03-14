import React, {useEffect, useMemo, useState} from 'react';
import Header from "../../components/Header/Header";
import FilterInput from "../../components/FilterInput/FilterInput";
import getCharacters from '../../api/api.js'
import CardWrapper from "../../components/CardWrapper/CardWrapper";
import styles from './Home.scss'
import {logPlugin} from "@babel/preset-env/lib/debug";

const ON_PAGE = 8

const Home = () => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('')

    function sortCharactersForName(list) {
        return [...list.sort((a, b) => a.name.localeCompare(b.name))]
    }

    useEffect(() => {
        getCharacters()
            .then(characters => setCharacters(characters))
            .catch(e => console.log(e))
    }, [])

    const filteredCharacters = useMemo(() => {
        const filteredList = characters.filter(character => character.name.toLowerCase().includes(filter.toLowerCase()))
        return sortCharactersForName(filteredList)
    }, [filter, characters])

    const charactersOnPage = useMemo(() => {
        return filteredCharacters.slice((page - 1) * ON_PAGE, page * ON_PAGE)
    }, [characters, page, filteredCharacters])

    return (
        <div>
            {characters.length
                ?
                <div>
                    <Header/>
                    <FilterInput
                        setFilter={setFilter}
                        filter={filter}
                    />

                    <CardWrapper
                        characters={charactersOnPage}
                    />

                    <div className={styles.pagination}>

                        <button
                            onClick={() => setPage(page => page - 1)}
                            className={styles.button}
                            disabled={page <= 1}
                        >
                            Last Page
                        </button>

                        <button
                            onClick={() => setPage(page => page + 1)}
                            className={styles.button}
                            disabled={page >= Math.ceil(filteredCharacters.length / 8)}
                        >
                            Next Page
                        </button>


                    </div>
                </div>
                :
                <div>
                    Loading
                </div>

            }


        </div>
    );
};

export default Home;