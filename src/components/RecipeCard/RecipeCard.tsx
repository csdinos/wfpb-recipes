import * as React from 'react'
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  CardHeader,
  makeStyles
} from '@material-ui/core'
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345
  },
  image: {
    height: 0,
    paddingTop: '56.25%'
  }
}))

const RecipeCard = ({history, image, title, description, id}) => {
  const classes = useStyles()

  const onClick = () => {
    history.push(`recipe/${id}`)
  }

  return (
    <Card className={classes.root} onClick={onClick}>
      <CardActionArea>
        <CardHeader
          title={title}
        />
        <CardMedia
          className={classes.image}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {/*TODO: handle height when this wraps*/}
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default withRouter(RecipeCard)
