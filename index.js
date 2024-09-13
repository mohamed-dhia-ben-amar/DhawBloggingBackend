require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173", // Frontend origin
    credentials: true // This ensures cookies are sent
};
app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enabling debug mode for mongoose
mongoose.set('debug', true);

// Setting the global Promise library
mongoose.Promise = global.Promise;

// Connecting to the MongoDB database
mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`)
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch((error) => {
        console.log(error);
    });

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/comments', require('./routes/commentRoutes'));

// Serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Main route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;