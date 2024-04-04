const API_HOST = import.meta.env.VITE_API_URL;

//User API
export const urlSignUp = `${API_HOST}/signUp`;
export const urlLogin = `${API_HOST}/login`;
export const urlUpdateUser = `${API_HOST}/updateUser`;

//Date API
export const urlSaveDate = `${API_HOST}/date/saveDate`;
export const urlGetDatesByUser = `${API_HOST}/date/getDatesByUser`;
export const urlUpdateDate = `${API_HOST}/date/updateDate`;
export const urlDeleteDate = `${API_HOST}/date/deleteDate`;