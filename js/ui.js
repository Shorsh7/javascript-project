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

export const renderGames = (games) => {
    gamesContainer.innerHTML = ""

    games.forEach(game => {
        const gameCard =
            document.createElement("div")

        gameCard.classList.add("game-card")

        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            
            <div class="game-content">
                <h3>${game.name}</h3>
                <p>${game.genre}</p>
                <p class="description">${game.description}</p>
                <p class="price">USD ${game.price}</p>
            </div>

            <div class="game-actions">
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
            </div>
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

export const renderCart = () => {
    const cart = getCart()

    cartItems.innerHTML = ""

    cart.forEach(game => {
        const cartItem =
            document.createElement("div")

        cartItem.classList.add("cart-item")

        cartItem.innerHTML = `
        <div class="cart-item-info">
            <h4>${game.name}</h4>
            <p>x${game.quantity}</p>
            <p>USD ${game.price}</p>
        </div>
        
            <button class="remove-btn">
                X
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