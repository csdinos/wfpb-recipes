import React, {useEffect, useState} from 'react'
import {firestore} from '@appRoot/firebase/firebase.utils'
import { RecipeList } from '@appRoot/components'
import {Typography, CircularProgress, Button, Box} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

function Home({ history }) {
  const [recipes, setRecipes] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getRecipes = async () => {
      const querySnapshot = await firestore.collection('recipes').get()
      console.log('recipe')
      console.log(querySnapshot.docs)

      setRecipes(querySnapshot.docs)
    }

    getRecipes().catch(e => {
      console.log(e)
      setHasError(true)
    })
  }, [])

  if (hasError) {
    return <Typography>There has been an error, please try again later.</Typography>
  }

  if (!recipes) {
    return <Box textAlign="center">
      <CircularProgress/>
    </Box>
  }
  return (
    <div>
      <Box marginBottom={2} textAlign="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {history.push('/create-recipe')}}
        >
          Create a recipe
        </Button>
      </Box>

      <RecipeList recipes={recipes} />
    </div>
  )
}

export default withRouter(Home)
