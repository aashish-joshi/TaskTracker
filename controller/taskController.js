import {Task} from '../models/task.js';
import {User} from '../models/user.js';
import {sendJsonResponse} from '../common/functions.js';
import {statusList} from '../common/constants.js';

// eslint-disable-next-line require-jsdoc
class TaskController {
  /**
	 * Get a list of all tasks for a user
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */
  static get_all_tasks = (req, res, next) => {
    const {sub, email} = req.auth;
    const {status} = req.query;
    const query = {
      userId: sub,
    };

    if (statusList.indexOf(status) !== -1) {
      query.status = status;
    }

    Task.find(query)
        .select('_id userId name body status createdAt')
        .sort({createdAt: 1})
        .then((result) => {
          return sendJsonResponse(
              req,
              res,
              next,
              200,
              result,
              'task list',
          );
        })
        .catch((error) => {
          console.log(error);
          return sendJsonResponse(
              req,
              res,
              next,
              500,
              '',
              'Cannot get data from database',
          );
        });
  };

  /**
	 * Get one task.
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */
  static get_one_task = (req, res, next) => {
    Task.find(
        {_id: req.params.id, userId: req.auth.sub},
        '_id userId name body status createdAt updatedAt',
    )
        .then((result) => {
          if (result.length === 0) {
            // No result
            return sendJsonResponse(
                req,
                res,
                next,
                404,
                '',
                'task not found',
            );
          }
          return sendJsonResponse(req, res, next, 200, result, 'task');
        })
        .catch((error) => {
          console.log(error);
          return sendJsonResponse(
              req,
              res,
              next,
              500,
              '',
              'Cannot get data from database',
          );
        });
  };

  /**
	 * Add a new task to the database.
	 *
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 * @return {*}
	 */
  static add_new_task = (req, res, next) => {
    const {body} = req;
    const {sub, email} = req.auth;
    const errorResponse = {
      status: 0,
      message: 'Cannot add task',
      data: '',
    };

    // Check if body is properly defined.

    if (body) {
      // Check if user's account is active.
      User.findById(sub)
          .select('email status')
          .then((result) => {
            if (result.status === 'active' && email === result.email) {
              // const {name, body} = req.body;

              const task = new Task(req.body);
              task.userId = sub;
              task.save()
                  .then((r) => {
                    return sendJsonResponse(
                        req,
                        res,
                        next,
                        200,
                        r,
                        'task saved',
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                    next(error);
                  });
            } else {
              console.log();
              errorResponse.status = 401;
              errorResponse.message =
							'You are not authorized to add tasks.';
            }
          })
          .catch((error) => {
            console.log(error);
          });

      if (errorResponse.status !== 0) {
        return sendJsonResponse(
            req,
            res,
            next,
            errorResponse.status,
            errorResponse.data,
            errorResponse.message,
        );
      }
    } else {
      if (method != 'POST') {
        return sendJsonResponse(
            req,
            res,
            next,
            405,
            '',
            'method not allowed',
        );
      }
      return sendJsonResponse(req, res, next, 400, '', 'bad request');
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
    const taskId = req.params.id;
    const {name, body, status} = req.body;
    const {sub, email} = req.auth;

    const user = await User.findById(sub).select('email status');

    // if the body is undefined, return error.
    if (!name && !body && !status) {
      return sendJsonResponse(
          req,
          res,
          next,
          400,
          '',
          'missing request body',
      );
    }

    if (user) {
      if (user.status === 'active' && email === user.email) {
        let updated = false;
        try {
          const task = await Task.find({
            _id: taskId,
            userId: req.auth.sub,
          });
          // console.log(task);

          // Check & Update
          if (name && name.length !== 0) {
            task[0].name = name;
            updated = true;
          }
          // TODO: Fetch task status from DB
          if (status && statusList.indexOf(status) !== -1) {
            task[0].status = status;
            updated = true;
          }

          // Update Task
          if (body && body.length !== 0) {
            task[0].body = body;
            updated = true;
          }

          const save = await task[0].save();

          // Send response
          if (updated) {
            return sendJsonResponse(
                req,
                res,
                next,
                200,
                save,
                'task saved',
            );
          } else {
            return sendJsonResponse(
                req,
                res,
                next,
                400,
                '',
                'No changes made to task',
            );
          }
        } catch (error) {
          console.log(error);
          return sendJsonResponse(
              req,
              res,
              next,
              500,
              '',
              'Cannot update task',
          );
        }
      }
    }
  };

  static delete_task = async (req, res, next) => {
    const taskId = req.params.id;
    const {sub, email} = req.auth;

    const user = await User.findById(sub).select('email status');

    if (user) {
      if (user.status === 'active' && email === user.email) {
        try {
          const taskExists = await Task.find(
              {_id: req.params.id, userId: req.auth.sub},
              '_id userId',
          );
          if (taskExists) {
            await Task.deleteOne({_id: taskId, userId: sub});
            return sendJsonResponse(
                req,
                res,
                next,
                200,
                '',
                `Task ${taskId} deleted`,
            );
          } else {
            return sendJsonResponse(
                req,
                res,
                next,
                404,
                '',
                `Cannot find task ${taskId}`,
            );
          }
        } catch (error) {
          console.log(error);
          return sendJsonResponse(
              req,
              res,
              next,
              500,
              '',
              'Cannot delete task',
          );
        }
      }
    }
  };
}

export {TaskController};
