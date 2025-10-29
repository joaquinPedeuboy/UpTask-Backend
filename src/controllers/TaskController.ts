import type {Request, Response} from 'express'
import Task from '../models/Task'
import colors from 'colors'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getProjectTask = async (req: Request, res: Response) => {

        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getTaskById = async (req: Request, res: Response) => {

        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateTask = async (req: Request, res: Response) => {

        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Tarea Actualizada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static deleteTask = async (req: Request, res: Response) => {

        try {
            req.project.tasks = req.project.tasks.filter( task => task.toString() !== req.task.id.toString() )

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            
            res.send('Tarea Eliminada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const project = req.project
            const { taskId } = req.params

            const task = await Task.findOne({ _id: taskId, project: project.id });

            if (!task) {
                res.status(404).json({ error: 'Hubo un error y no se encuentra' })
                return
            }

            const { status } = req.body
            await task.updateOne({ status })
            res.json({ msg: 'Se ha actualizado' })

        } catch (error) {
            console.log(colors.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
}