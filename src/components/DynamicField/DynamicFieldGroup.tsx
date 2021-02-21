import {Button, makeStyles, TextField, Typography} from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles(() => ({
  dynamicFieldContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nestedField: {
    width: '100%',
    marginRight: 20
  }
}))

export const DynamicField = (props) => {
  const classes = useStyles()
  const {title, label, values, setter, multipleFields, fields} = props

  const getFields = (value, idx) => {
    if (multipleFields) {
      return <>
        {fields.map((field, i) => {
          return <TextField
            key={i}
            className={classes.nestedField}
            label={field}
            multiline
            value={value[field]}
            onChange={
              (evt) => {
                const newValues = [...values]
                newValues[idx][field] = evt.target.value
                setter(newValues)
              }
            }
          />
        })}
      </>
    }

    return <TextField
      label={label}
      multiline
      fullWidth={true}
      value={value}
      onChange={
        (evt) => {
          const newValues = [...values]
          newValues[idx] = evt.target.value
          setter(newValues)
        }
      }
    />
  }

  return (
    <div>
      <Typography variant="h5">{title}</Typography>

      {values.map((value, idx) => (
        <div key={idx} className={classes.dynamicFieldContainer}>
          { getFields(value, idx) }
          <Button
            size="small"
            variant="contained"
            color="default"
            onClick={() => {
              values.splice(idx, 1)
              setter(values)
            }}> - </Button>
        </div>
      ))}
      <Button
        variant="contained"
        size="small"
        color="default"
        onClick={() => {
          const newValue = multipleFields ? fields.reduce((res, field) => {
            res[field] = ''
            return res
          }, {}) : ''
          setter([
            ...values,
            newValue
          ])
        }}
        fullWidth={false}
      >
        <Typography variant="body1">+</Typography>
      </Button>
    </div>
  )
}