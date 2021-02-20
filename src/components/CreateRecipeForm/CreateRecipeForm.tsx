import * as React from 'react'
import { useState } from 'react'
import { createRecipe } from '../../firebase/actions'
import {Typography, TextField, Button, CircularProgress, makeStyles, Box} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import {DynamicField} from '@appRoot/components/DynamicField'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    padding: '0 10px',
    justifyContent: 'space-between'
  },
  needaname: {
    marginBottom: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
  }))

export function CreateRecipeFormComponent({ history }) {
  const classes = useStyles()
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    image: '',
    instructions: [''],
    tips: [''],
    cook_time: {
      amount: '',
      amount_unit: ''
    },
    hands_on_time: {
      amount: '',
      amount_unit: ''
    },
    ingredients: [{
      name: '',
      amount: '',
      amount_unit: ''
    }],
  })
  const [isSaving, setIsSaving] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    // TODO: add DPD fields
    createRecipe(recipe)
      .then(() => {
      setIsSaving(false)
      history.push('/')
    }).catch(e => {
      console.log(e)
      setIsSaving(false)
      setHasError(true)
    })
  }

  // evt.target.value

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={classes.container}>
      <Box marginBottom={2} width="100%">
        <TextField
          label="Title"
          required
          value={recipe.title}
          fullWidth
          onChange={(e) => setRecipe({
            ...recipe,
            title: e.target.value
          })}
        />
      </Box>
      <Box marginBottom={2} width="100%">
        <TextField
          label="Description"
          required
          fullWidth
          value={recipe.description}
          onChange={(e) => setRecipe({
            ...recipe,
            description: e.target.value
          })}
        />
      </Box>
      <Box marginBottom={2} width="100%">
        <TextField
          label="Image"
          helperText="Link to image.. for now.."
          required
          fullWidth
          value={recipe.image}
          onChange={(e) => setRecipe({
            ...recipe,
            image: e.target.value
          })}
        />
      </Box>

      <div className={classes.needaname}>
        <TextField
          label="Cook time"
          helperText="Should be a number"
          style={{width: '100%', marginRight: 20}}
          value={recipe.cook_time.amount}
          onChange={(e) => setRecipe({
            ...recipe,
          cook_time: {
            ...recipe.cook_time,
            amount: e.target.value
          }
          })}
        />
        <TextField
          label="Cook time unit"
          value={recipe.cook_time.amount_unit}
          style={{width: '100%'}}
          helperText="Ex. min, hours"
          onChange={(e) => setRecipe({
            ...recipe,
            cook_time: {
              ...recipe.cook_time,
              amount_unit: e.target.value
            }
          })}
        />
      </div>

      <div className={classes.needaname}>
        <TextField
          label="Hands on time"
          style={{width: '100%', marginRight: 20}}
          helperText="Should be a number"
          value={recipe.hands_on_time.amount}
          onChange={(e) => setRecipe({
            ...recipe,
            hands_on_time: {
              ...recipe.hands_on_time,
              amount: e.target.value
            }
          })}
        />
        <TextField
          label="Hands on time unit"
          value={recipe.hands_on_time.amount_unit}
          style={{width: '100%'}}
          helperText="Ex. min, hours"
          onChange={(e) => setRecipe({
            ...recipe,
            hands_on_time: {
              ...recipe.hands_on_time,
              amount_unit: e.target.value
            }
          })}
        />
      </div>

      <DynamicField
        title={'Ingredient'}
        label={'Ingredients'}
        multipleFields
        fields={['name', 'amount', 'amount_unit']}
        values={recipe.ingredients}
        setter={(ingredients) => {
          setRecipe({
            ...recipe,
            ingredients
          })
        }}
      />

      <DynamicField
        title={'Instructions'}
        label={'Instruction'}
        values={recipe.instructions}
        setter={(instructions) => {
          setRecipe({
            ...recipe,
            instructions
          })
        }}
      />

      <DynamicField
        title={'Tips'}
        label={'Tip'}
        values={recipe.tips}
        setter={(tips) => {
          setRecipe({
            ...recipe,
            tips
          })
        }}
      />

      <Box marginTop={1}>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </Box>

      { isSaving && <CircularProgress />}

      { hasError && (
        <Typography variant="body1">
          There has been an error, please try again later.
        </Typography>
      )}
    </form>
  )
}

export default withRouter(CreateRecipeFormComponent)
