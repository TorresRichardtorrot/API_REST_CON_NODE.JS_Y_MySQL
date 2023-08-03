import {pool} from '../db.js'


export const getEmployees = async (req,res) => {
try {
    
    const [rows] = await pool.query('SELECT * FROM employee')
    res.send([rows])
}
catch(error){
    console.error(error)
    return res.status(500).json({
        message:'algo fue mal Ln:11'
    })
}
   
}

//?controlador para obtener un employee por medio de un parametro (id)
export const getAnEmployee = async (req,res) => {
    const { id } = req.params
    try {
        
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?',[id])

    if(rows.length <=0 ) return res.status(404).json({
        message: 'Employee not found'
    })
    res.send([rows])

    } catch (error) { 
        console.error(error)
        return res.status(500).json({
            message:'algo fue mal Ln:30'
        })
    }
}

//?controlador para crear un employee
export const createEmployee = async (req,res) => {
    const {name,salary} = req.body
    try {
       
        const [rows] = await pool.query('INSERT INTO employee(name,salary) VALUE (?,?)',[name,salary])
         console.log(req.body)
         res.send({
            id: rows.insertId,
            name,
             salary,
    })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:'algo fue mal Ln:48'
        })
    }
}


//?controlador para eliminar employee
export const deleteEmployee = async (req,res) => {
    const { id } = req.params
   try {
   
    const [result] = await pool.query('DELETE  FROM employee WHERE id = ?',[id])

    if(result.affectedRows > 0) return res.status(200).json({
        message: 'deleted employee'
    }); else{
        return res.status(404).json({
            message: 'the employee does not exist'})
        
    }

   } catch (error) {
    console.error(error)
    return res.status(500).json({
        message:'algo fue mal Ln:70'
    })
   }
}

//?controlador para editar employee
export const updateEmployee = async (req,res) => {
    const {id} = req.params
    const {name,salary} = req.body
   try {
    
    const [result] = await pool.query('UPDATE employee SET name= IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?', [name,salary,id])

    if(result.affectedRows > 0){
      const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?',[id])
      res.send(rows)
    }
     else{
        return res.status(404).json({
            message: 'the employee does not exist'})
        
    }
   } catch (error) {
    console.error(error)
    return res.status(500).json({
        message:'algo fue mal Ln:93'
    })
   }
}