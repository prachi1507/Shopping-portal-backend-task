<h1>Shopping Portal with RESTful API using node.js and express</h1>

NOTES
-------
1. PORT=5000: This variable specifies the port number on which your Node.js server will listen for incoming HTTP requests. In this case, the server will listen on port 5000.<br>
2. JWT_EXPIRE=7d: This variable specifies the expiration time for JWTs issued by your application. In this case, JWTs will expire after 7 days.

3. COOKIE_EXPIRE=7: This variable specifies the expiration time for cookies set by your application. In this case, cookies will expire after 7 days.

dbConnection.js
----------------
1. mongoose.connect() method to establish a connection to the MongoDB database.

2. The process.env.DB_URI variable contains the URI of the MongoDB database, which is obtained from the environment variables.

3. The dbName option specifies the name of the database to use (SHOPPING-PORTAL-API).

4. If the connection is successful, it logs a success message to the console.

5. If an error occurs during the connection process, it logs an error message to the console.

6. This function can be called to establish the database connection when the application starts up.

7. It's important to ensure that the DB_URI environment variable is properly configured with the correct MongoDB connection URI.


Command for downloading express:
--------------------------------------

npm install express

This command will download the latest version of Express.js and add it to your project's dependencies in the package.json file. Additionally, it will create a node_modules directory in your project folder where Express.js and its dependencies will be stored.



Notes of middewares: 
---------------------
Middlewares can handle errors that occur during request processing. By placing error-handling middleware at the end of the middleware chain, you can catch and handle errors that occur in route handlers or other middleware functions.


---------------------------------
error.js
------------
1. ErrorHandler Class:This class extends the built-in Error class in JavaScript.

2. It has a constructor that accepts two parameters: message and statuscode.

3. The super(message) call inside the constructor initializes the error message using the Error class constructor.

4. It assigns the statuscode parameter to the statuscode property of the error object.

5. errorMiddleware Function:This function is an error middleware that handles errors in the application.

6. It takes four parameters: err (the error object), req (the request object), res (the response object), and next (the next middleware function).

7. Inside the function:It sets a default error message to "Internal Server Error" if the error object doesn't have a message property.

8. It sets a default status code to 500 (Internal Server Error) if the error object doesn't have a status code property.

9. It sends a JSON response with the error status code and message to the client using res.status().json() method.

10. The response includes success: false and the error message (message property of the error object).

11. Exporting the ErrorHandler Class:The ErrorHandler class is exported as the default export of the module.


auth.js
--------------
1. It verifies the JWT token using the secret key (JWT_SECRET_KEY).

2. It retrieves the user information from the database based on the user ID decoded from the token.

3. It attaches the user object to the request object (req.user).

4. It calls the next middleware function in the chain using the next() function.

