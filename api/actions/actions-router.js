// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

// Middleware
const {
  validateActionsId,
  validateAction,
  validateCompleted
} = require('./actions-middlware')

// Get all actions endpoint
router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
})

// Get action by id
router.get('/:id', validateActionsId, (req, res) => {
  let action = req.action
  res.json(action)
})

// Post endpoint
router.post('/', validateAction, async (req, res, next) => {
  try {
    let newAction = await Actions.insert(req.body)
    res.status(200).json(newAction)
  }
  catch(err) {
    next(err)
  }
})

// Put endpoint
router.put('/:id', validateActionsId, validateAction, validateCompleted, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(() => {
      return Actions.get(req.params.id)
    })
    .then(updatedAction => {
      res.json(updatedAction)
    })
    .catch(next)
})

// Delete endpoint
router.delete('/:id', validateActionsId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id)
    res.status(200).json({
      message: 'Successfully removed'
    })
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
