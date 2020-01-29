export const SAVE_LOGIN_DETAILS = 'SAVE_LOGIN_DETAILS'

export const saveLoginDetails = payload => {
    return  { type: SAVE_LOGIN_DETAILS, payload }
}
export const CLEAR_LOGIN_DETAILS = 'CLEAR_LOGIN_DETAILS'

export const clearLoginDetails = () => {
    return  { type: CLEAR_LOGIN_DETAILS }
}

export const SAVE_TOKEN = 'SAVE_TOKEN'

export const saveToken = payload => {
    return  { type: SAVE_TOKEN, payload }
}