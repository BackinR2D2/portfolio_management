import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import BASE_URL from '../../utils/url';

function ProjectsNotDisplayedModal({
	notDisplayedProjects,
	show,
	setShow,
	setNotDisplayedProjects,
	setData,
}) {
	const handleClose = () => setShow(false);

	const handleProjectDisplay = async (projectID) => {
		try {
			const { data } = await axios.put(`${BASE_URL}/api/project/${projectID}`, {
				visibility: true,
			});
			setNotDisplayedProjects(data.notDisplayedProjects);
			setData(data.displayedProjects);
			alert('Project Updated Successfully');
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
				size='lg'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Projects Not Displayed</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Project Name</th>
								<th>Display</th>
							</tr>
						</thead>
						<tbody>
							{notDisplayedProjects.map((notDisplayedProject, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{notDisplayedProject.name}</td>
									<td>
										<Button
											variant='link'
											style={{ padding: 0 }}
											onClick={() => {
												handleProjectDisplay(notDisplayedProject.id);
											}}
										>
											Display Project
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ProjectsNotDisplayedModal;
