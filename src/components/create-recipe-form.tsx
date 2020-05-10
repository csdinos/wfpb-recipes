import * as React from 'react'
import { useState } from 'react'
import { createRecipe } from '../firebase/firebase.utils'
import {Typography, TextField, Button, CircularProgress} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

// TODO: export all styles in css file
const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    padding: '0 10px',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 10
  },
  blockElement: {
    marginBottom: '20px',
    width: '100%'
  },
  dynamicFieldContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  extendedWidth: {
    width: '100%',
    marginRight: 20
  }
}

export function CreateRecipeFormComponent({ history }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [ingredients, setIngredients] = useState([{
    name: '',
    amount: '',
    amount_unit: ''
  }])
  const [instructions, setInstructions] = useState([''])
  const [tips, setTips] = useState([''])
  const [cookTime, setCookTime] = useState({
    amount: '',
    amount_unit: ''
  })
  const [handsOnTime, setHandsOnTime] = useState({
    amount: '',
    amount_unit: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    // TODO: add DPD fields
    createRecipe({
      title,
      description,
      image,
      ingredients,
      instructions,
      tips,
      cook_time: cookTime,
      hands_on_time: handsOnTime
    }).then(() => {
      setIsSaving(false)
      history.push('/')
    }).catch(e => {
      console.log(e)
      setIsSaving(false)
      setHasError(true)
    })
  }

  const getDynamicFieldAttrs = (name) => {
    let curentValues
    let setter

    switch (name) {
      case 'ingredients':
        curentValues = ingredients
        setter = setIngredients
        break
      case 'instructions':
        curentValues = instructions
        setter = setInstructions
        break
      case 'tips':
        curentValues = tips
        setter = setTips
        break
    }

    return {
      values: curentValues,
      setter
    }
  }
  const handleDynamicFieldAttributeChange = (idx: number, field: string, attribute?: string) => evt => {
    const fieldAttrs = getDynamicFieldAttrs(field)

    const newValues = fieldAttrs.values.map((fieldVal, index) => {
      if (idx !== index){
        return fieldVal
      }

      if (attribute) {
        return { ...fieldVal, [attribute]: evt.target.value }
      }

      return evt.target.value
    })

    fieldAttrs.setter(newValues)
  }

  const handleAddDynamicField = (field: string) => () => {
    const fieldAttrs = getDynamicFieldAttrs(field)

    const newIngredients = fieldAttrs.values.concat([
      field === 'ingredients' ? {
        name: '',
        amount: '',
        amount_unit: ''
      } : ['']
    ])

    console.log(newIngredients)
    fieldAttrs.setter(newIngredients)
  }

  const handleRemoveDynamicField = (idx: number, field: string) => () => {
    const fieldAttrs = getDynamicFieldAttrs(field)

    const newIngredients = fieldAttrs.values.filter((s, sidx) => idx !== sidx)

    console.log(newIngredients)
    fieldAttrs.setter(newIngredients)
  }

  const renderIngredients = () => {
    return (
      <div style={styles.blockElement}>
        <Typography variant="h5">Ingredients</Typography>

        {ingredients.map((ingredient, idx) => (
          <div key={idx} style={styles.dynamicFieldContainer}>
            <TextField
              label="Ingredient"
              value={ingredient.name}
              onChange={handleDynamicFieldAttributeChange(idx, 'ingredients', 'name')}
            />
            <TextField
              label="Amount"
              helperText="Has to be a number"
              value={ingredient.amount}
              onChange={handleDynamicFieldAttributeChange(idx, 'ingredients', 'amount')}
            />
            <TextField
              label="Amount unit"
              helperText="Ex. cups, grams"
              value={ingredient.amount_unit}
              onChange={handleDynamicFieldAttributeChange(idx, 'ingredients', 'amount_unit')}
            />
            <Button
              variant="contained"
              color="secondary"
              style={{height: 36}}
              onClick={handleRemoveDynamicField(idx, 'ingredients')}
            > - </Button>
          </div>
        ))}
        <Button
          id="add_ingredient"
          type="button"
          variant="contained"
          color="default"
          onClick={handleAddDynamicField('ingredients')}
          fullWidth={false}
        >
          <Typography variant="body1">+</Typography>
        </Button>
      </div>
    )
  }

  type DynamicFieldData = {
    label: string;
    title: string;
    values: string[];
  }
  const renderDynamicField = ({title, label, values}: DynamicFieldData) => {
    return (
      <div style={styles.blockElement}>
        <Typography variant="h5">{title}</Typography>

        {values.map((instruction, idx) => (
          <div key={idx} style={styles.dynamicFieldContainer}>
            <TextField
              style={styles.extendedWidth}
              label={label}
              multiline
              value={instruction}
              onChange={handleDynamicFieldAttributeChange(idx, title.toLowerCase())}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRemoveDynamicField(idx, title.toLowerCase())}
            > - </Button>
          </div>
        ))}
        <Button
          variant="contained"
          color="default"
          onClick={handleAddDynamicField(title.toLowerCase())}
          fullWidth={false}
        >
          <Typography variant="body1">+</Typography>
        </Button>
      </div>
    )
  }

  console.log('rendering')
  return (
    <form autoComplete="off" onSubmit={handleSubmit} style={styles.container}>
      <div style={styles.blockElement}>
        <TextField
          label="Title"
          required
          value={title}
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div style={styles.blockElement}>
        <TextField
          label="Description"
          required
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div style={styles.blockElement}>
        <TextField
          label="Image"
          helperText="Link to image.. for now.."
          required
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div style={{marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <TextField
          label="Cook time"
          helperText="Should be a number"
          style={{width: '100%', marginRight: 20}}
          value={cookTime.amount}
          onChange={(e) => setCookTime({
            ...cookTime,
            amount: e.target.value
          })}
        />
        <TextField
          label="Cook time unit"
          value={cookTime.amount_unit}
          style={{width: '100%'}}
          helperText="Ex. min, hours"
          onChange={(e) => setCookTime({
            ...cookTime,
            amount_unit: e.target.value
          })}
        />
      </div>

      <div style={{marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <TextField
          label="Hands on time"
          style={{width: '100%', marginRight: 20}}
          helperText="Should be a number"
          value={handsOnTime.amount}
          onChange={(e) => setHandsOnTime({
            ...handsOnTime,
            amount: e.target.value
          })}
        />
        <TextField
          label="Hands on time unit"
          value={handsOnTime.amount_unit}
          style={{width: '100%'}}
          helperText="Ex. min, hours"
          onChange={(e) => setHandsOnTime({
            ...handsOnTime,
            amount_unit: e.target.value
          })}
        />
      </div>

      { renderIngredients() }

      { renderDynamicField({
          title: 'Instructions',
          label: 'Instruction',
          values: instructions
        })
      }

      { renderDynamicField({
          title: 'Tips',
          label: 'Tip',
          values: tips
        })
      }

      <Button type="submit" variant="contained" color="primary" style={styles.button}>
        Create!
      </Button>

      { isSaving && <CircularProgress />}

      { hasError && (
        <Typography variant="body1">
          There has been an error, please try again later.
        </Typography>
      )}
    </form>
  )
}

export const CreateRecipeForm = withRouter(CreateRecipeFormComponent)
