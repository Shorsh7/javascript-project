import { getGames } from "./videogames.js"
import { renderGames, renderCart, renderWishlist } from "./ui.js"
import { clearCart, getCart } from "./cart.js"
import { isAuthenticated, logoutUser, getCurrentUser } from "./auth.js"
import { getWishlist, clearWishlist } from "./wishlist.js"


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

const cartButton = document.getElementById("cartButton")
const cartDropdown = document.getElementById("cartDropdown")
const clearCartButton = document.getElementById("clearCartButton")
const wishlistButton = document.getElementById("wishlistButton")
const wishlistDropdown = document.getElementById("wishlistDropdown")
const clearWishlistButton = document.getElementById("clearWishlistButton")

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
    setupAuthButtons()
    setupClearCart()
    setupCartDropdown()
    setupWishlistDropdown()
    setupClearWishlist()
    setupCloseDropdowns()
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

const setupClearCart = () => {
    clearCartButton.addEventListener(
        "click",
        () => {
            const cart = getCart()

            if (cart.length === 0) {
                alert("El carrito ya está vacío")
                return
            }

            const confirmClear = confirm(
                "¿Estás seguro que deseas vaciar el carrito?"
            )

            if (confirmClear) {
                clearCart()
                renderCart()

                alert("¡Carrito vaciado con éxito!")
            }
        }
    )
}

const setupCartDropdown = () => {
    cartButton.addEventListener(
        "click",
        () => {
            cartDropdown.classList.toggle(
                "show-cart"
            )
            wishlistDropdown.classList.remove(
                "show-wishlist"
            )
        }
    )
}

const setupWishlistDropdown = () => {
    wishlistButton.addEventListener(
        "click",
        () => {
            wishlistDropdown.classList.toggle(
                "show-wishlist"
            )
            cartDropdown.classList.remove(
                "show-cart"
            )
        }
    )
}

const setupClearWishlist = () => {
    clearWishlistButton.addEventListener(
        "click",
        () => {
            const wishlist = getWishlist()

            if (wishlist.length === 0) {
                alert("No tienes juegos en favoritos")
                return
            }

            const confirmClear = confirm(
                "¿Estás seguro que deseas vaciar tus favoritos?"
            )

            if (confirmClear) {
                clearWishlist()
                renderWishlist()

                alert(
                    "Favoritos vaciados correctamente"
                )
            }
        }
    )
}

const setupCloseDropdowns = () => {
    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideCart =
                cartDropdown.contains(event.target)

            const clickedCartButton =
                cartButton.contains(event.target)

            const clickedInsideWishlist =
                wishlistDropdown.contains(event.target)

            const clickedWishlistButton =
                wishlistButton.contains(event.target)

            if (
                !clickedInsideCart &&
                !clickedCartButton
            ) {
                cartDropdown.classList.remove(
                    "show-cart"
                )
            }

            if (
                !clickedInsideWishlist &&
                !clickedWishlistButton
            ) {
                wishlistDropdown.classList.remove(
                    "show-wishlist"
                )
            }
        }
    )
}

init()