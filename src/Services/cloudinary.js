import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dfulwmdbb', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });