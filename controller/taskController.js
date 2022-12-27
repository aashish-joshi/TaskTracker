export const get_all_tasks = (req, res, next) => {
    res.json({
        "status": "success",
        "message": "Task list"
    })
};

export const get_one_task = (req, res, next) => {
    
    res.json({
        "status": "success",
        "message": `Task ${req.params.id}`
    })
};