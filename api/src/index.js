import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        app.listen(5000);
        console.log('Server listening on port 5000.');
    } catch (err) {
        console.error("Unable to connect to the database: ", err);
    }
}

main();