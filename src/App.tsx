import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import {Home, Recipe, Header, CreateRecipe} from './components'
import {Container, createMuiTheme, ThemeProvider, CssBaseline} from '@material-ui/core'


/**
 * TODOs:
 * 1. Add TS types to components
 * 3. add css files and replace css in js
 * 4. create classes for inline inline styles
 */
function App() {
  // https://material-ui.com/customization/palette/
  const theme = createMuiTheme({
    spacing: 10,
    typography: {
      fontFamily: 'Monospace'
    },
    palette: {
      type: 'dark',
      background: {
        default: '#222831',
        paper: '#4d774e'
      },
      primary: {
        main: '#f2a365',
        contrastText: '#fff',
      },
      secondary: {
        main: '#a3bcb6',
        contrastText: '#000',
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="main-container">
        <Header/>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/create-recipe'} component={CreateRecipe}/>
        <Route path={'/recipe/:rid'} component={Recipe}/>
      </Container>
    </ThemeProvider>
  )
}

export default App
