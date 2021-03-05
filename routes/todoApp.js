const router = require('express').Router();
let TodoApp = require('../models/todoApp');

//get all todos
router.route('/').get((req, res) => {
	TodoApp.find()
	.then(todos => res.json(todos))
	.catch(err => res.status(400).json('Error: ' + err));
})

//add todo
router.route('/add').post((req, res) => {
	const todo = req.body.todo;

	const newTodoApp = new TodoApp({
		todo
	});

	newTodoApp.save()
	.then(() => res.json('Todo Added!'))
	.catch(err => res.status(400).json('Error: ' + err));
})

//delete todo
router.route('/delete/:id').delete((req, res) => {
	TodoApp.findByIdAndDelete(req.params.id)
	.then(todo => res.json(todo))
	.catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').patch((req, res) => {
    const todo = req.body.todo;

	TodoApp.findByIdAndUpdate(req.params.id, { todo: todo })
	.then(() => res.json('Update Added!'))
	.catch(err => res.status(400).json('Error: ' + err))
})



module.exports = router