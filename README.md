# Shokli - a url shorterner service
# Full Stack React, Express, MongoDB, NodeJs application
Author : 
<p>
  <a href="https://twitter.com/@Zed_Developer" target="_blank">
  <img alt="Twitter: ryanchenkie" src="https://img.shields.io/twitter/follow/Zed_Developer.svg?style=social" />
  </a>
</p>

The site is adopted and built around the the React Security Orbit course by Ryan Chenkie
<p>
  <a href="https://twitter.com/ryanchenkie" target="_blank">
    <img alt="Twitter: ryanchenkie" src="https://img.shields.io/twitter/follow/ryanchenkie.svg?style=social" />
  </a>
</p>

### About
A simple url shortener service. Allows users to register on platform, login to a dashboard, submit a short link for url or
have the backend create a short link, have the visits to short link tracked, view stats on dashboard, view other users and 
their shortlinks, get rewarded for creating links, interacting on platform and sharing other users links on Twitter 

# Development Project

### Deployment

App is deployed to heroku https://boiling-temple-54489.herokuapp.com/

### Technology Stack and Tools

* [BCrypt](https://www.npmjs.com/package/bcrypt) - library for hasing passwords
* [Express](https://www.npmjs.com/package/express) - web app framework for nodejs eg for creating http servers
* [Helmet](https://www.npmjs.com/package/helmet) - security for express apps 
* [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken) - library for managing JSON web tokens
* [JWTDecode](https://www.npmjs.com/package/jwt-decode) - decode Nase64URL encoded JSON Web Tokens
* [Mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modelling tool
* [React, React Hooks, Context API](https://www.npmjs.com/package/react) - front end javascript library with hooks into react state 
* [MongoDB](https://www.npmjs.com/package/mongodb) - driver for nodejs to document based database MongoDB
* [CreateReactApp](https://www.npmjs.com/package/create-react-app) - quickly boostrap react apps  
* [Formik](https://www.npmjs.com/package/formik) - library for building forms


### Installation / copying project from online repo

Clone the project 

```sh
$ git clone https://github.com/MatricksDeCoder/shonkli
```

##### Folder / Directory Structure
* client
  * public 
  * src
    * components
    * context
    * images
    * pages
    * util
  * server
    * controllers
    * middleware
    * routes
    * utils
    ...
  

Install dependancies
```sh
$ npm install 
cd client 
npm install
```

## Set Up the Environment Files

The root must have file called `.env`.
This file has  variable called `MONGO_URL` provide connection to your MONGODB cluster 
This file has another variable `JWT_SECRET` variable, provide a random long secret.
........


## Running Application

The React app is built with **create-react-app**. Run it with the script provided in its **package.json** file.
See root level package.json file for all teh startup scripts e.g starting server only, starting client only, 
starting client and server concurently 

E.g below will run client and server thanks to concurrently 
```bash
cd client
npm run dev 
```

The server will be running at `http://localhost:5000`. Client will be running at `http://localhost:3000`


## License

MIT

# shonkli
