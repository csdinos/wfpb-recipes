import * as React from 'react'
import { Card, CardMedia, CardActionArea, makeStyles, CardContent, Typography} from '@material-ui/core'
import { FunctionComponent } from 'react'
import { Recipe } from '@appRoot/types'

type IRecipeCard = Recipe

export const RecipeCard: FunctionComponent<IRecipeCard> = ({image, title, description}) => {
  const classes = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  })()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
