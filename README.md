# StackNotes — MERN Stack Note-Taking Application

* **Repository Identifier**: `cohort-9-mern-15335-javaria`
* **Program Context**: Developed as part of the 10Pearls Shine Internship Program (Cohort 9).
* **Project Description**: A comprehensive, full-stack note-taking web application engineered to provide secure user sessions, granular category organization, priority note pinning, and seamless text file import/export utilities.
* **Tech Stack**: React, Express.js, Node.js, MongoDB Atlas, Pino logging, and Tailwind CSS.

## Architectural Overview & Tech Stack

* **Frontend**: Built with React and styled using Tailwind CSS for a modern, responsive user interface.
* **Backend**: Powered by Node.js and Express.js to handle API routing, middleware execution, and controller logic.
* **Database**: Integrated with MongoDB Atlas for scalable cloud-based document storage and retrieval.
* **Logging & Monitoring**: Implemented with Pino logging to track server events, execution states, and application health.

## Key Features & Capabilities

* **Secure Authentication**: Robust user registration and login workflows ensuring isolated data per user account.
* **Granular Organization**: Dynamic category filtering, real-time search functionality, and priority note pinning to keep important tasks visible.
* **Data Management (Import/Export)**: Built-in capabilities allowing users to export their notes as local text files or import existing text files back into their account ledger.
* **Automated Code Quality & Testing**: Configured with dedicated test suites and structured logging pipelines for enhanced reliability.

## Project Structure

```text
cohort-9-mern-15335-javaria/
│
├── backend/
│   ├── connection/    # MongoDB Atlas database connection
│   ├── schemas/       # Mongoose database schemas (Users, Notes, Categories)
│   ├── routes/        # Express API routers for authentication and notes
│   ├── functions/     # REST APIs request functions (POST vs GET)
│   ├── middleware/    # Auth verification and error logging (Pino)
│   └── server.js      # Entry point for the Express application
│
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI components (Sidebar, NoteCard, Modals)
│   │   ├── __tests__/              # Test componenets using Jest for seamless UX
│   │   ├── Auth/                   # React Authorization components i.e SignUp and SignIn
│   │   └── data/                   # Dropdown sorting options 
│   │   └── additional-features/    # Added Import File and Download File features 
│   └── package.json
│   └── package-lock.json
│
└── README.md
```

# Getting Started & Local Installation
## Clone the repository

* git clone [https://github.com/your-username/cohort-9-mern-15335-javaria.git](https://github.com/your-username/cohort-9-mern-15335-javaria.git)
* cd cohort-9-mern-15335-javaria

## Backend Configuration & Setup:
* **Navigate to the backend directory:**: 
cd backend
npm install

`Create a .env file in the backend directory and configure your environment variables:`
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret

`Start the backend development server:`
npm run dev

## Frontend Configuration & Setup:
* **Open a new terminal window, navigate to the frontend directory, and install dependencies:**
cd frontend
npm install

`Create a .env file in the frontend directory if necessary for API base URLs:`
VITE_API_URL=http://localhost:5000/api

`Start the frontend development server:`
npm run dev

## API Endpoints (`/api`)

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/save-user` | Register new user | No |
| `POST` | `/login-user` | Authenticate & receive JWT | No |
| `GET` | `/verify` | Verify an existing session so user does not have to login again and again | Yes |
| `POST` | `/logout` | Logs out a user | No |
| `POST` | `/create-note` | Creates note by using authenticate middleware | Yes |
| `GET` | `/user-notes` | Get user notes based on userId | Yes |
| `POST` | `/pin-note/:noteId` | Pins a Note based on userID | Yes |
| `PUT` | `/delete-note/:noteId` | Toggles isDeleted to manage Trash box on UI | Yes |
| `PUT` | `/edit-note/:noteId` | Save the edited note | Yes |
| `PUT` | `/archive-note/:noteId` | Handles the archived vs unarchved through toggle logic | Yes |
| `DELETE` | `/permanent-delete/:noteId` | Permanently deletes the note from database note | Yes |
| `GET` | `/categories` | Gets all categories based on userId | Yes |
| `POST` | `/save-category` | Saves a category based on userId | Yes |

---

## Testing

* **Backend**: Tested with Mocha, Chai, and Sinon across services and controllers.
* **Frontend**: Tested with Jest for route guards, page behaviors, and editor states.

# Author
## Javaria Rizwan

