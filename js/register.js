import { registerUser } from "./auth.js"

const registerUsername = document.getElementById("registerUsername")
const registerEmail = document.getElementById("registerEmail")
const registerPassword = document.getElementById("registerPassword")
const registerButton = document.getElementById("registerButton")

const handleRegister = () => {
    const username = registerUsername.value.trim()
    const email = registerEmail.value.trim()
    const password = registerPassword.value.trim()

    if (!username || !email || !password) {
        alert("Completa todos los campos")
        return
    }

    const result = registerUser(
        username,
        email,
        password
    )

    if (!result.success) {
        alert(result.message)
        return
    }

    alert(result.message)

    window.location.href = "./login.html"
}

registerButton.addEventListener(
    "click",
    handleRegister
)