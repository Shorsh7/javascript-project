// Estado local de juegos
let games = []

// Obtener juegos desde el JSON
export const getGames = async () => {
    try {
        const response = await fetch("../data/games.json")

        if (!response.ok) {
            throw new Error("Error al cargar los juegos")
        }

        games = await response.json()

        return games

    } catch (error) {
        console.error(error)
        return []
    }
}

// Obtener todos los juegos cargados
export const getAllGames = () => {
    return games
}

// Buscar juegos por nombre
export const searchGames = (searchTerm) => {
    return games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
}

// Filtrar juegos por categoría
export const filterGamesByCategory = (category) => {
    if (category === "all") {
        return games
    }

    return games.filter(game => {
        if (Array.isArray(game.genre)) {
            return game.genre.includes(category)
        }

        return game.genre === category
    })
}
