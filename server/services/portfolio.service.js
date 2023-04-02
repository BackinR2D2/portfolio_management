const db = require('../db/');
const fs = require('fs');

async function uploadProjectData(data) {
	try {
		await db('portfolio').insert({
			name: data.body.name,
			description: data.body?.description,
			website: data.body?.website,
			visibility: data.body.visibility === 'true',
			image_filename: data.file.filename,
			image_filepath: `/api/images/${data.file.filename}`,
			image_size: data.file.size,
		});
		return {
			status: 1,
		};
	} catch (error) {
		throw new Error(error);
	}
}

async function getPortfolioData() {
	try {
		const projects = await db('portfolio').select([
			'id',
			'name',
			'description',
			'website',
			'visibility',
			'image_filepath',
			'created_at',
		]);
		return projects;
	} catch (error) {
		throw new Error(error);
	}
}

async function deleteProjectByID(id) {
	try {
		const projectData = await db('portfolio')
			.select('image_filename')
			.where({ id });
		fs.unlinkSync(`./uploads/${projectData[0].image_filename}`);
		await db('portfolio').del().where({
			id,
		});
		return {
			status: 1,
		};
	} catch (error) {
		throw new Error(error);
	}
}

async function updateProjectDisplayByID(id, visibility) {
	try {
		await db('portfolio')
			.update({
				visibility,
			})
			.where({ id });
		const notDisplayedProjects = await db('portfolio')
			.select([
				'id',
				'name',
				'description',
				'website',
				'visibility',
				'image_filepath',
				'created_at',
			])
			.where({ visibility: false });
		const displayedProjects = await db('portfolio')
			.select([
				'id',
				'name',
				'description',
				'website',
				'visibility',
				'image_filepath',
				'created_at',
			])
			.where({ visibility: true });
		return {
			status: 1,
			notDisplayedProjects,
			displayedProjects,
		};
	} catch (error) {
		throw new Error(error);
	}
}

async function hideProjectByID(id, visibility) {
	try {
		await db('portfolio').update({ visibility: !visibility }).where({ id });
		const notDisplayedProjects = await db('portfolio')
			.select([
				'id',
				'name',
				'description',
				'website',
				'visibility',
				'image_filepath',
				'created_at',
			])
			.where({ visibility: false });
		const displayedProjects = await db('portfolio')
			.select([
				'id',
				'name',
				'description',
				'website',
				'visibility',
				'image_filepath',
				'created_at',
			])
			.where({ visibility: true });
		return {
			status: 1,
			notDisplayedProjects,
			displayedProjects,
		};
	} catch (error) {
		throw new Error(error);
	}
}

async function editProjectByID(newData, id) {
	try {
		const oldProjectEntry = await db('portfolio')
			.select(['name', 'description', 'website', 'image_filename'])
			.where({ id });
		if (fs.existsSync(`./uploads/${oldProjectEntry[0].image_filename}`)) {
			fs.unlinkSync(`./uploads/${oldProjectEntry[0].image_filename}`);
		}
		const newDataBody = JSON.parse(JSON.stringify(newData.body));
		for (const key in newDataBody) {
			if (
				newDataBody[key] === 'undefined' ||
				newDataBody[key] === undefined ||
				newDataBody[key] === null ||
				newDataBody[key] === 'null'
			) {
				delete newDataBody[key];
			}
		}
		await db('portfolio')
			.update({
				name: newDataBody?.name || oldProjectEntry[0].name,
				description: newDataBody?.description || oldProjectEntry[0].description,
				website: newDataBody?.website || oldProjectEntry[0].website,
				image_filename: newData.file.filename,
				image_filepath: `/api/images/${newData.file.filename}`,
				image_size: newData.file.size,
			})
			.where({ id });
		const modifiedPortfolio = await db('portfolio').select([
			'id',
			'name',
			'description',
			'website',
			'visibility',
			'image_filepath',
			'created_at',
		]);
		return {
			status: 1,
			modifiedPortfolio,
		};
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	uploadProjectData,
	getPortfolioData,
	deleteProjectByID,
	updateProjectDisplayByID,
	hideProjectByID,
	editProjectByID,
};
