import * as React from 'react'
import { useEffect, useState } from 'react'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { CreateRecipeForm } from '@appRoot/components'
import {Typography } from '@material-ui/core'

export function CreateRecipe() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setUser(user)
      console.log(user)
    })

    return () => {
      unsubscribeFromAuth()
      console.log('unsubscribed from auth')
    }
  }, [])

  if (!user) {
    return (
      <button onClick={signInWithGoogle}>
        <Typography>
          Please sign up to be able to create a recipe
        </Typography>
      </button>
    )
  }

  return (
    <div>
      <CreateRecipeForm />
    </div>
  )
}
