import * as React from 'react'
import {useState, useEffect} from 'react'
import {
  Grid,
  List,
  ListItemText,
  ListItem,
  Divider,
  CircularProgress,
  Typography,
  Box,
  makeStyles
} from '@material-ui/core'
import type {Ingredient, Recipe as IRecipe} from '@appRoot/types'
import {useParams} from 'react-router-dom'
import {AccessTime, PanTool} from '@material-ui/icons'
import {getRecipe} from '@appRoot/firebase/actions'

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
}))

export function Recipe() {
  const classes = useStyles()
  const [recipe, setRecipe] = useState<IRecipe>(null)
  const [hasError, setHasError] = useState(false)
  const {rid} = useParams()

  useEffect(() => {
    getRecipe(rid).then((recipe: IRecipe) => {
      !recipe ? setHasError(true) : setRecipe(recipe)
    }).catch(e => {
      console.log(e)
      setHasError(true)
    })
  }, [])

  if (hasError) {
    return (
      <Typography>
        There has been an error loading the page, please try again...
      </Typography>
    )
  }

  if (!recipe) {
    return (
      <Box textAlign="center">
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <Box marginTop={2}>
      <Grid container justify="center">
        <Grid item xs={9}>
          <Box marginBottom={2} textAlign="center">
            <Typography variant="h2" component="h1">
              {recipe.title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box marginBottom={2} textAlign="center" boxShadow={3}>
            <img className={classes.image} src={recipe.image} alt="image"/>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box marginBottom={2} textAlign="center">
            <Typography gutterBottom variant="h4" component="h4">Ingredients</Typography>
            <List dense={true}>
              {recipe.ingredients.map((ingredient: Ingredient) => (
                <ListItem>
                  <ListItemText
                    primary={
                      <Box textAlign="center">
                      <span>
                      {`${ingredient.name}, ${ingredient.amount} ${ingredient.amount_unit}`}
                    </span>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box marginBottom={2}>
            <Divider/>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box marginBottom={2} textAlign="center">
            <AccessTime/>
            <Typography variant="body1">
              {`${recipe.cook_time.amount} ${recipe.cook_time.amount_unit}`}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box marginBottom={2} textAlign="center">
            <PanTool/>
            <Typography variant="body1">
              {`${recipe.hands_on_time.amount} ${recipe.hands_on_time.amount_unit}`}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <Box marginBottom={2} textAlign="center">
            <Typography gutterBottom variant="h5" component="h5">Steps</Typography>
            <List dense={false}>
              {recipe.instructions.map((instruction: string, i: number) => (
                <ListItem>
                  <ListItemText primary={`${i + 1}.  ${instruction}`}/>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <Box marginBottom={2}>
            <Divider/>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <Box marginBottom={2} textAlign="center">
            <Typography gutterBottom variant="h5" component="h5">Tips</Typography>
            <List dense={false}>
              {recipe.tips.map((tip: string, i: number) => (
                <ListItem>
                  <ListItemText primary={`${i + 1}.  ${tip}`}/>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
