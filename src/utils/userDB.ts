// Usuario de demostración: la aplicación no tiene backend de autenticación.
export interface UserDetails {
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export const user = {
    username: "leonardo",
    password: "leonardo"
}

export const userDetails: UserDetails = {
    username: "leonardo",
    firstName: "Erik",
    lastName: "Medina Arias",
    email: "leo@gmail.com"
}
