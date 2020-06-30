import React, { useEffect, useState } from 'react';

// ENDPOINTS
import API from '../../utils/api';
import { APIKEY } from '../../utils/ApiKeys';

// COMPONENTS
import InputDate from '../../components/inputs/inputDate/InputDate';
import GraficoResultado from '../cardGrafico/GraficoResultado';

// STYLED COMPONENTS
// import styled from 'styled-components';

// REDUX
import {useDispatch, useSelector} from 'react-redux'
import {setValores} from '../../redux/actions/estadisticasAction';
import { setValorActual, setValorAnterior } from '../../redux/actions/valorActualAction';


const CardCotizador = () => {

    const dispatch = useDispatch();
    const {valor, tipo} = useSelector( state => state.valorActual);

    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    const mesActual = fecha.getMonth() +1;
    const diaActual = fecha.getDate();
    const diaAnterior = fecha.getDate() -3;

    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [msgErrors, setMsgErrors] = useState({
        camposObligatorios: false,
        fechaInicialObligatoria: false,
        fechaFinalObligatoria: false,
        periodoInvalido: false,
    });
    
    const [dataResultado, setDataResultado] = useState([]);
    const [dataCategorias, setDataCategorias] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [disabledButton, setDisabledButton] = useState(false);
    
    const apiKey = APIKEY;

    useEffect( () => {
        const getDolarDay = async () => {
            await API.get(`/dolar?apikey=${apiKey}&formato=json`)
            .then( resp => {
                // console.log(resp.data.Dolares[0]);
                if(resp.status === 200){
                    dispatch(setValorActual(resp.data.Dolares[0], 'diaActual'));
                }
            }).catch( err => {
                console.log('Respuesta Api Día Actual:: ', err.response.data.Mensaje);
            })
        }
        const getDolarDiaAnterior = async() => {
            await API.get(`/dolar/${anioActual}/${mesActual}/dias/${diaAnterior}?apikey=${apiKey}&formato=json`)
            .then( resp => {
                // console.log(resp);
                if(resp.status === 200){
                    dispatch(setValorAnterior(resp.data.Dolares[0], 'ultimaActualizacion'));
                }
            }).catch( err => {
                console.log('Respuesta Api Fecha Específica:: ', err.response.data.Mensaje);
            });
        }
        getDolarDay();
        getDolarDiaAnterior();

    }, [anioActual, mesActual, diaAnterior, dispatch, apiKey]);

    const onChange = (value, tipo) => {
        if(tipo === 'fechaInicial'){
            setFechaInicial(value)  
        } else{
            setFechaFinal(value)
        }
    }

    const isValid = () => {

        const dateInit = new Date(fechaInicial.day, fechaInicial.month, fechaInicial.year);
        const dateEnd = new Date(fechaFinal.day, fechaFinal.month, fechaFinal.year);

        if(fechaInicial === '' && fechaFinal === ''){
            setMsgErrors({camposObligatorios: true})
            return false;
        } else if(fechaInicial === ''){
            setMsgErrors({fechaInicialObligatoria: true})
            return false;
        } else if(fechaFinal === ''){
            setMsgErrors({fechaFinalObligatoria: true})
            return false;
        } else if(Date.parse(dateInit) > Date.parse(dateEnd) ){
            setMsgErrors({periodoInvalido: true})
            return false;
        }
        return true;
    }

    const handleGetDataDolar = async () => {

        if(isValid()) {
            setDisabledButton(true);
            const fechaInicio = `${fechaInicial.year}/${fechaInicial.month}/dias_i/${fechaInicial.day}`;
            const fechaTermino = `${fechaFinal.year}/${fechaFinal.month}/dias_f/${fechaFinal.day}`;

            const url = `/dolar/periodo/${fechaInicio}/${fechaTermino}?apikey=${apiKey}&formato=json`;

            API.get(url)
            .then( (resp) => {
                // console.log(resp.data.Dolares);
                if(resp.status === 200) {
                    setMsgErrors({});
                    setDisabledButton(false);
                    setDataResultado(resp.data.Dolares);
                    
                    const newArrayCategorias = []
                    resp.data.Dolares.map( resp => {
                        return newArrayCategorias.push(resp.Fecha)
                    });

                    const newArraySeries = [];
                    resp.data.Dolares.map( resp => {
                        // return newArraySeries.push( parseFloat(resp.Valor.replace(',', '.')));
                        return newArraySeries.push( parseFloat(resp.Valor));
                    });
                    
                    setDataCategorias(newArrayCategorias);
                    setDataSeries(newArraySeries);

                    const arreglo = newArraySeries;
                    
                    let sum = arreglo.reduce((previous, current) => current += previous);
                    const promedio = sum / arreglo.length;

                    const valorMin = arreglo.reduce(function(a, b) {
                        return Math.min(a, b);
                    });
                    const valorMax = arreglo.reduce(function(a, b) {
                        return Math.max(a, b);
                    });

                    const valores = {
                        // promedio: promedio.toFixed(2),
                        promedio: promedio.toFixed(0),
                        valorMin,
                        valorMax
                    }

                    dispatch(setValores(valores));
                    
                    // OTRA OPCION PARA OBTENER VALOR MÁXIMO o VALOR MÍNIMO
                    // const mayor = 0;
                    // for (let index = 0; index < arreglo.length; index++) {
                    //     if (arreglo[index] > mayor){
                    //         mayor = arreglo[index];
                    //     } 
                    // }
                    // console.log(mayor);

                    // const minimo = arreglo[0];
                    // for (let index = 0; index < arreglo.length; index++) {
                    //     if (arreglo[index] < minimo){
                    //         minimo = arreglo[index];
                    //     }
                    // }
                    // console.log(minimo);
                }
            })
            .catch( err => {
                setDisabledButton(false);
                console.log(err);
                console.log(err.response?.data.Mensaje);
                setMsgErrors({erroEndPoint: true, msgError: err.response?.data.Mensaje})
            })
        }
    }

    return (
   
        <div className="flex flex-wrap -mx-4">
            
            <div className="w-full mb-4 md:w-full lg:w-5/12 px-4 flex flex-col">
                <div className="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
                    <div className="border-b">
                        <div className="flex justify-between px-6 -mb-px">
                            <h3 className="text-indigo-500 py-4 font-normal text-lg">Cotizador</h3>
                        </div>
                    </div>
                
                    <div className="flex flex-wrap flex-grow px-6 py-6 text-gray-600 items-center border-b -mx-4">
                        
                        <div className="flex w-3/6 xs:w-full px-4 sm:mb-4">
                            <InputDate 
                                titulo="Fecha Inicial" 
                                name="fechaInicial" 
                                onChange={onChange} 
                                anioActual={anioActual}
                                mesActual={mesActual}
                                diaActual={diaActual}
                                diaAnterior={diaAnterior}
                                initialValue={fechaInicial}
                            />
                        </div>

                        <div className="flex w-3/6 xs:w-full px-4 sm:mb-4">
                            <InputDate 
                                titulo="Fecha Final" 
                                name="fechaFinal" 
                                onChange={onChange} 
                                anioActual={anioActual}
                                mesActual={mesActual}
                                diaActual={diaActual}
                                diaAnterior={diaAnterior} 
                                initialValue={fechaFinal}
                            />
                        </div>

                        <div className="flex w-full px-4">
                            {msgErrors.camposObligatorios && 
                            (fechaInicial === '' || fechaFinal === '') &&
                                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <span className="block sm:inline">*Los campos son obligatorios</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-2" onClick={() => setMsgErrors({...msgErrors, camposObligatorios: false})}>
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                    </span>
                                </div>
                            }

                            {msgErrors.fechaInicialObligatoria && fechaInicial === ''  &&
                                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <span className="block sm:inline">*La Fecha Inicial es Obligatoria</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-2" onClick={() => setMsgErrors({...msgErrors, fechaInicialObligatoria: false})}>
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                    </span>
                                </div>
                            }

                            {msgErrors.fechaFinalObligatoria && fechaFinal === ''  &&
                                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <span className="block sm:inline">*La Fecha Final es Obligatoria</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-2" onClick={() => setMsgErrors({...msgErrors, fechaFinalObligatoria: false})}>
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                    </span>
                                </div>
                            }
                            {msgErrors.periodoInvalido &&
                                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <span className="block sm:inline">*Periodo Inváido: Fecha Inicial no puede se mayor a la Fecha Final.</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-2" onClick={() => setMsgErrors({...msgErrors, periodoInvalido: false})}>
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                    </span>
                                </div>
                            }
                            {msgErrors.erroEndPoint &&
                                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                                    <span className="block sm:inline">*{msgErrors.msgError === undefined ? 'Error al obtener los datos, favor inténtelo más tarde' : msgErrors.msgError }</span>
                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-2" onClick={() => setMsgErrors({...msgErrors, erroEndPoint: false, msgError: null})}>
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                    </span>
                                </div>
                            }
                        </div>

                        <div className="flex w-full px-4">
                            <button disabled={disabledButton} onClick={handleGetDataDolar} 
                            style={disabledButton ? {backgroundColor: '#7f9cf5'} : {}}
                            className="w-full bg-indigo-500 hover:bg-indigo-700 text-white text-sm py-2 px-4 rounded"
                            >
                                Cotizar Dólar
                            </button>
                        </div>
                    </div>

                    <div className="px-6 py-4">
                        <div className="text-center text-gray-500">
                            {
                                tipo === 'diaActual' ? `Valor Dólar Actual $${parseFloat(valor.Valor)} CLP`
                                : `Última actualiación Dólar: $${parseFloat(valor.Valor)} CLP`
                            }
                        </div>
                    </div>
                    
                </div>
            </div>

            <GraficoResultado data={dataResultado} dataCategorias={dataCategorias} dataSeries={dataSeries} />

        </div>
    )
}

export default CardCotizador;



