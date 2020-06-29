import React, { useState } from 'react';

// REDUX
import {useSelector} from 'react-redux'

const CardInformacion = () => {

    const {estadisticas} = useSelector( state => state.estadisticas);
    const {valor, tipo} = useSelector( state => state.valorActual);
    const [selectState, setSelectState] = useState('valorPromedio');

    return (
            
            <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                <div className="border-b px-6">
                    <div className="flex justify-between -mb-px">
                        <div className="lg:hidden text-blue-dark py-4 text-lg">
                            Precio Dólar
                        </div>

                        <div className="hidden lg:flex">
                            <button type="button" className="appearance-none py-4 text-indigo-500 border-b border-indigo-500 mr-6">
                                {
                                    tipo === 'diaActual' ? `Valor Dólar Actual $${parseFloat(valor.Valor)} CLP`
                                    : `Última Actualiación Dólar: $${parseFloat(valor.Valor)} CLP`
                                }
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-col px-6 lg:hidden">
                    <div className="flex-grow flex-no-shrink py-6">
                        <div className="text-gray-600 mb-2">
                            <span className="text-3xl align-top">CLP$</span>
                            { selectState === 'valorMinimo' && <span className="text-5xl">800</span>}     
                            { selectState === 'valorMaximo' && <span className="text-5xl">801</span>}     
                            { selectState === 'valorPromedio' && <span className="text-5xl">802</span>}
                        </div>
                        <div className="text-gray-600 text-sm">
                            {
                                tipo === 'diaActual' ? `Valor Dólar Actual $${valor.Valor} CLP`
                                : `Última Actualiación Dólar: $${parseFloat(valor.Valor)} CLP`
                            }
                        </div>
                    </div>

                    <div className="flex-shrink w-64 inline-block relative py-6">
                        <select value={selectState || ''} onChange={(e)=>setSelectState(e.target.value)}  
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option value="valorMinimo">Valor Mínimo</option>
                            <option value="valorMaximo">Valor Máximo</option>
                            <option value="valorPromedio">Valor Promedio</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                </div>
                <div className="hidden lg:flex">
                    
                    <div className="w-1/3 text-center py-8">
                        <div className="border-r">
                            <div className="text-gray-700 mb-2">
                                <span className="text-3xl align-top">
                                    CLP$</span>
                                <span className="text-5xl">{estadisticas?.valorMin === undefined ? 0 : estadisticas.valorMin}</span>
                            </div>
                            <div className="text-sm uppercase text-gray-500 tracking-wide">
                                Valor Dólar Mínimo
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 text-center py-8">
                        <div className="border-r">
                            <div className="text-gray-700 mb-2">
                                <span className="text-3xl align-top">CLP$</span>
                                <span className="text-5xl">{estadisticas?.promedio === undefined ? 0 : estadisticas.promedio}</span>
                            </div>
                            <div className="text-sm uppercase text-gray-500 tracking-wide">
                                Valor Dólar Promedio
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 text-center py-8">
                        <div>
                            <div className="text-gray-700 mb-2">
                                <span className="text-3xl align-top">
                                    CLP$</span>
                                <span className="text-5xl">{estadisticas?.valorMax  === undefined ? 0 : estadisticas.valorMax}</span>
                            </div>
                            <div className="text-sm uppercase text-gray-500 tracking-wide">
                                Valor Dólar Máximo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CardInformacion
