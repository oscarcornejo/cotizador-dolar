import React from 'react';

// COMPONENTS
import CardInformacion from '../../components/cardInformacion/CardInformacion';
import CardCotizador from '../../components/cardCotizador/CardCotizador';


const CotizadorPage = (props) => {

    return (
        <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
            <CardInformacion />
            <CardCotizador  />
        </div>
            
            
    )
}

export default CotizadorPage;
