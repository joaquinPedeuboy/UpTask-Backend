import type {Request, Response} from 'express'
import Project from '../models/Project'

export class ProjectController {

    static createProjects = async (req: Request, res: Response) => {
        try {
            await Project.create(req.body)
            res.send('Projecto creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectsById = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id).populate('tasks')
            if(!project) {
                const error = new Error('Projecto no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id)

            if(!project) {
                const error = new Error('Projecto no encontrado')
                return res.status(404).json({error: error.message})
            }
            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description
            await project.save()
            res.send('Projecto Actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id)
            if(!project) {
                const error = new Error('Projecto no encontrado')
                return res.status(404).json({error: error.message})
            }
            await project.deleteOne()
            res.send('Projecto Eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}