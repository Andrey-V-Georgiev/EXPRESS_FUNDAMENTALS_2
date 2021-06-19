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
const JoiValidatior = require('./validators/joiValidator');
const auth = require('./midlewares/auth');
const errorHandler = require('./midlewares/errorHandler');


/* Setup App */
const app = express();
require('./config/mongoose-config');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.use('./public', express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(auth);
app.use(new IndexRouter(...createIndexRouter()).router); 
app.use(errorHandler);

/* Run Server */
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));

/* Generate IndexRouter constructor args */
function createIndexRouter() {
    /* Joi validator */
    const joiValidator = new JoiValidatior();
    /* Services */
    const authService = new AuthService();
    const validationService = new ValidationService();
    /* Controllers  */
    const homeController = new HomeController(joiValidator);
    const authController = new AuthController(joiValidator, authService, validationService);
    /* Return indexRouter constructor args */
    return [homeController, authController];
}


