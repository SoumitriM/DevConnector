const express = require('express');
const cors = require('cors');
const connectDB  = require('./db');
console.log(connectDB);
require("dotenv").config();
const app = express();
connectDB();
app.use(cors())
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
console.log(process.env.JWT_TOKEN);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));