import { Task } from '../models/task.js';

export const get_all_tasks = (req, res, next) => {
    Task.find().sort({createdAt: -1})
    .then(result => {
        res.json({
            "status": "success",
            "data": result,
            "message": "task list"
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            "status": "failed",
            "data": "",
            "message": "Cannot get data from database"
        })
    });
};

export const get_one_task = (req, res, next) => {
    
    Task.findById(req.params.id)
    .then(result => {
        res.json({
            "status": "success",
            "data": result,
            "message": "task"
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            "status": "failed",
            "data": "",
            "message": "Cannot fetch task from database"
        })
    });

};

export const add_new_task = (req, res, next) => {
    const { body, method } = req;

    if(body && method === 'POST'){
        const task = new Task(req.body);
        task.save()
        .then(result => {
            res.status(200).json({
                "status": "success",
                "data": result,
                "message": "task saved"
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                "status": "failed",
                "data": "",
                "message": "Cannot add task to database"
            })
        });
    }else{
        if(method != 'POST'){
            res.status(405).json({
                "status": "failed",
                "data": "",
                "message": "method not allowed."
            });
        }
        res.status(400).json({
            "status": "failed",
            "data": "",
            "message": "bad request"
        });
    }
}