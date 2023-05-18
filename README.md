
## Lifepack Backend Test

Lifepack backend test

### Prerequisite

* [Node.Js](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.


### Folder Structure

Folder structure is sorted by application flow from inbound from infrastructure until service and repository for each domain

### Install Dependecies

Run `npm install` to install dependencies required that state on package.json

### Migrate db
Run `npx prisma migrate dev` to generate table from prisma schema

### Seeding Dummy Data

Run `npx prisma db seed` to generate dummy data for development

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:5000/`.

### API list via POSTMAN
https://documenter.getpostman.com/view/10484939/2s93kz65Dz

### DB Stucture
DB Structure:
![Alt text](/assets/db.png)
Explanation: [Here](https://docs.google.com/document/d/1dZiRJLnwXk9LJwMUXVjRUUxwk9us9biJQuAZEFwat5Y/edit?usp=sharing).



