import {
    addToCart,
    getCart,
    removeFromCart,
    getTotalPrice
} from "./cart.js"

import {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlist
} from "./wishlist.js"

const gamesContainer =
    document.getElementById("gamesContainer")

const cartItems =
    document.getElementById("cartItems")

const totalPrice =
    document.getElementById("totalPrice")

const wishlistContainer =
    document.getElementById("wishlistContainer")

// Render de juegos
export const renderGames = (games) => {
    gamesContainer.innerHTML = ""

    games.forEach(game => {
        const gameCard =
            document.createElement("div")

        gameCard.classList.add("game-card")

        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.genre}</p>
            <p>${game.description}</p>
            <p>USD ${game.price}</p>

            <button class="add-to-cart-btn">
                Agregar al carrito
            </button>

            <button class="wishlist-btn">
                ${
                    isInWishlist(game.id)
                        ? "❤️ Quitar favorito"
                        : "♡ Favorito"
                }
            </button>
        `

        const cartButton =
            gameCard.querySelector(".add-to-cart-btn")

        cartButton.addEventListener(
            "click",
            () => {
                addToCart(game)
                renderCart()
            }
        )

        const wishlistButton =
            gameCard.querySelector(".wishlist-btn")

        wishlistButton.addEventListener(
            "click",
            () => {
                if (isInWishlist(game.id)) {
                    removeFromWishlist(game.id)
                } else {
                    addToWishlist(game)
                }

                renderGames(games)
                renderWishlist()
            }
        )

        gamesContainer.appendChild(gameCard)
    })
}

// Render de carrito
export const renderCart = () => {
    const cart = getCart()

    cartItems.innerHTML = ""

    cart.forEach(game => {
        const cartItem =
            document.createElement("div")

        cartItem.classList.add("cart-item")

        cartItem.innerHTML = `
            <h4>${game.name}</h4>
            <p>Cantidad: ${game.quantity}</p>
            <p>USD ${game.price}</p>

            <button class="remove-btn">
                Eliminar
            </button>
        `

        const removeButton =
            cartItem.querySelector(".remove-btn")

        removeButton.addEventListener(
            "click",
            () => {
                removeFromCart(game.id)
                renderCart()
            }
        )

        cartItems.appendChild(cartItem)
    })

    totalPrice.textContent =
        `Total: USD ${getTotalPrice().toFixed(2)}`
}

// Render de favoritos
export const renderWishlist = () => {
    const wishlist = getWishlist()

    wishlistContainer.innerHTML = ""

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML =
            "<p>No tienes favoritos aún.</p>"
        return
    }

    wishlist.forEach(game => {
        const wishlistItem =
            document.createElement("div")

        wishlistItem.classList.add("wishlist-item")

        wishlistItem.innerHTML = `
            <h4>${game.name}</h4>
            <p>USD ${game.price}</p>

            <button class="remove-wishlist-btn">
                Quitar
            </button>
        `

        const removeButton =
            wishlistItem.querySelector(
                ".remove-wishlist-btn"
            )

        removeButton.addEventListener(
            "click",
            () => {
                removeFromWishlist(game.id)
                renderWishlist()
                renderGames(getWishlist())
            }
        )

        wishlistContainer.appendChild(wishlistItem)
    })
}