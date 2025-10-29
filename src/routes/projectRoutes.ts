import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrores } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { ProjectExists } from '../middleware/project'
import { taskBelongsToProject, taskExists } from '../middleware/task'


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

/** ROUTES FOR TASK */
router.param('projectId', ProjectExists)

// CREATE TAREAS
router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrores,
    TaskController.createTask
)

// GET TASKS
router.get('/:projectId/tasks',
    TaskController.getProjectTask
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)
// GET TASK BY ID
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrores,
    TaskController.getTaskById
)

// PUT TASK
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrores,
    TaskController.updateTask
)

// DELETE TASK
router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrores,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrores,
    TaskController.updateStatus
)
export default router