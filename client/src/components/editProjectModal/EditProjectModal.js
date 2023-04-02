import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../utils/url';
import * as yup from 'yup';

/*
    get the form from the homepage in the modal to allow the user to modify the project's entries
    edit button -> PUT request to the server -> update data
*/

const projectSchema = yup.object({
	name: yup.string().nullable(),
	website: yup.string().url().nullable(),
	description: yup.string().nullable(),
});

function EditProjectModal({
	projectData,
	showEditModal,
	setShowEditModal,
	setData,
}) {
	const handleClose = () => setShowEditModal(false);

	const [modifiedProjectData, setModifiedProjectData] = useState({
		name: projectData && projectData.name,
		description: projectData && projectData.description,
		website: projectData && projectData.website,
	});

	function validateSize(size) {
		const fileSize = size / 1024 / 1024;
		return fileSize > 2;
	}

	const editProject = async (formData) => {
		try {
			const file = formData.get('projectImage');
			if (file.type === '') {
				alert('File Type Not Accepted');
				return;
			}
			if (validateSize(file.size)) {
				alert('File zise exceeds 2 MiB');
				return;
			}
			const { data } = await axios.put(
				`${BASE_URL}/api/project/edit/${projectData.id}`,
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			);
			setModifiedProjectData({ name: '', description: '', website: '' });
			alert('Project has been edited successfully');
			setData(data.modifiedPortfolio);
		} catch (error) {
			alert('Entry Upload Error');
		}
	};

	const handleEditProject = async (e) => {
		try {
			e.preventDefault();
			const isEmpty = Object.values(modifiedProjectData).every(
				(x) => x === null || x === ''
			);
			if (isEmpty) {
				alert('At least one input has to be completed in order to edit.');
			} else {
				await projectSchema.validate({
					name: modifiedProjectData.name,
					description: modifiedProjectData.description,
					website: modifiedProjectData.website,
				});
				const formData = new FormData();
				Object.entries(modifiedProjectData).forEach(([key, value]) => {
					formData.append(key, value);
				});
				await editProject(formData);
			}
		} catch (error) {
			alert(error.message || error);
		}
	};

	return (
		<>
			<Modal
				show={showEditModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
				size='lg'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>{projectData.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleEditProject}>
						<Form.Group className='mb-3' controlId='nameInput'>
							<Form.Label>Name of the project</Form.Label>
							<Form.Control
								placeholder="Jane's Website"
								value={modifiedProjectData.name || ''}
								onChange={(e) =>
									setModifiedProjectData((prevState) => {
										return { ...prevState, name: e.target.value };
									})
								}
							/>
						</Form.Group>

						<Form.Group controlId='imageInput' className='mb-3'>
							<Form.Label>Project Image</Form.Label>
							<Form.Control
								type='file'
								name='projectImage'
								required
								accept='image/png, image/jpeg'
								onChange={(e) =>
									setModifiedProjectData((prevState) => {
										return { ...prevState, projectImage: e.target.files[0] };
									})
								}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='descriptionInput'>
							<Form.Label>Project Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								value={modifiedProjectData.description || ''}
								maxLength={100}
								style={{ resize: 'none' }}
								onChange={(e) =>
									setModifiedProjectData((prevState) => {
										return { ...prevState, description: e.target.value };
									})
								}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='websiteInput'>
							<Form.Label>Project Website Reference</Form.Label>
							<Form.Control
								placeholder='https://www.example.com/'
								value={modifiedProjectData.website || ''}
								onChange={(e) =>
									setModifiedProjectData((prevState) => {
										return { ...prevState, website: e.target.value };
									})
								}
							/>
						</Form.Group>

						<div
							className='submitButtonContainer mt-3'
							style={{ textAlign: 'center' }}
						>
							<Button
								variant='secondary'
								type='submit'
								style={{ width: `${100}%`, fontSize: `${18}px` }}
							>
								Edit
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditProjectModal;
