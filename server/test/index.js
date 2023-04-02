const server = require('../server');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const fs = require('fs');

chai.should();
chai.use(chaiHTTP);
const { expect } = chai;

describe('Portfolio API', () => {
	describe('GET /api/portfolio', () => {
		it('It should return all the projects', (done) => {
			chai
				.request(server)
				.get('/api/portfolio')
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					done();
				});
		});
	});

	describe('POST /api/portfolio', () => {
		it('It should return 200 and create a project entry with single image upload', async () => {
			const res = await chai
				.request(server)
				.post('/api/portfolio')
				.set('content-type', 'multipart/form-data')
				.field('name', 'High School Project')
				.field('description', 'Project about my favourite subjects')
				.field('visibility', 'true')
				.field('website', 'https://highschoolproject.com')
				.attach(
					'projectImage',
					fs.readFileSync(`${__dirname}/test.png`),
					'test/test.png'
				);
			expect(res.status).to.equal(200);
		});
	});
});
