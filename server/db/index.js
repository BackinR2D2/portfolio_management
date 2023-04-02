const options = {
	client: 'pg',
	version: '7.2',
	connection: {
		user: process.env.PG_USER,
		host: process.env.PG_HOST,
		database: process.env.PG_DATABASE,
		password: process.env.PG_PASSWORD,
		port: process.env.PG_PORT,
	},
};

const knex = require('knex')(options);

knex.schema.hasTable('portfolio').then(function (exists) {
	if (!exists) {
		return knex.schema.createTable('portfolio', function (t) {
			t.increments('id').primary();
			t.text('name');
			t.text('description');
			t.text('website');
			t.boolean('visibility').notNullable();
			t.text('image_filename').unique().notNullable();
			t.text('image_filepath').notNullable();
			t.bigint('image_size').notNullable();
			t.timestamp('created_at', { precision: 6 })
				.defaultTo(knex.fn.now(6))
				.notNullable();
		});
	}
});

module.exports = knex;
