import { getCurrentUser } from "./auth.js"

const getWishlistKey = () => {
    const user = getCurrentUser()

    if (!user) return null

    return `wishlist_${user.username}`
}

export const getWishlist = () => {
    const key = getWishlistKey()

    if (!key) return []

    return JSON.parse(
        localStorage.getItem(key)
    ) || []
}

export const addToWishlist = (game) => {
    const wishlist = getWishlist()

    const exists = wishlist.find(
        item => item.id === game.id
    )

    if (!exists) {
        wishlist.push(game)

        localStorage.setItem(
            getWishlistKey(),
            JSON.stringify(wishlist)
        )
    }
}

export const removeFromWishlist = (gameId) => {
    const updatedWishlist =
        getWishlist().filter(
            game => game.id !== gameId
        )

    localStorage.setItem(
        getWishlistKey(),
        JSON.stringify(updatedWishlist)
    )
}

export const isInWishlist = (gameId) => {
    return getWishlist().some(
        game => game.id === gameId
    )
}