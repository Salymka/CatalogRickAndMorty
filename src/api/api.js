const getCharacters = async (searchQuery = '') => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character${searchQuery}`)
        if (response.ok) {
            return await response.json()
        }
    } catch (e) {
        console.log("error")
    }

    return {results: []}
}

const getCharacterById = async (id) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    return await response.json()
}
export {getCharacters, getCharacterById};
