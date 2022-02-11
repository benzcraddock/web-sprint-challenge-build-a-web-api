// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionsId(req, res, next) {
  try {
    let id = req.params.id
    let action = await Actions.get(id)
    if(!action) {
      res.status(404).json({
        message: 'Action not found'
      })
    } else {
      req.action = action
      next()
    }
  }
  catch(err) {
    next(err)
  }
}

function validateAction(req, res, next) {
  let { project_id, description, notes } = req.body
  if(!project_id || !description || !notes) {
    res.status(400).json({
      message: 'Missing required project_id, description, and notes fields'
    })
  } else {
    req.update = { project_id, description, notes }
    next()
  }
}

function validateCompleted(req, res, next) {
  let { completed } = req.body
  if(completed || completed === false) {
    next()
  }
  else {
    res.status(400).json({
      message: 'Required fields are not completed, please verify'
    })
  }
}

module.exports = {
  validateActionsId,
  validateAction,
  validateCompleted
}
