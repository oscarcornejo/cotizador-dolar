import { SET_VALOR_ACTUAL, SET_VALOR_ANTERIOR, REMOVE_VALOR_ACTUAL, REMOVE_VALOR_ANTERIOR,} from "../types/types";

export const setValorActual = (value, typo) => ({
    type: SET_VALOR_ACTUAL,
    payload: {value, typo},
});

export const setValorAnterior = (value, typo) => ({
    type: SET_VALOR_ANTERIOR,
    payload: {value, typo},
});

export const removeValorActual = () => ({
    type: REMOVE_VALOR_ACTUAL,
});

export const removeValorAnterior = () => ({
    type: REMOVE_VALOR_ANTERIOR,
});