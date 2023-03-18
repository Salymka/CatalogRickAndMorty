import React, {Suspense, useCallback, useContext, useEffect, useRef, useState} from 'react';
import Header from "../../components/Header/Header";
import {getCharacters} from '../../api/api.js'
import CardWrapper from "../../components/CardWrapper/CardWrapper";
import styles from './Home.module.scss'
import Spinner from "../../components/Spinner/Spinner";
import {useSearchParams} from "react-router-dom";

const FilterInput = React.lazy(() => import("../../components/FilterInput/FilterInput"))

const Home = () => {
    const [characters, setCharacters] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const countPagesRef = useRef(1);
    const timerRef = useRef()

    function queryConstructor(page, filter) {
        let searchQuery = ``

        if (page) {
            searchQuery += `page=${page}&`;
        }
        if (filter) {
            searchQuery += `name=${filter}&`;
        }
        if (searchQuery) {
            searchQuery = '?' + searchQuery
        }
        return searchQuery;
    }

    function changeURL(newFilter, newPage) {
        if (newFilter) {
            newPage = 1;
        }
        if (newPage) searchParams.set("page", `${newPage}`);
        if (newFilter !== null) searchParams.set("filter", `${newFilter}`);
        setSearchParams(searchParams);
    }

    const getCharactersList = (page, filter) => {
        const searchQuery = queryConstructor(page, filter)

        setIsLoading(true)
        getCharacters(searchQuery)
            .then(characters => {
                setCharacters(() => characters.results)
                countPagesRef.current = +characters.info?.pages ?? 1
            })
            .catch(e => console.log(e + "error"))
            .finally(() => setIsLoading(false))
    }

    const debounce = useCallback((fun, props) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            fun(...props)
        }, 500)
    }, [getCharactersList])

    useEffect(() => {
        if (!searchParams.get('page')) {
            changeURL(null, 1)
        }

        debounce(getCharactersList, [searchParams.get('page'), searchParams.get('filter')])
    }, [searchParams])


    return (
        <div>
            <div>
                <Header/>
                    <FilterInput
                        disable={isLoading}
                        onChange={changeURL}
                        value={searchParams.get('filter')}
                    />
                {!isLoading
                    ? characters.length
                        ?
                        <CardWrapper
                            filter={searchParams.get('filter')}
                            page={searchParams.get('page')}
                            characters={characters}
                        />
                        : <h2
                            style={{margin: '50px', textAlign: "center"}}
                        >No Results</h2>
                    :
                    <Spinner/>
                }

                <div className={styles.pagination}>

                    <button
                        onClick={() => changeURL(null, +searchParams.get('page') - 1)}
                        className={styles.button}
                        disabled={searchParams.get('page') <= 1}
                    >
                        Last Page
                    </button>

                    <button
                        onClick={() => changeURL(null, +searchParams.get('page') + 1)}
                        className={styles.button}
                        disabled={searchParams.get('page') >= countPagesRef.current}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;