# Wanderlust — Travel Listings Web App

![Repo size](https://img.shields.io/github/repo-size/Sahil-1341/Wanderlust-Travel-Listings-Web-App) ![License](https://img.shields.io/github/license/Sahil-1341/Wanderlust-Travel-Listings-Web-App) ![Latest commit](https://img.shields.io/github/last-commit/Sahil-1341/Wanderlust-Travel-Listings-Web-App/main)

A simple, server-rendered travel listings application built with Node.js, Express and MongoDB. Wanderlust provides a small platform for creating, viewing and reviewing travel listings (e.g., villas, apartments, experiences) with user authentication and sessions.

> Note: This README was created from the repository layout and main server file (`app.js`). See the linked files for implementation details: `app.js`, `schema.js`, and `cloudConfig.js`.

Table of contents
- [What this project does](#what-this-project-does)
- [Why it’s useful](#why-its-useful)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
  - [Requirements](#requirements)
  - [Install](#install)
  - [Environment variables](#environment-variables)
  - [Run locally](#run-locally)
- [Development notes & structure](#development-notes--structure)
- [Usage examples](#usage-examples)
- [Snapshot](#snapshot)
- [Where to get help](#where-to-get-help)
- [Maintainers & contributing](#maintainers--contributing)
- [License](#license)

What this project does
----------------------
Wanderlust is a minimal travel listings web app that lets users:
- Create and browse travel listings (title, description, price, location, country, etc.)
- Register and authenticate with local accounts (Passport + express-session)
- Add reviews to listings
- Persist data in MongoDB (the app expects a MongoDB Atlas connection string by default)
- Render pages using EJS templates

Why it’s useful
---------------
- Small, approachable codebase for learning full-stack Node/Express patterns
- Demonstrates:
  - Session-based authentication (Passport)
  - MongoDB/Mongoose for data models
  - Server-side rendering with EJS
  - Proper session store with connect-mongo
- Good starting point for adding REST APIs, client-side JS, or deployment targets

Tech stack
----------
- Node.js + Express
- MongoDB (Mongoose)
- EJS (server-rendered views)
- Passport (local strategy)
- connect-mongo (MongoDB-backed session store)
- Middleware: method-override, connect-flash, express-session
- Project structure uses directories: `routes/`, `models/`, `views/`, `public/`, `controllers/`

Quick start
-----------

Requirements
- Node.js (v16+ recommended)
- npm (or yarn)
- A MongoDB instance (Atlas recommended) — connection string required
- Optional: Cloudinary (or other storage) if file uploads are used (see `cloudConfig.js`)

Install
1. Clone the repository
   - git clone git@github.com:Sahil-1341/Wanderlust-Travel-Listings-Web-App.git
   - cd Wanderlust-Travel-Listings-Web-App
2. Install dependencies
   - npm install

Environment variables
Create a `.env` file in the project root (do not commit it). Minimum variables required by the server (as referenced in `app.js`):

```env
# MongoDB Atlas connection URI
ATLASDB_URL=mongodb+srv://<user>:<password>@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority

# Session secret for express-session & connect-mongo
SECRET=some-long-random-secret

# (optional) Set to "production" in production environments
NODE_ENV=development
```

Optional: If you intend to use cloud services (uploads, images), check `cloudConfig.js` and add any provider-specific variables (Cloudinary keys, etc.) to `.env`.

Run locally
- Start directly with Node:
  - node app.js
- Or use npm if you have start scripts configured:
  - npm start
- For development, consider using nodemon:
  - npx nodemon app.js

The app listens using the server code in `app.js`. By default it expects the DB connection string in `ATLASDB_URL`.

Development notes & structure
-----------------------------
Project top-level layout (key files and directories):

- app.js — main Express app and route mounting
- schema.js — (data/schema related code — check for model/schema definitions)
- cloudConfig.js — helper for cloud provider configuration (images/uploads)
- routes/ — route definitions (e.g., `routes/listing.js`, `routes/review.js`, `routes/user.js`)
- models/ — Mongoose models (e.g., `user.js`, listing/review models)
- controllers/ — controller functions for route handlers (if present)
- views/ — EJS templates used for server-side rendering
- public/ — static assets (CSS, client JS, images)
- utils/ — app utilities (e.g., `ExpressError.js`)
- middleware.js — centralized middleware utilities

See these files directly in the repo for implementation details:
- `app.js`
- `schema.js`
- `cloudConfig.js`
- `middleware.js`

Usage examples
--------------
Basic routes in this app (as mounted in `app.js`):
- GET /listings — view all listings
- GET /listings/:id — view a single listing
- POST /listings — create a listing (form)
- POST /listings/:id/reviews — add a review for a listing
- Authentication routes are mounted at `/` by `routes/user.js` (login, logout, register)

Example: curl to fetch listings page
```bash
curl http://localhost:3000/listings
```

Example: Run server and visit in browser
1. Start the app: `node app.js`
2. Open http://localhost:3000 in your browser

Screenshots
-----------

### Home Page
![Home Page](./Home%20Page%20Snapshot.png)

### Login Page
![Login Page](./Login%20Page%20Snapshot.png)

### Welcome Page (After Login)
![Welcome Page](./Welcome%20Page%20after%20login%20snapshot.png)

### Add New Listing
![Add Listing](./Adding%20new%20listing%20page%20snapshot.png)

### View, Rate & Comment
![Review Page](./view%2C%20rate%2C%20comment%20page%20snapshot.png)

Where to get help
-----------------
- File issues on this repository: open an Issue
- See top-level project files for inline documentation and comments
- For general usage of libraries used here consult their docs:
  - Express: https://expressjs.com/
  - Mongoose: https://mongoosejs.com/
  - Passport: http://www.passportjs.org/

Maintainers & contributing
--------------------------
Maintainer
- Sahil-1341 (repository owner)

Contributing
- If the repository has a `CONTRIBUTING.md` please follow it: `CONTRIBUTING.md`
- Otherwise:
  - Open an issue for bugs or feature requests
  - Fork the repo and open a pull request with a clear description of changes
  - Keep PRs focused and add basic tests or manual verification steps when applicable

Do not include large files or secrets in PRs. Add changes to `.env.example` or docs when adding new required environment variables.

License
-------
This repository contains a license file. See `LICENSE` for details.

Acknowledgements
----------------
This project is a compact learning-oriented app demonstrating common Express + MongoDB patterns (sessions, authentication, server-rendered views). See project files for implementation specifics.

---

If anything in your environment differs from the assumptions above (for example, if you use a local MongoDB instead of Atlas), adapt `ATLASDB_URL` to point to your local host (e.g., `mongodb://127.0.0.1:27017/wanderlust`).
