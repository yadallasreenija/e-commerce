const app = require('./app');
const connectDB = require('./db/db');

console.log("Starting server...");

process.on('uncaughtException', (error) => {
    console.log(`Server shutting down: ${error.message}`);
    process.exit(0);
});

if (process.env.NODE_ENV !== 'PRODUCTION')
    require('dotenv').config({ path: 'config/.env' });

console.log("Loading environment variables...");

connectDB()
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server successfully listening at http://localhost:${PORT}`);
});
