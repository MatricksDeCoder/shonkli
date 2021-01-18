# Simple URL shortener site

Author : 
<p>
  <a href="https://twitter.com/@Zed_Developer" target="_blank">
  <img alt="Twitter: ryanchenkie" src="https://img.shields.io/twitter/follow/Zed_Developer.svg?style=social" />
  </a>
</p>

A simple URL shortener site using React, MongoDB, Express, NodeJs and Authentication and security topics

The site is adopted and built around the the React Security Orbit course by Ryan Chenkie
<p>
  <a href="https://twitter.com/ryanchenkie" target="_blank">
    <img alt="Twitter: ryanchenkie" src="https://img.shields.io/twitter/follow/ryanchenkie.svg?style=social" />
  </a>
</p>

## Install Dependencies for both the client and the server. 

Ensure you change directories into each of the folders 

With **npm**:

```bash
npm install
cd client
npm install
```

## Set Up the Environment Files

The root  contains a file called `.env`.
This file has a variable called `MONGO_URL` provide connection to your MONGODB cluster 
This file has another variable `JWT_SECRET` variable, provide a random long secret.
.........

The client has a .env file  
This file has a variable called `REACT_APP_API_URL` which is used to connect to the backend. 


## Running Application

The React app is built with **create-react-app**. Run it with the script provided in its **package.json** file.

```bash
cd client
npm start
```

Run the client and or server using scripts see root level package.json 
```bash
npm run dev
```

The server will be running at `http://localhost:5000`.

Navigate to `http://localhost:3000` to see the app running!

## License

MIT

# shonkli
