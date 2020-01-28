export const SAVE_RESTAURANTS = 'SAVE_RESTAURANTS'

export const saveRestaurant = payload => {
    return  { type: SAVE_RESTAURANTS, payload }
}
