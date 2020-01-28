import * as actions from "../actions/User";

const initialState = {
    loading: false,
    restaurants:null
}

const UserReducer = (state = initialState, action) => {

    switch (action.type){
        case actions.SAVE_RESTAURANTS:
            return ({...state,restaurants:action.payload})
    }
    return state;
}

export default UserReducer;