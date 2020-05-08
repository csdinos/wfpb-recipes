import * as React from 'react'
import { useState } from 'react'
import { createRecipe } from '../firebase/firebase.utils'
import {Typography, TextField, Button, CircularProgress} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    padding: '0 10px'
  },
  button: {
    marginTop: 10
  }
}

export function CreateRecipeFormComponent({ history }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    createRecipe({
      title,
      description,
      image
    }).then(() => {
      setTitle('')
      setDescription('')
      setImage('')
      setIsSaving(false)

      history.push('/')
    }).catch(e => {
      console.log(e)
      setIsSaving(false)
      setHasError(true)
    })
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} style={styles.container}>
      <TextField
        id="title"
        label="title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="description"
        label="description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="image"
        label="image"
        required
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" style={styles.button}>
        Create!
      </Button>

      { isSaving && <CircularProgress />}

      { hasError && (
        <Typography>
          There has been an error, please try again later.
        </Typography>
      )}
    </form>
  )
}

export const CreateRecipeForm = withRouter(CreateRecipeFormComponent)
