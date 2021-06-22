const express = require("express");
const {PORT} = require('./config/config');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const IndexRouter = require('./router');
const HomeController = require('./controllers/homeController');
const AuthController = require('./controllers/authController');
const CourseController = require('./controllers/courseController');
const AuthService = require('./services/authService');
const UserService = require('./services/userService');
const CourseService = require('./services/courseService');
const JoiValidatior = require('./validators/joiValidator');
const auth = require('./midlewares/auth');
const isAuth = require('./midlewares/isAuth');
const errorHandler = require('./midlewares/errorHandler');


/* Setup App */
const app = express();
require('./config/mongoose-config');
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../resources/views'));
app.use('../resources/public', express.static('public'));
console.log(__dirname)
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(auth); // before router
app.use(new IndexRouter(...createIndexRouter()).router);
app.use(isAuth); // after router
app.use(errorHandler); // after router

/* Run Server */
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));


function createIndexRouter() {
    /* Joi validator */
    const joiValidator = new JoiValidatior();

    /* Services */
    const userService = new UserService();
    const authService = new AuthService(userService);
    const courseService = new CourseService();

    /* Controllers  */
    const homeController = new HomeController(joiValidator, courseService);
    const authController = new AuthController(joiValidator, authService, userService);
    const courseController = new CourseController(joiValidator, courseService);

    /* Return indexRouter constructor args */
    return [homeController, authController, courseController];
}


