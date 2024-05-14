import * as envVars from './src/config/env.js';
import connectDB from './src/config/mongoose.js';
import app from './src/config/express.js';


const start = async () =>{
    // Connect to MongoDB database
    await connectDB();
    const port = envVars.port || 3000;
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
}

start();