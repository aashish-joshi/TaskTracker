import { Task } from "../models/task.js";
import { User } from '../models/user.js';
import { sendJsonResponse } from "../common/functions.js";

const status_list = ['new', 'done'];

class TaskController {
	static get_all_tasks = (req, res, next) => {

		const { sub, email } = req.auth;
		const { status } = req.query;
		const query = {"userId": sub};

		if(status_list.indexOf(status) !== -1){
			query.status = status;
		}else{
			return sendJsonResponse( req, res, next, 400, "", "Unknown status value" );
		}

		Task.find( query )
			.select("_id userId name body status createdAt")
			.sort({ createdAt: -1 })
			.then((result) => {
				return sendJsonResponse(req, res, next, 200, result, "task list");
			})
			.catch((error) => {
				console.log(error);
				return sendJsonResponse( req, res, next, 500, "", "Cannot get data from database" );
			});
	};
	
	static get_one_task = (req, res, next) => {
		Task.find({ _id: req.params.id, userId: req.auth.sub }, "_id userId name body status createdAt")
			.then((result) => {
				if(result.length === 0){
					// No result
					return sendJsonResponse( req, res, next, 404, "", "task not found" );
				}
				return sendJsonResponse( req, res, next, 200, result, "task" );
			})
			.catch((error) => {
				console.log(error);
				return sendJsonResponse( req, res, next, 500, "", "Cannot get data from database" );
			});
	};
	
	/**
	 * Add a new task to the database.
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 * @returns 
	 */
	static add_new_task = (req, res, next) => {

		const { body } = req;
		const { sub, email } = req.auth;

		
		if (body) {
			// Check if user's account is active.
			
			User.findById(sub).select('email status')
			.then(result => {
				if (result) {
					if( result.status === 'active' && email === result.email ){
						const task = new Task(req.body);
						task.userId = sub;
						task.save()
							.then((result) => {
								return sendJsonResponse( req, res, next, 200, result, "task saved" );
							})
							.catch((error) => {
								console.log(error);
								return sendJsonResponse( req, res, next, 500, "", "Cannot add task" );
							});
					}
					return sendJsonResponse(req, res, next, 500, "", "Insufficient permission")
				}
			})
			.catch(error => {
				console.log(error);
				return sendJsonResponse( req, res, next, 500, "", "Cannot add task" );
			})

		} else {
			if (method != "POST") {
				return sendJsonResponse( req, res, next, 405, "", "method not allowed" );
			}
			return sendJsonResponse( req, res, next, 400, "", "bad request" );
		}
	};

	/**
	 * Update an existing task
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	static update_task = async (req, res, next) => {

		const task_id = req.params.task_id;
		const { name, body, status } = req.body;
		const { sub, email } = req.auth;

		const user = await User.findById(sub).select('email status');

		if(user){
			if( user.status === 'active' && email === user.email ){
				let updated = false;
				try{
					const task = await Task.find({ _id: task_id, userId: req.auth.sub });
					console.log(task);

					// Check & Update
					if (name.length !== 0){
						task[0].name = name;
						updated = true;
					}
					// TODO: Fetch task status from DB
					if (status_list.indexOf(status) !== -1){
						task[0].status = status;
						updated = true;
					}

					// Update Task
					if(body.length !== 0){
						task[0].body = body;
						updated = true;
					}
					
					const save = await task[0].save();

					// Send response
					if(updated){
						return sendJsonResponse( req, res, next, 200, save, "task saved" );
					}else{
						return sendJsonResponse( req, res, next, 400, "", "No changes made to task" );
					}

				} catch (error){
					console.log(error);
					return sendJsonResponse( req, res, next, 500, "", "Cannot update task" );
				}
			}
		}
	}
}

export { TaskController };