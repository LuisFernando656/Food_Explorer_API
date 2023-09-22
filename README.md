# Food-Explorer-API

> Status: Finished

### Its a web api construct by me, where users and admins can use

## Some functionalities 

+ Create user (default, admin)
+ JWT authentication
+ Email validation, does not acepts duplicate emails
+ Password with minimum required characters
+ Custom App Error class
+ Authentication and EnsureAdmin middlewares
+ Database create whith knex seeds and migrations
+ Controllers and routes for all application functions
+ Upload images system with multer

## To use as dev

- first install the node modules with "npm install express --save"
- delete the database locate at "./src/database/database.db"
- to run the database write "npm run migrate" and "npm run seed"
- create a new .env file whith .env.example estructure and place the hash(JWT secret)
- now you read to use the api for development

## Tecnologies Used

<table>
  <tr>
    <td>bcryptjs</td>
    <td>cors</td>
    <td>dotenv</td>
    <td>express</td>
    <td>express-async-errors</td>
    <td>jsonwebtoken</td>
    <td>Knex</td>
    <td>multer</td>
    <td>pm2</td>
    <td>sqlite3</td>
  </tr>
  <tr>
    <td>2.4.3</td>
    <td>2.8.5</td>
    <td>16.3.1</td>
    <td>4.18.2</td>
    <td>3.1.1</td>
    <td>9.0.1</td>
    <td>2.5.1</td>
    <td>1.4.5-lts.1</td>
    <td>5.3.0</td>
    <td>5.1.6</td>
  </tr>
</table>

##  Dev Tecnologies Used

<table>
  <tr>
    <td>nodemon</td>
  </tr>
  <tr>
    <td>3.0.1</td>
  </tr>
</table>

## Deploy link

https://food-explorer-api-3su0.onrender.com