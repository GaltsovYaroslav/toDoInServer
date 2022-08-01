const db = require('../db')

class UserController {
    async createTask(req, res){
        const {content, completed} = req.body;
        const newTask = await db.query(`INSERT INTO task (worker, content) values ($1, $2) RETURNING *`, [content, completed]);
        res.json(newTask.rows[0]);
    }   
    async getTask(req, res){
        const getAllTask = await db.query(`SELECT * FROM task`);
        res.json(getAllTask.rows);
    }
    async updateTask(req, res){
        const {id, content, completed} = req.body;
        const updateAllTask = await db.query(`UPDATE task set worker = $1, content = $2 where id = $3 RETURNING *`, [content, completed, id]);
        res.json(updateAllTask.rows[0]);
    }
    async deleteTask(req, res){
        const id = req.params.id;
        const delTask = await db.query(`DELETE FROM task where id = $1`, [id]);
        res.json(delTask.rows[0]);
    }
}

module.exports = new UserController() 