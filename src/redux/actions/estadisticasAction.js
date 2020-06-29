import { SET_VALORES, REMOVE_VALORES } from "../types/types";

export const setValores = (values) => ({
    type: SET_VALORES,
    payload: values,
});

export const removeValores = () => ({
    type: REMOVE_VALORES,
});