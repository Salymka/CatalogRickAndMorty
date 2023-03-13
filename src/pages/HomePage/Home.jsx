import React, {useEffect, useMemo, useState} from 'react';
import Header from "../../components/Header/Header";
import FilterInput from "../../components/FilterInput/FilterInput";
import getCharacters from '../../api/api.js'
import CardWrapper from "../../components/CardWrapper/CardWrapper";
import styles from './Home.scss'
import {logPlugin} from "@babel/preset-env/lib/debug";

const ON_PAGE = 8

const Home = (factory, deps) => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('')

    function lastPage() {
        setPage(page => page - 1)
    }

    function nextPage() {
        setPage(page => page + 1)
    }

    function sortCharactersForName(list) {
        return [...list.sort((a, b) => a.name.localeCompare(b.name))]
    }

    useEffect(() => {
        getCharacters()
            .then(characters => setCharacters(characters))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        console.log(filteredCharacters)
    }, [filter])

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
                        {page > 1
                            ?
                            <button className={styles.button} onClick={lastPage}>
                                Last Page
                            </button>
                            :
                            <button className={styles.button} disabled>
                                Last Page
                            </button>
                        }
                        {page < Math.ceil(filteredCharacters.length / 8)
                            ?
                            <button className={styles.button} onClick={nextPage}>
                                Next Page
                            </button>
                            :
                            <button className={styles.button} disabled>
                                Next Page
                            </button>
                        }

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