# Simple pastebin API

# Installation steps
1. cd to root folder and run the following commands
Install dependencies
```bash
 npm install
```


# Publisher Endpoint
1. POST - http://localhost:4000/api/v1/publisher/{topic}
# Subscriber 1 Endpoint
2. POST - http://localhost:4001/api/v1/subscribe/{topic}
# Subscriber 2 Endpoint
3. POST - http://localhost:4002/api/v1/subscribe/{topic}

# Note
This application depends on redis. However, if you have docker installed, a docker compose file is already included in the project. Running the shell script will automatically start up the redis server on docker.

# Author
Anyaso Franklin <br />
franko172000@gmail.com



