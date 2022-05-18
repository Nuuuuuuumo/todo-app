const Router = require('express')
const controller = require('../controller/controller')

const router = Router()

router.get('/', controller.getTasks)
router.post('/', controller.postTask)
router.put('/:id', controller.putTask)
router.delete('/:id', controller.deleteTask)

module.exports = router