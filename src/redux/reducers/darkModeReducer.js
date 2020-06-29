const { LIGHT_THEME, DARK_THEME, SET_THEME } = require("../types/types");

const initialState = {
    mode: 'light',
}
const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                mode: action.payload,
            }
        case LIGHT_THEME:
            return {
                ...state,
                mode: 'light',
            }
        case DARK_THEME:
            return {
                ...state,
                mode: 'dark',
            }
        default:
            return state;
    }
}

export default darkModeReducer;