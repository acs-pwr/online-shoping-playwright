require('dotenv').config();
const path = require('path');
const Minio = require('minio');
const fs = require('fs').promises;
const sendNotification = require('./send-notification');

const minioClient = new Minio.Client({
    endPoint: process.env.URL_MINIO,
    port: parseInt(process.env.PORT_MINIO, 10),
    useSSL: true,
    accessKey: process.env.ACCESS_KEY_MINIO,
    secretKey: process.env.ACCESS_SECRET_MINIO,
});

const bucket = process.env.BUCKET_NAME;
const storeio_directory = process.env.STOREIO_DIRECTORY;

const folderPath = './report';

async function uploadFiles(filePath, destinationPath) {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
        // If it's a directory, read its contents and recursively upload
        const files = await fs.readdir(filePath);
        for (const file of files) {
            const nextFilePath = path.join(filePath, file);
            const nextDestinationPath = path.join(destinationPath, file);
            await uploadFiles(nextFilePath, nextDestinationPath); // Recursive call
        }
    } else {
        // If it's a file, upload it
        const metaData = {
            'Content-Type': 'text/html', // Change to the appropriate content type if necessary
        };
        await minioClient.fPutObject(bucket, destinationPath, filePath, metaData);
        console.log('File uploaded successfully: ' + destinationPath);
    }
}

async function main() {
    try {
        // Ensure the bucket exists
        const exists = await minioClient.bucketExists(bucket);
        if (!exists) {
            await minioClient.makeBucket(bucket, '');
            console.log(`Bucket ${bucket} created successfully.`);
        }

        await uploadFiles(folderPath, storeio_directory);

        const messageNotifUpload = 'Files uploaded successfully to:\n' + bucket + '/' + storeio_directory;
        sendNotification(messageNotifUpload);
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
