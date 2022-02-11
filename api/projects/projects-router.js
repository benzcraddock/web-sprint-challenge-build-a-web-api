// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

// Import middleware
const {
  validateProjectId,
  validateProject
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
router.post('/', validateProject, (req, res, next) => {
  Projects.insert({ name: req.name })
    .then(newProject => {
      res.status(200).json(newProject)
    })
    .catch(next)
})



module.exports = router
