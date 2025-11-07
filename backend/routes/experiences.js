const express = require('express');
const router = express.Router();
const experiencesController = require('../controllers/experiencesController');

router.get('/', experiencesController.getAllExperiences);
router.get('/:id', experiencesController.getExperienceById);
router.post('/', experiencesController.createExperience);

module.exports = router;