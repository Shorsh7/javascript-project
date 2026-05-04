// Estado del carrito
let cart = []

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
}

// Eliminar juego del carrito
export const removeFromCart = (gameId) => {
    cart = cart.filter(game => game.id !== gameId)
}

// Vaciar carrito
export const clearCart = () => {
    cart = []
}

// Calcular total
export const getTotalPrice = () => {
    return cart.reduce((total, game) => {
        return total + (game.price * game.quantity)
    }, 0)
}