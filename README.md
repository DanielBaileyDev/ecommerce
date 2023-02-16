# ecommerce
A full stack e-commerce web application, featuring user authentication and an admin dashboard for product management.

**Link to project:** https://ecommercewears.onrender.com/

## How It's Made:
**Tech used:** HTML, CSS, JavaScript, Node, Express, MongoDB, Passport, Stripe, Multer, Mongoose, EJS

PassportJS manages user signup, login, and authentication on the website, with each user assigned one of three roles: User, Reader (with read-only access to the admin dashboard), or Admin (able to create, update, and delete products). The database stores product data, including name, price, description, and feature status, with featured products appearing on the homepage. The Stripe API is utilized to interact with the client for secure payment transactions.

## Lessons Learned:
For optimal image storage, it is advisable to use either a server or a CDN service. My initial attempts to store images in the database were unsuccessful, leading me to save the images on the server instead. As I only intended to store a small number of images, it was an appropriate solution. In contrast, a CDN service would be more suitable for larger-scale storage.
