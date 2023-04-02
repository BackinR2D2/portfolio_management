const {
	uploadProjectData,
	getPortfolioData,
	deleteProjectByID,
	updateProjectDisplayByID,
	hideProjectByID,
	editProjectByID,
} = require('../services/portfolio.service');

async function createProject(req, res, next) {
	try {
		const data = {
			body: req.body,
			file: req.file,
		};
		await uploadProjectData(data);
		res.json({
			status: 1,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			message: process.env.NODE_ENV === 'production' ? 'Server Error' : error,
		});
	}
}

async function deleteProject(req, res, next) {
	try {
		const { id } = req.params;
		await deleteProjectByID(id);
		res.status(204).json({
			status: 1,
			message: 'Project Deleted Successfully',
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			message: process.env.NODE_ENV === 'production' ? 'Server Error' : error,
		});
	}
}

async function updateProjectDisplay(req, res, next) {
	try {
		const { id } = req.params;
		const { visibility } = req.body;

		const projectResponse = await updateProjectDisplayByID(id, visibility);

		res.status(201).json({
			status: 1,
			message: 'Project Updated Successfully',
			notDisplayedProjects: projectResponse.notDisplayedProjects,
			displayedProjects: projectResponse.displayedProjects,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			message: process.env.NODE_ENV === 'production' ? 'Server Error' : error,
		});
	}
}

async function getPortfolio(req, res, next) {
	try {
		const projects = await getPortfolioData();
		res.json({
			status: 1,
			projects,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			message: process.env.NODE_ENV === 'production' ? 'Server Error' : error,
		});
	}
}

async function hideProject(req, res, next) {
	try {
		const { id } = req.params;
		const { visibility } = req.body;

		const projectResponse = await hideProjectByID(id, visibility);

		res.status(201).json({
			status: 1,
			message: 'Project Updated Successfully',
			notDisplayedProjects: projectResponse.notDisplayedProjects,
			displayedProjects: projectResponse.displayedProjects,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			message: process.env.NODE_ENV === 'production' ? 'Server Error' : error,
		});
	}
}

async function editProject(req, res, next) {
	try {
		const { id } = req.params;
		const newData = {
			body: req.body,
			file: req.file,
		};
		const response = await editProjectByID(newData, id);
		res.status(201).json({
			status: 1,
			message: 'Project Edited Successfully',
			modifiedPortfolio: response.modifiedPortfolio,
		});
	} catch (error) {
		res.status(error.statusCode || 500).json({
			message: process.env.NODE_ENV === 'production' ? 'Server Error' : error,
		});
	}
}

module.exports = {
	createProject,
	getPortfolio,
	deleteProject,
	updateProjectDisplay,
	hideProject,
	editProject,
};
