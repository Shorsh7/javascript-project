export const showSuccessAlert = (
    title,
    text
) => {
    Swal.fire({
        icon: "success",
        title,
        text,

        background:
            "rgba(10, 10, 20, 0.95)",

        color: "#ffffff",

        confirmButtonColor:
            "#8c08b4",

        customClass: {
            popup: "arcade-popup",
            title: "arcade-title",
            confirmButton:
                "arcade-confirm-btn"
        }
    })
}

export const showErrorAlert = (
    title,
    text
) => {
    Swal.fire({
        icon: "error",
        title,
        text,

        background:
            "rgba(10, 10, 20, 0.95)",

        color: "#ffffff",

        confirmButtonColor:
            "#ff3b3b",

        customClass: {
            popup: "arcade-popup",
            title: "arcade-title",
            confirmButton:
                "arcade-confirm-btn"
        }
    })
}

export const showConfirmAlert =
    async (
        title,
        text
    ) => {
        return await Swal.fire({
            title,
            text,
            icon: "warning",

            background:
                "rgba(10, 10, 20, 0.95)",

            color: "#ffffff",

            showCancelButton: true,

            confirmButtonText:
                "Confirmar",

            cancelButtonText:
                "Cancelar",

            confirmButtonColor:
                "#ffcc00",

            cancelButtonColor:
                "#444",

            customClass: {
                popup: "arcade-popup",
                title: "arcade-title",
                confirmButton:
                    "arcade-confirm-btn",
                cancelButton:
                    "arcade-cancel-btn"
            }
        })
    }

export const showToast = (
    icon,
    title
) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,

        background:
            "rgba(10, 10, 20, 0.95)",

        color: "#ffffff",

        customClass: {
            popup: "arcade-toast",
            title:
                "arcade-toast-title"
        }
    })

    Toast.fire({
        icon,
        title
    })
}