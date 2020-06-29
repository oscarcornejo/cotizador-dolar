import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';

const InputDate = (props) => {

    const {
        titulo='', 
        name='', 
        disabled=false, 
        initialValue='', 
        onChange=()=>{},
        anioActual,
        mesActual,
        diaActual,
        // diaAnterior,
    } = props;

    // OPCIONES PARA LIBRERÍA: react-modern-calendar-datepicker
    const myCustomLocale = {
        // months list by order
        months: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Deciembre',
        ],
    
        // week days by order
        weekDays: [
            {
                name: 'Domingo', // used for accessibility 
                short: 'D', // displayed at the top of days' rows
                isWeekend: true, // is it a formal weekend or not?
            },
            {
                name: 'Lunes',
                short: 'L',
            },
            {
                name: 'Martes',
                short: 'M',
            },
            {
                name: 'Miercoles',
                short: 'M',
            },
            {
                name: 'Jueves',
                short: 'J',
            },
            {
                name: 'Viernes',
                short: 'V',
            },
            {
                name: 'Sabado',
                short: 'S',
                isWeekend: true,
            },
        ],
    
        // just play around with this number between 0 and 6
        weekStartingIndex: 0,
    
        // return a { year: number, month: number, day: number } object
        getToday(gregorainTodayObject) {
            return gregorainTodayObject;
        },
    
        // return a native JavaScript date here
        toNativeDate(date) {
            return new Date(date.year, date.month - 1, date.day);
        },
    
        // return a number for date's month length
        getMonthLength(date) {
            return new Date(date.year, date.month, 0).getDate();
        },
    
        // return a transformed digit to your locale
        transformDigit(digit) {
            return digit;
        },
        
        nextMonth: 'Proximo mes',
        previousMonth: 'Mes Anterior',
        openMonthSelector: 'Abrir selector de mes',
        openYearSelector: 'Abrir selector de año',
        closeMonthSelector: 'Cerrar selector de mes',
        closeYearSelector: 'Cerrar selector de año',
        defaultPlaceholder: 'Selecciona...',
    
        from: 'desde',
        to: 'hasta',
        digitSeparator: ',',
        yearLetterSkip: 0,
        isRtl: false,
    }
    // FIN OPCIONES PARA LIBRERÍA: react-modern-calendar-datepicker

    
    const [ date, setDate ] = useState(initialValue);

    const formatDate = () => {
        let currentDate = date || initialValue;
        if (!currentDate) return '';

        return `${currentDate.day}/${currentDate.month}/${currentDate.year}`;
    }

    const renderCustomInput = ({ ref }) => (
        <>    
            <input type="text" name={name} readOnly disabled={ disabled } value={formatDate()} ref={ref}
                className="pl-4 pr-10 py-3 border border-gray-500 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 text-sm"
                placeholder="Seleccionar Fecha" 
            />
            <div className="absolute top-0 right-0 px-3 py-2">
                <svg className="h-6 w-6 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            </div>
        </>    
    )

    return (    
            <div className="mb-2 w-full h-20">
                <label htmlFor="datepicker" className="text-base mb-1 text-gray-600 block">{titulo}</label>
                
                <div className="absolute ">
                    <DatePicker
                        value={ initialValue || { year: anioActual, month: mesActual, day: diaActual }}
                        className="w-full"
                        calendarClassName="cv-calendar"
                        colorPrimary="#0176bf"
                        renderInput={renderCustomInput}
                        locale={myCustomLocale}
                        onChange={val => {setDate(val); onChange(val, name)}}
                        maximumDate={utils().getToday()}
                    />
                </div>	 
            </div>
    )
}

export default InputDate
