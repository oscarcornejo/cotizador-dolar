import { LIGHT_THEME, DARK_THEME, SET_THEME } from "../types/types";

export const setTheme = (value) => ({
    type: SET_THEME,
    payload: value,
});

export const setLightTheme = () => ({
    type: LIGHT_THEME,
    // payload: err,
});

export const setDarkTheme = () => ({
    type: DARK_THEME,
});