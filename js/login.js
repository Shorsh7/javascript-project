import { loginUser } from "./auth.js"

const loginEmail = document.getElementById("loginEmail")
const loginPassword = document.getElementById("loginPassword")
const loginButton = document.getElementById("loginButton")

const handleLogin = () => {
    const email = loginEmail.value.trim()
    const password = loginPassword.value.trim()

    if (!email || !password) {
        alert("Completa todos los campos")
        return
    }

    const result = loginUser(email, password)

    if (!result.success) {
        alert(result.message)
        return
    }

    alert(result.message)

    window.location.href = "./index.html"
}

loginButton.addEventListener("click", handleLogin)
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleLogin()
        }
    }

    loginEmail.addEventListener("keydown", handleEnter)
    loginPassword.addEventListener("keydown", handleEnter)