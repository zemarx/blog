## Blog
Blog made with Node.js, Koa, Angular2 and Auth0

## Server setup
You need to get url to mongodb database
and put it to file server/config/config.js

## Client setup
You need to create a Auth0 account, create an application
in your Auth0 account and get the needed data to client/app/services/auth.service.ts

## Development
For develompemnt, open two terminal. In the first one, go to client folder and execute 'npm start' to start the client
on the lite-server.
In the second terminal go to server folder and execute 'npm start' to start the server with REST API.