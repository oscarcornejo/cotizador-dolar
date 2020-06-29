const { SET_VALORES, REMOVE_VALORES } = require("../types/types");

const initialState = {
    estadisticas: {},
}
const estadisticasReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALORES:
            return {
                ...state,
                estadisticas: action.payload,
            }
        case REMOVE_VALORES:
            return {
                ...state,
                estadisticas: {},
            }
        default:
            return state;
    }
}

export default estadisticasReducer;