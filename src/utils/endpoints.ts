const apiURL = process.env.REACT_APP_API_URL;

//Users
export const urlSignUp = `${apiURL}/api/signUp`
export const urlLogin = `${apiURL}/api/login`
export const urlUpdateUser = `${apiURL}/api/updateUser`

//Dates
export const urlSaveDate = `${apiURL}/api/date/saveDate`
export const urlGetDatesByUser = `${apiURL}/api/date/getDatesByUser`
export const urlUpdateDate = `${apiURL}/api/date/updateDate`
export const urlDeleteDate = `${apiURL}/api/date/deleteDate`