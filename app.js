const express = require('express');
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT;

app.post('/test-automation/run-test', (req, res) => {
    exec(`npm run test`, (error, stdout, stderr) => {
        if (error) {
            console.log(`ERROR_RUN_TEST: ${error.message}`);
        }
        if (stderr) {
            console.log(`STDERR_RUN_TEST: ${stderr}`);
        }
        console.log(`stdout success npm run test : ${stdout}`);

        exec(`npm run upload`, (uploadError, uploadStdout, uploadStderr) => {
            if (uploadError) {
                console.error(`exec error: ${uploadError}`);
            }
            console.log(`stdout: ${uploadStdout}`);
            
        });
    });
    
    res.json({ 
        responseCode: 200,
        message: "Test Playwright started. Check Report on Telegram and Object Storage." 
    });

    
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});