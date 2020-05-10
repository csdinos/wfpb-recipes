import * as React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {firestore} from '@appRoot/firebase/firebase.utils'
import {Container, Grid, List, ListItemText, ListItem, Divider, CircularProgress, Typography} from '@material-ui/core'
import {Ingredient, Recipe} from '@appRoot/types'
import { useParams } from 'react-router-dom'
import { AccessTime, PanTool } from '@material-ui/icons'

export function RecipePage() {
  const [recipe, setRecipe] = useState<Recipe>(null)
  const [hasError, setHasError] = useState(false)
  const { rid } = useParams()

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await firestore
        .collection('recipes')
        .doc(rid)
        .get()

      console.log('recipe')
      console.log(recipe)
      if (!recipe.exists) {
        setHasError(true)
      }

      // TODO: find out how to cast or extend the type
      const recipeData: Recipe = recipe.data() as Recipe

      setRecipe(recipeData)
    }

    try {
      getRecipe()
    } catch (e) {
      console.log(e)
      setHasError(true)
    }
  }, [])

  if (hasError) {
    return (
      <Container>
        <Typography> There has been an error loading the page, please try again... </Typography>
      </Container>
    )
  }

  if (!recipe) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img style={{maxWidth: '100%', maxHeight: '100%'}} src={recipe.image} alt="image" />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5" component="h5">Ingredients</Typography>
          <List dense={true}>
            { recipe.ingredients.map((ingredient: Ingredient) => (
              <ListItem>
                <ListItemText
                  primary={ingredient.name}
                  secondary={`${ingredient.amount} ${ingredient.amount_unit}`}
                />
              </ListItem>
            )) }
          </List>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={6} style={{display: 'flex', justifyContent: 'center'}}>
          <AccessTime />
          <Typography variant="body1" style={{marginLeft: 20}}>
            {`${recipe.cook_time.amount} ${recipe.cook_time.amount_unit}`}
          </Typography>
        </Grid>

        <Grid item xs={6} style={{display: 'flex', justifyContent: 'center'}}>
          <PanTool />
          <Typography variant="body1" style={{marginLeft: 20}}>
            {`${recipe.hands_on_time.amount} ${recipe.hands_on_time.amount_unit}`}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h5">Steps</Typography>

          <List dense={false}>
            { recipe.instructions.map((instruction: string, index: number) => (
              <ListItem>
                <ListItemText primary={`${index}.  ${instruction}`} />
              </ListItem>
            )) }
          </List>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom variant="h5" component="h5">Tips</Typography>

          <List dense={false}>
            { recipe.tips.map((tip: string, index: number) => (
              <ListItem>
                <ListItemText primary={`${index}.  ${tip}`} />
              </ListItem>
            )) }
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}
