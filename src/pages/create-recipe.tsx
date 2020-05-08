import * as React from 'react'
import { useEffect, useState } from 'react'
import { auth, signInWithGoogle } from '../firebase/firebase.utils'
import { CreateRecipeForm } from '@appRoot/components'
import {Typography } from '@material-ui/core'


export function CreateRecipePage() {
  const [user, setUser] = useState(null)

  let unsubscribeFromAuth

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setUser(user)
      console.log(user)
    })

    return () => {
      unsubscribeFromAuth()
      console.log('unsubscribed from auth')
    }
  }, [])

  const getContent = () => {
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
      <CreateRecipeForm />
    )
  }

  return (
    <div>
      { getContent() }
    </div>
  )
}
