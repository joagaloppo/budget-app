import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
    try {
        await sequelize.sync( {force: false} );
        app.listen(5000);
        console.log('Server listening on port 5000.');
    } catch (err) {
        console.error("Unable to connect to the database: ", err);
    }
}

main();