# Phonebook Backend

This is the backend for a simple phonebook application. It provides RESTful API endpoints for managing contacts.

## Live Demo
Check out the [live demo of our Phonebook application](https://site-arum.onrender.com)

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Features

- Get all contacts
- Get a single contact by ID
- Add a new contact
- Delete a contact
- Filter contacts

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)


## Usage

Once the server is running, you can use tools like curl, Postman, or your frontend application to interact with the API endpoints.

## API Endpoints

- `GET /api/persons`: Get all contacts
- `GET /api/persons/:id`: Get a single contact by ID
- `POST /api/persons`: Add a new contact
- `DELETE /api/persons/:id`: Delete a contact
- `GET /info`: Get information about the phonebook

## Built With

- [Express.js](https://expressjs.com/) - Web application framework
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware
- [CORS](https://github.com/expressjs/cors) - Cross-Origin Resource Sharing middleware

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

For more information or to report issues, please visit the [project repository](https://github.com/KingsCreatives/University-of-Helsinki.git).