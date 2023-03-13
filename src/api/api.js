const getCharacters = async () => {
    const charactersIds = [];
    for (let i = 1; i <= 826; i++) {
        charactersIds.push(i)
    }
    const response = await fetch(`https://rickandmortyapi.com/api/character/${charactersIds}`)
    const data = await response.json()
    console.log(data)
    return data
}
export default getCharacters;