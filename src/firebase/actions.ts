import {Recipe as IRecipe, Recipe} from '@appRoot/types'
import {firestore} from '@appRoot/firebase/firebase.utils'

export const createRecipe = async (data: Recipe, additionalData: Object = {}) => {
  return new Promise(((resolve, reject) => {
    firestore.collection('recipes').add({
      ...data,
      ...additionalData,
      createdAt: new Date()
    })
      .then(documentReference => resolve(documentReference))
      .catch(e => {
        console.log(e)

        return reject(false)
      })
  }))
}

export const getRecipe = async (rid: string): Promise<IRecipe> => {
  const recipe = await firestore
    .collection('recipes')
    .doc(rid)
    .get()

  if (!recipe.exists) {
    return null
  }

  // https://github.com/googleapis/nodejs-firestore/issues/109
  return recipe.data() as IRecipe
}