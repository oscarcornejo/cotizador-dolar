import React, { useState } from 'react'

const Header = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="bg-indigo-500">
                <div className="container mx-auto px-4">
                    <div className="flex items-center md:justify-between py-4">
                        <div className="w-1/4 md:hidden">
                            <svg className="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/></svg>
                        </div>
                        <div className="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
                            Cotizador Dólar
                        </div>
                        <div className="w-1/4 md:w-auto md:flex text-right">
                            <div>
                            <img className="inline-block h-8 w-8 rounded-full" src="https://avatars2.githubusercontent.com/u/5360666?s=460&u=9034c9007db77c690b2e4ed907a16796224a846b&v=4" alt="" />
                            </div>
                            <div className="hidden md:block md:flex md:items-center ml-2">
                                <span className="text-white text-sm mr-1">Oscar Cornejo</span>
                                <div onClick={()=>setOpen(!open)} style={{cursor: 'pointer'}}>
                                    <svg className="fill-current text-white h-4 w-4 block opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"/>
                                    </svg>
                                </div>
                                {
                                    open && 
                                    <div className="absolute w-40 py-2 bg-white border rounded shadow-xl" style={{right: 85, top: 62}}>   
                                        <a href="https://www.linkedin.com/in/oscarcornejo10/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-700 rounded hover:bg-indigo-500 hover:text-white">Ver Perfil</a>
                                    </div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
