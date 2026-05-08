import { registerUser } from "./auth.js"

import { showToast, showErrorAlert } from "./alerts.js"

const registerUsername =
    document.getElementById(
        "registerUsername"
    )

const registerEmail =
    document.getElementById(
        "registerEmail"
    )

const registerPassword =
    document.getElementById(
        "registerPassword"
    )

const registerButton =
    document.getElementById(
        "registerButton"
    )

const handleRegister = () => {
    const username =
        registerUsername.value.trim()

    const email =
        registerEmail.value.trim()

    const password =
        registerPassword.value.trim()

    if (
        !username ||
        !email ||
        !password
    ) {
        showErrorAlert(
            "Campos incompletos",
            "Completa todos los campos"
        )
        return
    }

    const result = registerUser(
        username,
        email,
        password
    )

    if (!result.success) {
        showErrorAlert(
            "Registro fallido",
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
            "./login.html"
    }, 1500)
}

registerButton.addEventListener(
    "click",
    handleRegister
)

const handleEnter = (event) => {
    if (event.key === "Enter") {
        handleRegister()
    }
}

registerUsername.addEventListener(
    "keydown",
    handleEnter
)

registerEmail.addEventListener(
    "keydown",
    handleEnter
)

registerPassword.addEventListener(
    "keydown",
    handleEnter
)