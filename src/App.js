import React from 'react';

// REDUX
import { connect } from 'react-redux';
import {setTheme} from './redux/actions/darkModeAction';

// STYLED COMPONENTS
import styled, { ThemeProvider, withTheme, keyframes } from 'styled-components';
import { GlobalStyles } from "./theme/globalStyles";
import { lightTheme, darkTheme } from "./theme/theme"

// Components
import Header from './components/header/Header';
import CotizadorPage from './pages/cotizador/CotizadorPage';
import Footer from './components/footer/Footer';

// RECURSOS: IMAGENES
import imgMoon from './assets/images/moon.png';
import imgSun from './assets/images/sun.png';

//REDUX
import {useDispatch} from 'react-redux';

const Bounce = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-12px);
  }
`

const BotonDarkMode = styled.div`
    // position: absolute;
    position: fixed;
    right: 25px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    background: ${props => {
      if(props.theme === 'light') {
        return '#F5F7FB'
      } else {
        return '#2d3748'
      }
      }
    };
    border-radius: 50%;
    background-image: ${props => {
        if(props.theme === 'light') {
          return `url(${imgMoon})`
        } else {
          return `url(${imgSun})`
        }
      }
    };
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    z-index: 2;
    animation: ${Bounce} 1s infinite alternate;
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

function App({theme}) {

  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    const mode = (theme === 'light' ? 'dark' : 'light');
    dispatch(setTheme(mode));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <BotonDarkMode theme={theme} onClick={toggleDarkMode} className="md:z-10">
      </BotonDarkMode>
      <Header />
      <div className="flex flex-col min-h-screen w-full">
        <CotizadorPage />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  theme: state.darMode.mode
});


export default connect(mapStateToProps)(withTheme(App));