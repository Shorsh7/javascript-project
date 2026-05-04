import { getGames } from "./videogames.js"
import { renderGames, renderCart } from "./ui.js"

const searchInput = document.getElementById("searchInput")
const categoryFilter = document.getElementById("categoryFilter")

let allGames = []

const init = async () => {
    allGames = await getGames()

    renderGames(allGames)
    renderCart()

    setupFilters()
}

const setupFilters = () => {
    searchInput.addEventListener("input", filterGames)
    categoryFilter.addEventListener("change", filterGames)
}

const filterGames = () => {
    const searchText = searchInput.value.toLowerCase()
    const selectedCategory = categoryFilter.value
    
    const filteredGames = allGames.filter(game => {
        const matchesSearch =
            game.name.toLowerCase().includes(searchText)

        const matchesCategory =
            selectedCategory === "all" ||
            (
                Array.isArray(game.genre)
                    ? game.genre.some(
                        genre => genre.toLowerCase() === selectedCategory.toLowerCase()
                    )
                    : game.genre.toLowerCase() === selectedCategory.toLowerCase()
            )

        return matchesSearch && matchesCategory
    })

    renderGames(filteredGames)
}


init()