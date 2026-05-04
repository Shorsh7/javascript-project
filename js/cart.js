// Cargar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Guardar carrito en localStorage
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// Obtener carrito
export const getCart = () => {
    return cart
}

// Agregar juego al carrito
export const addToCart = (game) => {
    const existingGame = cart.find(item => item.id === game.id)

    if (existingGame) {
        existingGame.quantity += 1
    } else {
        cart.push({
            ...game,
            quantity: 1
        })
    }

    saveCart()
}

// Eliminar juego del carrito
export const removeFromCart = (gameId) => {
    cart = cart.filter(game => game.id !== gameId)

    saveCart()
}

// Vaciar carrito
export const clearCart = () => {
    cart = []

    saveCart()
}

// Calcular total
export const getTotalPrice = () => {
    return cart.reduce((total, game) => {
        return total + (game.price * game.quantity)
    }, 0)
}