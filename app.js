const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const UserRoutes = require('./routes/User.route');
const BlogRoutes = require('./routes/Blog.route');
const TestimonialRoutes = require('./routes/Testimonial.route')
const GalleryRoutes = require('./routes/Gallery.route')
const CrouselRoutes = require('./routes/Crousel.route')
const ChefRoutes = require('./routes/Chef.route')
const BookRoutes = require('./routes/Booking.route')
const PaymentRoutes = require('./routes/Payment.route')
const ServiceRoutes = require('./routes/Service.route');
const ContactRoutes = require('./routes/Contact.router');

const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors())
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});


app.use('/auth' , UserRoutes);
app.use('/blog' , BlogRoutes);
app.use('/testimonial', TestimonialRoutes);
app.use('/gallery',GalleryRoutes)
app.use('/crousel',CrouselRoutes)
app.use('/chef',ChefRoutes)
app.use('/Booking',BookRoutes)
app.use('/order',PaymentRoutes)
app.use('/ser',ServiceRoutes)
app.use('/contact',ContactRoutes)

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
