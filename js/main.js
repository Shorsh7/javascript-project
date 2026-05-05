import { getGames } from "./videogames.js"
import { renderGames, renderCart, renderWishlist } from "./ui.js"
import { clearCart, getCart } from "./cart.js"
import { isAuthenticated, logoutUser, getCurrentUser } from "./auth.js"


const searchInput = document.getElementById("searchInput")
const categoryFilter = document.getElementById("categoryFilter")
const checkoutButton = document.getElementById("checkoutButton")
const addGameButton = document.getElementById("addGameButton")

const gameName = document.getElementById("gameName")
const gamePrice = document.getElementById("gamePrice")
const gameDescription = document.getElementById("gameDescription")
const gameYear = document.getElementById("gameYear")
const gameDev = document.getElementById("gameDev")
const gameGenre = document.getElementById("gameGenre")
const gameImage = document.getElementById("gameImage")

const signUpButton = document.getElementById("signUpButton")
const loginShortcutButton = document.getElementById("loginShortcutButton")
const logoutButton = document.getElementById("logoutButton")
const welcomeUser = document.getElementById("welcomeUser")

let allGames = []

const saveGames = () => {
    localStorage.setItem(
        "games",
        JSON.stringify(allGames)
    )
}

const init = async () => {
    const savedGames = localStorage.getItem("games")

    if (savedGames) {
        allGames = JSON.parse(savedGames)
    } else {
        allGames = await getGames()
        saveGames()
    }

    renderGames(allGames)
    renderCart()
    showWelcomeUser()
    renderWishlist()

    setupFilters()
    setupCheckout()
    setupAddGame()
    setupAuthButtons()
}

const showWelcomeUser = () => {
    const user = getCurrentUser()

    if (user) {
        welcomeUser.textContent =
            `Bienvenido, ${user.username}!`
    } else {
        welcomeUser.textContent = ""
    }
}

const setupAuthButtons = () => {
    if (isAuthenticated()) {
        loginShortcutButton.style.display = "none"
        signUpButton.style.display = "none"
        logoutButton.style.display = "inline-block"
    } else {
        loginShortcutButton.style.display = "inline-block"
        signUpButton.style.display = "inline-block"
        logoutButton.style.display = "none"
    }

    signUpButton.addEventListener("click", () => {
        window.location.href = "./register.html"
    })

    loginShortcutButton.addEventListener("click", () => {
        window.location.href = "./login.html"
    })

    logoutButton.addEventListener("click", () => {
        logoutUser()
        location.reload()
    })
}

const setupFilters = () => {
    searchInput.addEventListener("input", filterGames)
    categoryFilter.addEventListener("change", filterGames)
}

const filterGames = () => {
    const searchText =
        searchInput.value.toLowerCase().trim()

    const selectedCategory =
        categoryFilter.value.toLowerCase()

    const filteredGames = allGames.filter(game => {
        const gameGenres = Array.isArray(game.genre)
            ? game.genre
            : [game.genre]

        const matchesSearch =
            game.name.toLowerCase().includes(searchText) ||
            gameGenres.some(genre =>
                genre.toLowerCase().includes(searchText)
            )

        const matchesCategory =
            selectedCategory === "all" ||
            gameGenres.some(genre =>
                genre.toLowerCase() === selectedCategory
            )

        return matchesSearch && matchesCategory
    })

    renderGames(filteredGames)
}

const setupCheckout = () => {
    checkoutButton.addEventListener("click", () => {
        const cart = getCart()

        if (cart.length === 0) {
            alert("El carrito está vacío")
            return
        }

        const confirmPurchase = confirm(
            "¿Deseas finalizar la compra?"
        )

        if (confirmPurchase) {
            clearCart()
            renderCart()

            alert("Compra realizada con éxito")
        }
    })
}

const setupAddGame = () => {
    addGameButton.addEventListener(
        "click",
        addNewGame
    )
}

const addNewGame = () => {
    if (
        !gameName.value.trim() ||
        !gamePrice.value ||
        !gameDescription.value.trim() ||
        !gameYear.value ||
        !gameDev.value.trim() ||
        !gameGenre.value.trim() ||
        !gameImage.value.trim()
    ) {
        alert("Completa todos los campos")
        return
    }

    const newGame = {
        id: allGames.length + 1,
        name: gameName.value.trim(),
        price: parseFloat(gamePrice.value),
        description: gameDescription.value.trim(),
        year: parseInt(gameYear.value),
        developer: gameDev.value.trim(),
        genre: gameGenre.value.trim(),
        inCart: false,
        image: gameImage.value.trim()
    }

    allGames.push(newGame)

    saveGames()
    renderGames(allGames)

    clearForm()

    alert("Juego agregado correctamente")
}

const clearForm = () => {
    gameName.value = ""
    gamePrice.value = ""
    gameDescription.value = ""
    gameYear.value = ""
    gameDev.value = ""
    gameGenre.value = ""
    gameImage.value = ""
}

init()