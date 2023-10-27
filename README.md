# School Management System API

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Note](#testing)
- [Deployment](#deployment)

## About

School Management Application System is designed to facilitate the management of educational institutions. It enables users to perform basic CRUD (Create, Read, Update, Delete) operations on three main entities: School, Classroom, and Student. The application is tailored to the needs of administrators and superadmins.

- Superadmins have the ability to add and manage schools.
- School admins can manage classrooms and students within their respective schools.

## Getting Started

To use this application, follow these steps to set it up on your local machine.

### Prerequisites

Before you begin, make sure you have the following software and tools installed:

- Node.js
- npm (Node Package Manager)
- mongoDb
- Redis

### Installation

1. Clone the project repository:

   ```bash
   git clone https://github.com/mohamed-elzohery/School-management-system.git

   ```

2. Change into the project directory:

```bash
cd School-management-system/
```

3. copy the '.env.exmaple' to be '.env'. populate with real values for each.

```bash
cp .env.example .env
```

4. start the app.

```bash
npm start:dev
```

## Features

Learn about the key features of our School Management Application:

School Management: Superadmins can add, update, and delete schools.
Classroom Management: School admins can manage classrooms within their respective schools.
Student Management: School admins can manage student records within their schools.

## API Endpoints

[Swagger Link](https://school-api-lzib.onrender.com/api-docs/)

## Authentication

the system has one super-admin by default.

super-admin credentials

- email: admin
- password: admin

## Contributing

If you're interested in contributing to this project, please follow these guidelines:

1. Fork the repository
2. Make your changes
3. Submit a pull request

## Database

ERD of the system

![Entity Relationship diagram](https://i.ibb.co/7nZFxzw/Screenshot-from-2023-10-26-23-58-22.png)

Warning: when school is deleted all referred classrooms and admins of this school will be also deleted;

## Notes

We encourage reviewers to try our app in the natural flow of the system.

1. login with the super-admin credentials privided in [Authentication](authentication section).
2. use the returned token to create a school.
3. create a system user (admin) and assign it to the created school. see provided [api-endpoints](API Endpoints).
4. login with the created user to get the token.
5. use this admin token to manage classrooms and students of this admin's school.

## Deployment

See [live preview](https://school-api-lzib.onrender.com/api/)
