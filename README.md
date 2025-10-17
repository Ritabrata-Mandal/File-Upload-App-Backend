# File Upload App Backend 

One-line summary
A minimal, production-oriented Node.js backend for multipart file uploads (local or Cloudinary), with DB-agnostic metadata storage and optional email notifications.

Why this repo matters (interview talking points)
- Clean Express app (index.js) using express-fileupload for streaming/temp-file uploads.
- Cloudinary integration is initialized at startup (see config/cloudinary → cloudinaryConnect()) so uploads can be streamed to Cloudinary.
- Routes mounted at /api/v1/upload — single responsibility routing for upload flows.
- DB connection is initialized on boot (config/database), keeping storage and metadata separate.
- Designed to be pluggable: swap storage adapter (local, cloud) and add notification hooks.

Tech stack
- Node.js, Express
- express-fileupload (streaming + temp files)
- Cloudinary (cloud storage) — init called on startup
- DB-agnostic metadata (adapt model/*)
- (Optional) SMTP/nodemailer for post-upload emails — configure transport to enable notifications

Quickstart (3 steps)
1. clone && install
   git clone https://github.com/Ritabrata-Mandal/File-Upload-App-Backend.git
   cd File-Upload-App-Backend
   npm install
2. add .env (examples below)
3. run
   npm run dev

Essential env (minimum)
PORT=4000
NODE_ENV=development

# Cloudinary
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
# OR
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional email (nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
NOTIFY_FROM="App <no-reply@example.com>"

# File limits
MAX_FILE_SIZE_BYTES=10485760
ALLOWED_MIME_TYPES=image/jpeg,image/png,application/pdf

Core endpoints
- POST /api/v1/upload
  - multipart/form-data file=@file
  - returns metadata: { id, originalName, url, size, contentType }
- GET /api/v1/upload[?page&limit&ownerId]
- GET /api/v1/upload/:id
- DELETE /api/v1/upload/:id

Implementation notes (interview bullets)
- index.js: sets express.json, express-fileupload with tempFileDir=/tmp, initializes DB and Cloudinary, mounts upload route.
- Keep uploads streaming to avoid memory spikes; temp files are used here.
- Prefer Cloudinary signed URLs for restricted access; server can generate them.
- Nodemailer: if enabled, send upload confirmation or admin alerts after successful save—implement transport in a notification service so it’s testable.
- Security: enforce MIME + magic-byte checks, MAX_FILE_SIZE_BYTES, rate limit and virus-scan before exposing files.

Example curl (upload)
curl -X POST http://localhost:4000/api/v1/upload \
  -F "file=@./photo.jpg"

Concise troubleshooting
- Server not connecting to cloudinary? Check CLOUDINARY_* env and config/cloudinary implementation.
- Large uploads fail? Increase MAX_FILE_SIZE_BYTES and ensure temp directory has space.

License & maintainer
MIT — Maintainer: Ritabrata Mandal (https://github.com/Ritabrata-Mandal)

```
