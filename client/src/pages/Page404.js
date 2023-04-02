import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Page404Div = styled.div`
	text-align: center;
	margin-top: 12em;
`;

const Page404Paragraph = styled.p`
	font-size: 20px;
	font-weight: 200;
`;

function Page404() {
	return (
		<Page404Div>
			<h2>404, Page not found</h2>
			<Page404Paragraph>
				Here is a link to the index page:{' '}
				<Link to={'/'}>{window.location.origin}</Link>
			</Page404Paragraph>
		</Page404Div>
	);
}

export default Page404;
