import React from 'react';

// MOMENT
import moment from 'moment';

// react-apexcharts
import Chart from 'react-apexcharts'

const GraficoResultado = ({data, dataCategorias, dataSeries}) => {

    // OPCIONES PARA GRÁFICO
    const options = {
        chart: {
            id: 'cotizador_dolar',
            defaultLocale: 'es',
            locales: [{
                name: 'es',
                options: {
                  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                  days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
                  shortDays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'],
                  toolbar: {
                    download: 'Descargar SVG',
                  }
                }
              }]
        },
        xaxis: {
            categories: dataCategorias,
            decimalsInFloat: 2,
            labels: {
                formatter: function(value, timestamp, index) {
                    if(dataCategorias.length > 0 ) {
                        return moment(dataCategorias[index]).format("DD-MM-YYYY")
                    } else {
                        return;
                    }
                  
                },
              }
        },
        yaxis: {
            labels: {
              formatter: function (value) {
                return "$" + value;
              }
            },
        },
        dataLabels: {
            enabled: true, 
            formatter: function (val, opts) {
                return "$" + val;
            },
        },
        theme: {
            mode: 'light', 
            palette: 'palette1', 
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        }
    };

    const series = [{
        name: 'Valor',
        data: dataSeries
    }];

    // FIN OPCIONES PARA GRÁFICO

    return (
        <div className="w-full mb-4 lg:w-7/12 px-4">
            <div className="bg-white border-t border-b sm:rounded sm:border shadow">
                <div className="border-b">
                    <div className="flex justify-between px-6 -mb-px">
                        <h3 className="text-indigo-500 py-4 font-normal text-lg">Gráfico</h3>
                    </div>
                </div>
                
                <div>
                    <Chart options={options} series={series} type="bar" width={'100%'} height={320} />
                </div>
            </div>
        </div>
    )
}

export default GraficoResultado;