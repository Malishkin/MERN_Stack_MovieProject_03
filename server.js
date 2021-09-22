const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')



const app = express();
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/members', require('./routes/api/members'));
app.use('/api/subscriptions', require('./routes/api/subscriptions'));


app.get('/', (req, res) => res.send('API Running'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));