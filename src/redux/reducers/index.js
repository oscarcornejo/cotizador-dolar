import {combineReducers} from 'redux';
import darkModeReducer from './darkModeReducer';
import estadisticasReducer from './estadisticasReducer';
import valorActualReducer from './valorActualReducers';

export default combineReducers({
    darMode: darkModeReducer,
    estadisticas: estadisticasReducer,
    valorActual: valorActualReducer,
});