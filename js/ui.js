import { addToCart, getCart, removeFromCart, getTotalPrice } from "./cart.js"

const gamesContainer = document.getElementById("gamesContainer")
const cartItems = document.getElementById("cartItems")
const totalPrice = document.getElementById("totalPrice")

export const renderGames = (games) => {
    gamesContainer.innerHTML = ""

    games.forEach(game => {
        const gameCard = document.createElement("div")

        gameCard.classList.add("game-card")

        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.genre}</p>
            <p>USD ${game.price}</p>
            <button class="add-to-cart-btn">
                Agregar al carrito
            </button>
        `

        const button = gameCard.querySelector(".add-to-cart-btn")

        button.addEventListener("click", () => {
            addToCart(game)
            renderCart()
        })

        gamesContainer.appendChild(gameCard)
    })
}

export const renderCart = () => {
    const cart = getCart()

    cartItems.innerHTML = ""

    cart.forEach(game => {
        const cartItem = document.createElement("div")

        cartItem.classList.add("cart-item")

        cartItem.innerHTML = `
            <h4>${game.name}</h4>
            <p>Cantidad: ${game.quantity}</p>
            <p>USD ${game.price}</p>
            <button class="remove-btn">
                Eliminar
            </button>
        `

        const removeButton = cartItem.querySelector(".remove-btn")

        removeButton.addEventListener("click", () => {
            removeFromCart(game.id)
            renderCart()
        })

        cartItems.appendChild(cartItem)
    })

    totalPrice.textContent = `Total: USD ${getTotalPrice().toFixed(2)}`
}