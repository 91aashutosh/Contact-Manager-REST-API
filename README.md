# Contact-Manager-REST-API
This project is a contact management REST API backend application built using Express and MongoDB.

# Collections in database
The application has two collections, one for users and the other for contacts. The user collection stores user details such as name, email, and password. The contacts collection stores contact details such as email, username, and phone number, along with a user ID as a reference to the user who added the contact.

# API endpoints
The application has four main API endpoints: 
- /api/users/register endpoint allows users to register for the application. When a user registers, the function checks if the request body has all the mandatory 
  fields. If it does, it uses the bcrypt package to hash the password and then stores the email, hashed password, and user name in the user model.
- /api/login endpoint allows users to log in to the application. When a user logs in, the function checks if the request body has all the mandatory fields. If it 
  does, it checks if the email and password match the document in the user model using bcrypt.compare method. If the email and password match, it uses the jwt 
  package to create a token jwt.sign() it takes three arguments user object with id, name, and email, secret key and expiry for the token and then returns the 
  token using res.json(token). 
- /api/users/current (can only be accessed by authorized user).
- /api/contacts and /api/contacts/:id endpoints use for get, update, delete user contact (can only be accessed by authorized user).

# Middlewares
The application has two middleware:
- Error-Handler (The error handling middleware function has error handled for status codes 400, 401, 403, 404, 500).
- Token-Validation.

# Modules/Libraries
- JSON Web Tokens (JWT).
- bcrypt
- dotenv
- express
- express-async-handler
- mongoose

# Conclusion
To run the application, you will need to install these packages and configure the .env file with the MongoDB connection string and the secret key for JWT token generation. Then, you can run the application using node server.js or nodemon server.js.

Overall, this contact manager REST API backend application provides a secure and efficient way for users to manage their contacts.


