import React from 'react'

const Footer = () => {
    return (
        <div className="bg-white border-t">
            <div className="container mx-auto px-4">
                <div className="md:flex justify-center items-center text-sm">
                    <div className="md:flex md:flex-row-reverse items-center py-4">
                        <div className="text-gray-500 text-center md:mr-4">
                            Hecho con <span style={{color: 'red'}}>&hearts;</span> para {' '}
                            <a href="https://ww.cumplo.cl/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600">Cumplo.cl</a> por {' '}
                            <a href="https://github.com/oscarcornejo" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600">Oscar Cornejo</a> 
                            <br/>
                            &copy; 2020 - Todos Los Derechos e Izquierdos Reservados.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
