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
  let { name, description } = req.body
  if(!name || !description) {
    res.status(400).json({
      message: 'Missing required name and description fields'
    })
  } else {
    req.update = { name, description }
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProject
}
