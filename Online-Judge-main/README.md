# Online Judge Platform

An advanced Online Judge Platform for coding practice sessions, designed to provide a seamless experience for users with features like multi-language support, role-based authorization, and secure code execution.

## Features

- **Hidden Test Cases**: Evaluate submissions with hidden test cases for unbiased testing.
- **Custom Input Section**: Allow users to test their code with custom inputs.
- **Multi-Language Support**: Run and evaluate programs in various programming languages.
- **JWT Authentication**: Secure user authentication and session management using JSON Web Tokens.
- **Role-Based Authorization**: Assign and control access levels for admins, moderators, and users.
- **Responsive User Interface**: A user-friendly interface built with React.
- **Real-Time Feedback**: Instant feedback on code submissions, including test case results.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker
- **HTTP Client**: Axios

## Installation

Follow these steps to run the project locally:


1. **Install Dependencies**:
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd ../client
     npm install
     ```
2. **Set Up Environment Variables**:
   Create `.env` files for the backend and frontend with the necessary configurations. 

3. **Run the Application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../client
     npm start
     ```

## Project Structure

```
Online-Judge/
│
├── client/          # Frontend application (React.js)
├── server/          # Backend application (Node.js, Express.js)
├── README.md        # Project documentation
└── .env.example     # Example environment variables
```


## Future Improvements which can be done:

- Add real-time collaboration features for coding contests.
- Extend support for additional programming languages.
- Integrate advanced analytics and performance tracking for users.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.


## Contact

For queries or support, reach out to **[Tanmoy Sarkar](mailto:tanmoysarkar46552@gmail.com)**.

---

⭐ **If you like this project, give it a star!**
