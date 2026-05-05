let cart = JSON.parse(localStorage.getItem("cart")) || []

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export const getCart = () => {
    return cart
}

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

export const removeFromCart = (gameId) => {
    cart = cart.filter(game => game.id !== gameId)

    saveCart()
}

export const clearCart = () => {
    cart = []

    saveCart()
}

export const getTotalPrice = () => {
    return cart.reduce((total, game) => {
        return total + (game.price * game.quantity)
    }, 0)
}