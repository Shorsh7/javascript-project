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

    setTimeout(() => {
        window.location.href =
            "./index.html"
    }, 1500)
}

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