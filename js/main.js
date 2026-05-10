import { getGames } from "./videogames.js"
import { renderGames, renderCart, renderWishlist } from "./ui.js"
import { clearCart, getCart } from "./cart.js"
import { isAuthenticated, logoutUser, getCurrentUser } from "./auth.js"
import { getWishlist, clearWishlist } from "./wishlist.js"
import { showConfirmAlert, showSuccessAlert, showErrorAlert, showToast } from "./alerts.js"


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
    const fetchedGames =
        await getGames()

    const savedGames =
        JSON.parse(
            localStorage.getItem("games")
        ) || []

    allGames = [
        ...fetchedGames,
        ...savedGames.filter(
            saved =>
                !fetchedGames.some(
                    fetched =>
                        fetched.id === saved.id
                )
        )
    ]

    saveGames()

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
    checkoutButton.addEventListener(
        "click",
        async () => {
            const cart = getCart()

            if (cart.length === 0) {
                showErrorAlert(
                    "Carrito vacío",
                    "No hay productos para comprar"
                )
                return
            }

            const result =
                await showConfirmAlert(
                    "Finalizar compra",
                    "¿Deseas confirmar la compra?"
                )

            if (result.isConfirmed) {
                clearCart()
                renderCart()

                showSuccessAlert(
                    "Compra realizada",
                    "¡Gracias por comprar en S-Team!"
                )
            }
        }
    )
}

const setupClearCart = () => {
    clearCartButton.addEventListener(
        "click",
        async () => {
            const cart = getCart()

            if (cart.length === 0) {
                showErrorAlert(
                    "Carrito vacío",
                    "El carrito ya está vacío."
                )
                return
            }

            const result =
                await showConfirmAlert(
                    "Vaciar carrito",
                    "¿Estás seguro que deseas vaciar el carrito?"
                )

            if (result.isConfirmed) {
                clearCart()
                renderCart()

                showToast(
                    "success",
                    "El carrito está vacío."
                )
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
        async () => {
            const wishlist =
                getWishlist()

            if (
                wishlist.length === 0
            ) {
                showErrorAlert(
                    "Favoritos vacíos",
                    "No hay favoritos para eliminar"
                )
                return
            }

            const result =
                await showConfirmAlert(
                    "Vaciar favoritos",
                    "¿Deseas eliminar todos los favoritos?"
                )

            if (result.isConfirmed) {
                clearWishlist()
                renderWishlist()

                showToast(
                    "success",
                    "Favoritos vaciados"
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