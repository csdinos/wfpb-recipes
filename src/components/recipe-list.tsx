import * as React from 'react'
import { Grid } from '@material-ui/core'
import { RecipeCard } from './recipe-card'
import { FunctionComponent } from 'react'
import { QueryDocumentSnapshot } from '@appRoot/firebase/firebase.utils'

type IRecipeList = {
  recipes: Array<typeof QueryDocumentSnapshot>;
}
export const RecipeList: FunctionComponent<IRecipeList> = ({ recipes }) => {
  const recipeRows = []
  const chunk = 3

  for (let i = 0; i < recipes.length; i += chunk) {
    recipeRows.push(recipes.slice(i, i + chunk))
  }

  return (
    <Grid container spacing={2}>
      {
        recipeRows.map(recipes => recipes.map((recipe, i) => {
          const { image, title, description } = recipe.data()

          return (
            <Grid item xs={4} key={i}>
              <RecipeCard
                id={recipe.id}
                image={image}
                title={title}
                description={description}
              />
            </Grid>
          )
        }))
      }
    </Grid>
  )
}
