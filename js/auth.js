const USERS_KEY = "users"
const CURRENT_USER_KEY = "currentUser"

const getUsers = () => {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

const saveUsers = (users) => {
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    )
}

// Registrar usuario
export const registerUser = (
    username,
    email,
    password
) => {
    const users = getUsers()

    const userExists = users.find(
        user =>
            user.email === email ||
            user.username === username
    )

    if (userExists) {
        return {
            success: false,
            message: "Este usuario ya existe."
        }
    }

    const newUser = {
        id: Date.now(),
        username,
        email,
        password
    }

    users.push(newUser)
    saveUsers(users)

    return {
        success: true,
        message: "Usuario registrado correctamente."
    }
}

// Login
export const loginUser = (
    username,
    password
) => {
    const users = getUsers()

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    )

    if (!user) {
        return {
            success: false,
            message: "Usuario y/o contraseña incorrectos. Intenta nuevamente."
        }
    }

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    )

    return {
        success: true,
        message: "Datos correctos, ¡Bienvenido!"
    }
}

// Logout
export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
}

// Usuario actual
export const getCurrentUser = () => {
    return JSON.parse(
        localStorage.getItem(CURRENT_USER_KEY)
    )
}

// Verificar autenticación
export const isAuthenticated = () => {
    return !!getCurrentUser()
}