# File Upload Backend

Minimal Express backend for uploading images/videos to Cloudinary and storing metadata in MongoDB.

## Overview
This project accepts file uploads (via multipart/form-data), uploads them to Cloudinary, and persists metadata in MongoDB.

Key entry points:
- Server bootstrap: [index.js](index.js)
- Cloudinary setup: [`cloudinary.cloudinaryConnect`](config/cloudinary.js) ([config/cloudinary.js](config/cloudinary.js))
- Database connect: [`connect`](config/database.js) ([config/database.js](config/database.js))
- Upload controller: [`imageSizeReducer`](controllers/fileUpload.js) and upload logic in [controllers/fileUpload.js](controllers/fileUpload.js)
- Route mounting: [routes/FileUpload.js](routes/FileUpload.js)
- Mongoose model: [`File`](model/File.js) ([model/File.js](model/File.js))

## Features
- File upload handling via `express-fileupload`
- Cloudinary integration for storage (`config/cloudinary.js`)
- MongoDB persistence for file metadata (`model/File.js`)
- Simple API route at `/api/v1/upload` (see [routes/FileUpload.js](routes/FileUpload.js))

## Requirements
- Node.js (v14+ recommended)
- npm
- Cloudinary account
- MongoDB connection (Atlas or local)

## Installation
1. Clone repo and install dependencies:
```sh
npm install
