import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrores } from '../middleware/validation'

const router = Router()

// POST
router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrores,
    ProjectController.createProjects
)

// GET
router.get('/', ProjectController.getAllProjects)

// GET BY ID
router.get('/:id', 
    
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrores,
    ProjectController.getProjectsById
)

// PUT
router.put('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrores,
    ProjectController.updateProject
)


// DELETE
router.delete('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrores,
    ProjectController.deleteProject
)

export default router