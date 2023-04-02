import { React, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import styled from 'styled-components';
import BASE_URL from '../utils/url';
import Loader from '../components/loader/Loader';
import { Container, Card, Button, Form, ListGroup } from 'react-bootstrap';
import './portfolio.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectsNotDisplayedModal from '../components/projectsNotDisplayedModal/ProjectsNotDisplayedModal';
import EditProjectModal from '../components/editProjectModal/EditProjectModal';

const ErrorMessage = styled.div`
	text-align: center;
	margin-top: 8em;
	font-size: 24px;
	font-weight: 100;
`;

const PortfolioContainerDiv = styled.div`
	margin: 2em;
	text-align: center;
`;

const PortfolioDiv = styled.div`
	display: grid;
	grid-gap: 1rem;
	margin: 4em 2em 2em 2em;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const NotDisplayedParagraph = styled.p`
	margin: 2em 6px 6px 6px;
	font-size: 18px;
`;

const ProjectsNotFoundDiv = styled.div`
	font-size: 24px;
	font-weight: 100;
`;

function Portfolio() {
	const [data, setData] = useState(null);
	const [notDisplayedProjects, setNotDisplayedProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [show, setShow] = useState(false);
	const [editProjectID, setEditProjectID] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editProjectData, setEditProjectData] = useState({});

	const getData = async () => {
		setLoading(true);
		axios(`${BASE_URL}/api/portfolio`)
			.then((res) => {
				setData(res.data.projects);
				setNotDisplayedProjects(
					res.data.projects.filter((element) => !element.visibility)
				);
			})
			.catch(() => {
				setError('Server Error. Try again later :(');
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getData();
	}, []);

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-GB');
	};

	const handleNotDisplayedProjects = (projects) => {
		setShow(true);
	};

	const handleDeleteProject = async (id) => {
		try {
			await axios.delete(`${BASE_URL}/api/portfolio/${id}`);
			setData(data.filter((element) => element.id !== id));
			alert('Project has been removed successfully');
		} catch (error) {
			alert(error);
		}
	};

	const handleProjectDisplay = async (projectID) => {
		try {
			const { data } = await axios.put(
				`${BASE_URL}/api/project/hide/${projectID}`,
				{
					visibility: true,
				}
			);
			setNotDisplayedProjects(data.notDisplayedProjects);
			setData(data.displayedProjects);

			alert('Project Updated Successfully');
		} catch (error) {
			alert(error);
		}
	};

	const handleEditProject = async (projectID) => {
		setEditProjectData(
			data.find((editProject) => editProject.id === projectID)
		);
		setShowEditModal(true);
		setEditProjectID(projectID);
	};

	return (
		<div>
			{loading && <Loader />}
			{data && (
				<Container>
					<PortfolioContainerDiv>
						<h2 className='header'>Portfolio</h2>
						<div className='projectsNotDisplayed'>
							{notDisplayedProjects.length === 1 ? (
								<div>
									<NotDisplayedParagraph>
										There is 1 project that is not displayed. Click here to edit
										his state:{' '}
									</NotDisplayedParagraph>
									<Button
										variant='link'
										style={{ fontSize: `${18}px`, textTransform: 'capitalize' }}
										onClick={() =>
											handleNotDisplayedProjects(notDisplayedProjects)
										}
									>
										here
									</Button>
									<hr />
								</div>
							) : notDisplayedProjects.length > 1 ? (
								<div>
									<NotDisplayedParagraph>
										There are {notDisplayedProjects.length} projects that are
										not displayed. Click here to edit their state:{' '}
									</NotDisplayedParagraph>
									<Button
										variant='link'
										style={{ fontSize: `${18}px`, textTransform: 'capitalize' }}
										onClick={() =>
											handleNotDisplayedProjects(notDisplayedProjects)
										}
									>
										here
									</Button>
									<hr />
								</div>
							) : (
								<></>
							)}
						</div>
						<PortfolioDiv className='portfolio'>
							{data.filter((project) => project.visibility).length === 0 ? (
								<ProjectsNotFoundDiv>
									No projects found, try creating one from the{' '}
									<Link to={'/'}>homepage</Link>.
								</ProjectsNotFoundDiv>
							) : (
								<>
									{data.map((element, index) =>
										element.visibility ? (
											<Card
												className='projectCard'
												style={{ width: '18rem', margin: '0 auto' }}
												key={index}
											>
												<Card.Img
													variant='top'
													height={`${180}px`}
													width={`${100}%`}
													style={{ objectFit: 'contain' }}
													src={`${BASE_URL}${element.image_filepath}`}
												/>
												<Card.Body
													style={{
														display: 'flex',
														justifyContent: 'center',
														flexDirection: 'column',
													}}
												>
													<Card.Title>{element.name}</Card.Title>
													{element.description ? (
														<>
															<Card.Subtitle className='mb-2 mt-2 text-muted'>
																{element.description}
															</Card.Subtitle>
														</>
													) : (
														<></>
													)}
													{element.website ? (
														<Card.Text>
															<a
																href={element.website}
																target='_blank'
																rel='noreferrer'
															>
																{element.website}
															</a>
														</Card.Text>
													) : (
														<></>
													)}
													<Card.Text>
														Created at: {formatDate(element.created_at)}
													</Card.Text>
													<ListGroup className='list-group-flush'>
														<ListGroup.Item>
															<Button
																variant='link'
																onClick={() => {
																	handleProjectDisplay(element.id);
																}}
															>
																Hide the Project
															</Button>
														</ListGroup.Item>
													</ListGroup>
													<Card.Footer
														className='text-muted footerButtons'
														style={{
															display: 'flex',
															flexDirection: 'column',
															gap: '1em',
														}}
													>
														<Button
															variant='primary'
															onClick={() => handleEditProject(element.id)}
														>
															Edit
														</Button>
														<Button
															variant='danger'
															onClick={() => handleDeleteProject(element.id)}
														>
															Delete
														</Button>
													</Card.Footer>
												</Card.Body>
											</Card>
										) : (
											<></>
										)
									)}
								</>
							)}
						</PortfolioDiv>
						<ProjectsNotDisplayedModal
							notDisplayedProjects={notDisplayedProjects}
							show={show}
							setShow={setShow}
							setNotDisplayedProjects={setNotDisplayedProjects}
							setData={setData}
						/>
						<EditProjectModal
							projectData={editProjectData}
							setShowEditModal={setShowEditModal}
							showEditModal={showEditModal}
							setData={setData}
						/>
					</PortfolioContainerDiv>
					<br />
				</Container>
			)}
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</div>
	);
}

export default Portfolio;
