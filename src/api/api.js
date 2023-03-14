const getCharacters = async () => {
    const charactersIds = [];
    for (let i = 1; i <= 826; i++) {
        charactersIds.push(i)
    }
    const response = await fetch(`https://rickandmortyapi.com/api/character/${charactersIds}`)
    return await response.json()
}
export default getCharacters;