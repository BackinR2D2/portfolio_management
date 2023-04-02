import { React, useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../utils/url';
import * as yup from 'yup';

/*

    FORM
        name of the project
        image
        description
        checkbox for the element to be displayed or not in the portfolio list
        website url (optional)
        Create button
        
*/

const projectSchema = yup.object({
	name: yup.string().required(),
	website: yup.string().url().nullable(),
	description: yup.string().nullable(),
});

const FormDiv = styled.div`
	height: 85vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

function validateSize(size) {
	const fileSize = size / 1024 / 1024; // in MiB
	return fileSize > 2;
}

function Homepage() {
	const [entryState, setEntryState] = useState({});

	const createEntry = async (formData) => {
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
			await axios.post(`${BASE_URL}/api/portfolio`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			setEntryState({});
			alert('Project has been added successfully');
		} catch (error) {
			alert('Entry Upload Error');
		}
	};

	const handleCreateEntry = async (e) => {
		try {
			e.preventDefault();
			await projectSchema.validate({
				name: entryState.name,
				description: entryState.description,
				website: entryState.website,
			});
			const formData = new FormData();
			Object.entries(entryState).forEach(([key, value]) => {
				formData.append(key, value);
			});
			await createEntry(formData);
		} catch (error) {
			alert(error.message || error);
		}
	};

	return (
		<div>
			<FormDiv>
				<Form
					onSubmit={handleCreateEntry}
					style={{
						width: `${40}em`,
						margin: '0 auto',
						padding: `${28}px`,
						border: '1px solid #ced4da',
						borderRadius: `${8}px`,
					}}
				>
					<Form.Group className='mb-3' controlId='nameInput'>
						<Form.Label>Name of the project</Form.Label>
						<Form.Control
							placeholder="Jane's Website"
							required
							value={entryState.name || ''}
							onChange={(e) =>
								setEntryState((prevState) => {
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
							accept='image/png, image/jpeg'
							required
							onChange={(e) =>
								setEntryState((prevState) => {
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
							value={entryState.description || ''}
							maxLength={100}
							style={{ resize: 'none' }}
							onChange={(e) =>
								setEntryState((prevState) => {
									return { ...prevState, description: e.target.value };
								})
							}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='checkboxInput'>
						<Form.Label>Project Visibility</Form.Label>
						<Form.Check
							type='checkbox'
							id='visibilityCheckbox'
							label='Display the entry in the portfolio list?'
							onChange={(e) =>
								setEntryState((prevState) => {
									return { ...prevState, visibility: e.target.checked };
								})
							}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='websiteInput'>
						<Form.Label>Project Website Reference</Form.Label>
						<Form.Control
							placeholder='https://www.example.com/'
							value={entryState.website || ''}
							onChange={(e) =>
								setEntryState((prevState) => {
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
							Create
						</Button>
					</div>
				</Form>
			</FormDiv>
		</div>
	);
}

export default Homepage;
