import { Task } from "../models/task.js";
import { sendJsonResponse } from "../common/functions.js";

class TaskController {
	static get_all_tasks = (req, res, next) => {
		Task.find()
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
		Task.findById(req.params.id, "userId name body status createdAt")
			.then((result) => {
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

		// TODO: Check & verify token in auth header.
		// TODO: Validate user & append user ID to task
		const { body, method } = req;
	
		if (body && method === "POST") {
			const task = new Task(req.body);
			task.save()
				.then((result) => {
					return sendJsonResponse( req, res, next, 200, result, "task saved" );
				})
				.catch((error) => {
					console.log(error);
					return sendJsonResponse( req, res, next, 500, "", "Cannot add task" );
				});
		} else {
			if (method != "POST") {
				return sendJsonResponse( req, res, next, 405, "", "method not allowed" );
			}
			return sendJsonResponse( req, res, next, 400, "", "bad request" );
		}
	};

	static update_task = async (req, res, next) => {
		return sendJsonResponse(req, res, next, 200, {id: req.params.id}, "task to be updated. Not implemented.")
	}
}

export { TaskController };