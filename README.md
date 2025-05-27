# Wanderlust Project

Wanderlust is a travel destination web application built using **Node.js**, **Express**, **MongoDB**, and **EJS**. It allows users to explore, review, and manage travel listings with a clean and responsive interface.

## Features

- User authentication and authorization
- Create, update, delete listings
- Upload images and manage them
- Add reviews to listings
- Custom middleware and error handling
- Responsive EJS templates with layout support

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **EJS Templating**
- **Cloudinary (for image uploads)**
- **Mapbox or Google Maps** (optional for geolocation)
- **Bootstrap** or custom CSS

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/neha210404/Wanderlust-project.git
   cd Wanderlust-project

2. Install dependencies
npm install

3. Set up environment variables
Create a .env file in the root with the following:

DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
SECRET=session_secret_key

4. Run the application
node app.js
or
nodemon app.js

5. Visit 
http://localhost:8080/listings

Folder Structure
Wanderlust-project/
├── controller/
├── models/
├── routes/
├── views/
├── public/
├── uploads/
├── utils/
├── app.js
├── package.json
└── .env (not committed)

## License

This project is licensed under the MIT License.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 🧑‍💻 Author

Made with ❤️ by [@neha210404](https://github.com/neha210404)

