const router = require('express').Router();
const {
	getPortfolio,
	createProject,
	deleteProject,
	updateProjectDisplay,
	hideProject,
	editProject,
} = require('../controllers/portfolio.controller');

const multer = require('multer');
const imageUpload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './uploads/');
		},
		filename: function (req, file, cb) {
			cb(null, new Date().valueOf() + '_' + file.originalname);
		},
	}),
});

router.post('/portfolio', imageUpload.single('projectImage'), createProject);
router.get('/portfolio', getPortfolio);
router.delete('/portfolio/:id', deleteProject);
router.put('/project/:id', updateProjectDisplay);
router.put('/project/hide/:id', hideProject);
router.put(
	'/project/edit/:id',
	imageUpload.single('projectImage'),
	editProject
);

module.exports = router;
