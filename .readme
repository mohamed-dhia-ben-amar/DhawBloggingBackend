# DhawBlogging

## Install Dependencies

```bash
npm install
```

## Create .env File

Create a `.env` file in the root directory and add your environment variables:

```env
MONGO_URI=<your_mongodb_uri>
PORT=<your_port>
JWT_SECRET=<your_jwt_secret>
```

## Usage

To start the server, run:

```bash
npm start
```

Once the server is running, it will be available at:

```
http://localhost:<port>
```

### API Documentation

You can access the API documentation at:

```
http://localhost:<port>/api-docs
```

This documentation provides detailed information about all available endpoints, including request parameters and responses.

## Routes

### Users

#### Register a New User

**POST** `/users/signup`

```bash
curl -X POST http://localhost:<port>/users/signup -d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}'
```

#### Login a User

**POST** `/users/login`

```bash
curl -X POST http://localhost:<port>/users/login -d '{
  "email": "john@example.com",
  "password": "password123"
}'
```

#### Reset a User's Password

**POST** `/users/reset-password`

```bash
curl -X POST http://localhost:<port>/users/reset-password -d '{
  "email": "john@example.com"
}'
```

#### Verify a User's Email

**GET** `/users/verify-email`

```bash
curl -X GET http://localhost:<port>/users/verify-email?token=<verification_token>
```

#### Logout a User

**POST** `/users/logout`

```bash
curl -X POST http://localhost:<port>/users/logout
```

### Posts

#### Create a New Post

**POST** `/posts/create`

```bash
curl -X POST http://localhost:<port>/posts/create -d '{
  "title": "New Post",
  "content": "This is a new post."
}'
```

#### Get All Posts

**GET** `/posts`

```bash
curl -X GET http://localhost:<port>/posts
```

#### Get a Post by ID

**GET** `/posts/{id}`

```bash
curl -X GET http://localhost:<port>/posts/<id>
```

#### Update a Post by ID

**PUT** `/posts/{id}`

```bash
curl -X PUT http://localhost:<port>/posts/<id> -d '{
  "title": "Updated Post",
  "content": "Updated content."
}'
```

#### Delete a Post by ID

**DELETE** `/posts/{id}`

```bash
curl -X DELETE http://localhost:<port>/posts/<id>
```

#### Like or Unlike a Post by ID

**PUT** `/posts/{id}/like`

```bash
curl -X PUT http://localhost:<port>/posts/<id>/like
```

### Comments

#### Create a New Comment

**POST** `/comments`

```bash
curl -X POST http://localhost:<port>/comments -d '{
  "postId": "<post_id>",
  "content": "This is a comment."
}'
```

#### Get All Comments

**GET** `/comments`

```bash
curl -X GET http://localhost:<port>/comments
```

#### Get a Comment by ID

**GET** `/comments/{id}`

```bash
curl -X GET http://localhost:<port>/comments/<id>
```

#### Update a Comment by ID

**PUT** `/comments/{id}`

```bash
curl -X PUT http://localhost:<port>/comments/<id> -d '{
  "content": "Updated comment."
}'
```

#### Delete a Comment by ID

**DELETE** `/comments/{id}`

```bash
curl -X DELETE http://localhost:<port>/comments/<id>
```

## License

This project is licensed under the [MIT License](./LICENSE).

---