const express = require("express");
const {PORT} = require('./config/config');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const IndexRouter = require('./router');
const HomeController = require('./controllers/homeController');
const AuthController = require('./controllers/authController');
const AuthService = require('./services/authService'); 
const ValidationService = require('./services/validationService'); 
const auth = require('./midlewares/auth'); 
const errorHandler = require('./midlewares/errorHandler');

/**
 * @SetupApp
 */
const app = express();
require('./config/mongoose-config');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.use('./public', express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 
app.use(auth);

/**
 * @PrepareService
 */ 
const authService = new AuthService();
const validationService = new ValidationService();
/**
 * @PrepareControllers
 */
const homeController = new HomeController();
const authController = new AuthController(authService, validationService);

/**
 * @SetupRouter
 */

//TODO take out all the configuration for the router 
const indexRouter = new IndexRouter(homeController, authController);
app.use(indexRouter._router);

/* Awlays after the router */
app.use(errorHandler);

/**
 * @RunServer
 */
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));


