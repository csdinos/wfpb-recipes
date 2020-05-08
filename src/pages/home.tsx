import React, {useEffect, useState} from 'react'
import {firestore} from '@appRoot/firebase/firebase.utils'
import { RecipeList } from '@appRoot/components'
import {Typography, CircularProgress, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

function HomePageComponent({ history }) {
  const [recipes, setRecipes] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getRecipes = async () => {
      const querySnapshot = await firestore.collection('recipes').get()
      console.log('recipe')
      console.log(querySnapshot.docs)

      setRecipes(querySnapshot.docs)
    }

    try {
      getRecipes()
    } catch (e) {
      console.log(e)
      setHasError(true)
    }
  }, [])

  return (
    <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between'}}>
      <div style={{marginBottom: 20, textAlign: 'center'}}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {history.push('/create-recipe')}}
        >
          Create a recipe
        </Button>
      </div>

      { hasError && (
        <Typography>
          There has been an error, please try again later.
        </Typography>
      )}

      { recipes.length ? <RecipeList recipes={recipes} /> : <CircularProgress />}
    </div>
  )
}

export const HomePage = withRouter(HomePageComponent)
