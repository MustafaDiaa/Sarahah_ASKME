# Sarahah_ASKME
A clone for Sarahah App in which user can anonymously send message to existing users in database.
Built using Node.js, Express, Mongoose and tested with Postman.
Made consideration to the code readability and folder structure.

Authentication/Authorization using jsonwebtoken.
Password hashed using bcryptjs.
File upload using Multer, with some modification to add more customization to the folder path to be more dynamic. In which someone can save the uploaded files to any specified custom path.

The app has applied many concepts like:
1- Authentication/Authorization Middleware
2- Global Error Handling
3- Global Validation
4- Multer
and more..

- User can signup
- User can login
- User can confirm email
- User can request new confirm email
- User can update password
- User can share profile
- User can view profile
- User can send message
- User can delete message
- User can upload profile picture
