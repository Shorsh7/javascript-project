import { loginUser } from "./auth.js"

import { showToast, showErrorAlert } from "./alerts.js"

const loginEmail =
    document.getElementById(
        "loginEmail"
    )

const loginPassword =
    document.getElementById(
        "loginPassword"
    )

const loginButton =
    document.getElementById(
        "loginButton"
    )

const loaderScreen =
    document.getElementById(
        "loaderScreen"
    )

const handleLogin = () => {
    const identifier =
        loginEmail.value.trim()
    const password =
        loginPassword.value.trim()

    if (
        !identifier ||
        !password
    ) {
        showErrorAlert(
            "Campos incompletos",
            "Completa todos los campos"
        )
        return
    }

    const result = loginUser(
        identifier,
        password
    )

    if (!result.success) {
        showErrorAlert(
            "Error de acceso",
            result.message
        )
        return
    }

    showToast(
        "success",
        result.message
    )

    loaderScreen.classList.add(
        "active"
    )

    setTimeout(() => {
        loaderScreen.classList.add(
            "fade-out"
        )
        setTimeout(() => {
            window.location.href =
                "./index.html"
        }, 800)
    }, 2500)
}

loaderScreen.setAttribute(
    "aria-hidden",
    "false"
)

loginButton.addEventListener(
    "click",
    handleLogin
)

const handleEnter = (event) => {
    if (event.key === "Enter") {
        handleLogin()
    }
}

loginEmail.addEventListener(
    "keydown",
    handleEnter
)

loginPassword.addEventListener(
    "keydown",
    handleEnter
)

const loaderText =
    document.getElementById(
        "loaderText"
    )

const loadingMessages = [
    "Conectando con S-Team...",
    "Cargando catálogo...",
    "Preparando marketplace...",
    "Inicializando sistema...",
    "Sincronizando inventario..."
]

let index = 0

const textInterval =
    setInterval(() => {
        loaderText.textContent =
            loadingMessages[index]
        index++
        if (
            index >=
            loadingMessages.length
        ) {
            index = 0
        }
    }, 700)