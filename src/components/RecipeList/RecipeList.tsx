import * as React from 'react'
import { Grid } from '@material-ui/core'
import { RecipeCard } from '../RecipeCard/'

export const RecipeList = ({ recipes }) => {
  return (
    <Grid container spacing={2}>
      {
        recipes.map(recipe => {
          const { image, title, description } = recipe.data()

          return (
            <Grid item xs={4} key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                image={image}
                title={title}
                description={description}
              />
            </Grid>
          )
        })
      }
    </Grid>
  )
}
