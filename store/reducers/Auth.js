import * as actions from "../actions/Auth";

const initialState = {
    user: null,
    loading: false,
    token:null
}

const AuthReducer = (state = initialState, action) => {

    switch (action.type){
        case actions.SAVE_LOGIN_DETAILS:
            return ({...state,user:action.payload})
        case actions.SAVE_TOKEN:
            return ({...state,token:action.payload})
    }
    return state;
}

export default AuthReducer;