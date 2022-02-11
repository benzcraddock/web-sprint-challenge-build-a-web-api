// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

// Import middleware
const {
  validateProjectId,
  validateProject,
  validateCompleted
} = require('./projects-middleware')

// Get all projects endpoint
router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
})

// Get projects
router.get('/:id', validateProjectId, (req, res) => {
  let project = req.project
  res.json(project)
})

// Post endpoint
router.post('/', validateProject, async (req, res, next) => {
  try {
    let newProject = await Projects.insert(req.body)
    res.status(200).json(newProject)
  }
  catch(err) {
    next(err)
  }
})

// Put endpoint
router.put('/:id', validateProjectId, validateProject, validateCompleted, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(() => {
      return Projects.get(req.params.id)
    })
    .then(updatedProject => {
      res.json(updatedProject)
    })
    .catch(next)
})

// Delete endpoint
router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id)
    res.status(200).json({
      message: 'Successfully removed'
    })
  }
  catch(err) {
    next(err)
  }
})

// Get actions endpoint
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    let actions = await Projects.getProjectActions(req.params.id)
    res.json(actions)
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
