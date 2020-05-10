import * as React from 'react'
import { Card, CardMedia, CardActionArea, makeStyles, CardContent, Typography} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'

// TODO: add custom interface
// interface IRecipeCard extends RouteComponentProps<any> {
//   description: string;
//   id: string;
//   image: string;
//   title: string;
//   // history: History;
// }

export const RecipeCardComponent: React.FunctionComponent<RouteComponentProps> = ({history, image, title, description, id}) => {
  const classes = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  })()

  return (
    <Card className={classes.root} onClick={() => {history.push(`recipe/${id}`)}}>
      <CardActionArea >
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

export const RecipeCard = withRouter(RecipeCardComponent)
