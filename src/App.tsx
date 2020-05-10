import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { HomePage, RecipePage, Header, CreateRecipePage } from './pages'
import { Container } from '@material-ui/core'

function App() {
  return (
    <Container>
      <Header />
      <Route exact path={'/'} component={HomePage} />
      <Route exact path={'/create-recipe'} component={CreateRecipePage} />
      <Route path={'/recipe/:rid'} component={RecipePage} />
    </Container>
  )
}

export default App
