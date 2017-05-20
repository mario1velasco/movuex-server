import express from 'express'
import Votes from './models/votes'
import { tvmaze } from 'tvmaze-zucchinidev'
const router = express.Router()
const client = tvmaze.createClient()

router.get('/ping', (req, res) => {
  res.json({
    response: 'pong'
  })
})

router.get('/shows', (req, res) => {
  client.shows().then(({body}) => {
    res.json(body)
  }).catch((err) => {
    res.sendStatus(500).json(err)
  })
})

router.get('/search', (req, res) => {
  const showName = req.query.q

  client.search(showName).then(({body}) => {
    res.json(body)
  }).catch((err) => {
    res.sendStatus(500).json(err)
  })
})

router.get('/votes', (req, res) => {
  Votes.find({}).then((docs) => {
    res.json(docs)
  }).catch(err => {
    res.json({
      err
    })
  })
})

router.post('/votes', (req, res) => {
  const vote = Object.assign(new Votes(), req.body)
  vote.save().then((result) => {
    res.json(result)
  }).catch(err => {
    res.json({
      err
    })
  })
})

export default router

