// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
  try {
    let id = req.params.id
    let project = await Projects.get(id)
    if(!project) {
      res.status(404).json({
        message: 'Project not found'
      })
    } else {
      req.project = project
      next()
    }
  }
  catch(err) {
    next(err)
  }
}

function validateProject(req, res, next) {
  const { name } = req.body
  if(!name || !name.trim()) {
    res.status(400).json({
      message: 'Missing require name field'
    })
  } else {
    req.name = name.trim()
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProject
}
