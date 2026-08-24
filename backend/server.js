const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const {
    notFound,
    errorHandler,
} = require("./middleware/errorHandler");

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});