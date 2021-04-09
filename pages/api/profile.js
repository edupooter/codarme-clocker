// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()

const profile = db.collection('profiles')

export default async (req, res) => {
  const [, token] = req.headers.authorization.split(' ')

  const { user_id: userId } = await firebaseServer.auth().verifyIdToken(token)

  const username = req.body.username

  profile.doc(username).set({
    userId,
    username
  })

  res.status(200).json({ name: 'John Doe' })
}
