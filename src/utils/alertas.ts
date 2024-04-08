import Swal from "sweetalert2";

export function alertaError(mensaje: string) {
    Swal.fire({
        icon: "error",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function alertaSuccess(mensaje: string) {
    Swal.fire({
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function alertaWarning(mensaje: string) {
    Swal.fire({
        icon: "warning",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function alertaInfo(mensaje: string) {
    Swal.fire({
        icon: "info",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function alertaQuestion(mensaje: string) {
    var result = Swal.fire({
        icon: "question",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
    return result;
}