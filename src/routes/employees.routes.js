import { Router } from "express";
import { getEmployees,createEmployee,updateEmployee,deleteEmployee, getAnEmployee }from "../controllers/employees.controllers.js"
const router = Router()

//?Ruta para obtener todos los employees
router.get('/employees',getEmployees)

//?Ruta para obtener un employee por un parametro
router.get('/employees/:id',getAnEmployee)

//?Ruta para crear un employee
router.post('/employees',createEmployee)

//?Ruta para editar un employee por un parametro
router.patch('/employees/:id',updateEmployee)

//?Ruta para eliminar un employee por un parametro
router.delete('/employees/:id',deleteEmployee)


export default router