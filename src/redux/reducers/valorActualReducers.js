

const { SET_VALOR_ACTUAL, SET_VALOR_ANTERIOR, REMOVE_VALOR_ACTUAL, REMOVE_VALOR_ANTERIOR } = require("../types/types");

const initialState = {
    valor: {
        Fecha: '',
        Valor: ''
    },
    tipo: '',
}
const valorActualReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_VALOR_ACTUAL:
            return {
                ...state,
                valor: action.payload.value,
                tipo: action.payload.tipo,
            }
        case REMOVE_VALOR_ACTUAL:
            return {
                ...state,
                valor: {},
            }
        case SET_VALOR_ANTERIOR:
            return {
                ...state,
                valor: action.payload.value,
                tipo: action.payload.tipo,
            }
        case REMOVE_VALOR_ANTERIOR:
            return {
                ...state,
                valor: {},
            }
        default:
            return state;
    }
}

export default valorActualReducer;