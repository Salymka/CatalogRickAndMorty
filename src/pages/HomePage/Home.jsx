import React, {useEffect, useMemo, useState} from 'react';
import Header from "../../components/Header/Header";
import FilterInput from "../../components/FilterInput/FilterInput";
import {getCharacters} from '../../api/api.js'
import CardWrapper from "../../components/CardWrapper/CardWrapper";
import styles from './Home.module.scss'
import Spinner from "../../components/Spinner/Spinner";

const ON_PAGE = 8

const Home = () => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('')

    function sortCharactersForName(list) {
        return [...list.sort((a, b) => a.name.localeCompare(b.name))]
    }

    function changeURL() {
        // eslint-disable-next-line no-restricted-globals
        history.pushState(
            null,
            document.title,
            `${window.location.pathname}?page=${page}&filter=${filter}`)
    }

    useEffect(() => {
        const windowData = Object.fromEntries(new URL(window.location).searchParams.entries())
        console.log(windowData)
        if (page === 1 && windowData.page) {
            setPage(+windowData.page)
        }

        if (!filter && windowData.filter) {
            setFilter(windowData.filter)
        }
    }, [])

    useEffect(() => {
        changeURL()
        console.log(filter, page)
    }, [filter, page])


    useEffect(() => {
        getCharacters()
            .then(characters => setCharacters(characters))
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        if (filter) {
            setPage(1)
        }
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
            <div>
                <Header/>
                <FilterInput
                    isLoading={!characters.length}
                    setFilter={setFilter}
                    filter={filter}
                />
                {characters.length
                    ?
                    <CardWrapper
                        filter={filter}
                        page={page}
                        characters={charactersOnPage}
                    />
                    :
                    <Spinner/>
                }

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


        </div>
    );
};

export default Home;