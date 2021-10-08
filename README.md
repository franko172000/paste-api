# Simple pastebin API

### Installation steps
1. cd to root folder and run the following commands
Install dependencies
```bash
 npm install
```
2. Run migration
```bash
 npm run migration
```
### Start Application
Run the command bellow
```bash
 npm start
```

### Endpoint
#### User
* Register `/api/v1/user/register`
    * Method - POST
    * payload:
        * name - string
        * email - string
        * password - string
* Login `/api/v1/user/login`
    * Method - POST
    * payload:
      * email - string
      * password - string
#### Pastes
* Create content - `/api/v1/paste`
  * Method - POST
  * payload:
    * name - string
    * content - string
* Get content - `/api/v1/paste/:code`
  * Method - GET
  * Param:
    * code - string
* Get all user contents `/api/v1/paste`
  * Method - GET

* Authentication - Bearer `token`

### Tests
```bash
 npm run test
```

### Author
Anyaso Franklin <br />
franko172000@gmail.com



