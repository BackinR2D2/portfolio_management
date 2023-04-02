# Back-end Configurations

- PSQL was used to create the database, log into the CLI and run the command:

`CREATE DATABASE portfolio_management`

- For production we would use a 3rd party API service, such as AWS S3 Buckets to store the image files in the cloud

- For the postgres database to run properly there is a .env file that must be created. The model of the .env file structure can be found in the .env.example file in the server folder.

- On the initial render of the back-end application, you should run `npm install` to configure the server
