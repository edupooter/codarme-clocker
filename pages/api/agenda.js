import { firebaseServer } from '../../config/firebase/server'

const db = firebaseServer.firestore()

const agenda = db.collection('agenda')

export default async (req, res) => {
  const [, token] = req.headers.authorization.split(' ')

  if (!token) {
    return res.status(401)
  }

  try {
    const { user_id: userId } = await firebaseServer.auth().verifyIdToken(token)

    const snapshot = await agenda
      .where('userId', '==', userId)
      .where('date', '==', req.query.date)
      .get()

    const docs = snapshot.docs.map(doc => doc.data())

    return res.status(200).json(docs)
  } catch (error) {
    console.error('FB ERROR', error)

    return res.status(401)
  }
}
