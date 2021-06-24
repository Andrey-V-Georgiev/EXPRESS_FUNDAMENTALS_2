const express = require("express");
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const {PORT} = require('./config/config');
const path = require('path');

const UserService = require('./services/userService');
const PlayService = require('./services/playService');
const HomeController = require('./controllers/homeController');
const AuthController = require('./controllers/authController');
const PlayController = require('./controllers/playController');
const JoiValidatior = require('./validators/joiValidator');
const IndexRouter = require('./router');

const auth = require('./midlewares/auth');
const isAuth = require('./midlewares/isAuth');
const errorHandler = require('./midlewares/errorHandler');


/* Setup App */
const app = express();
require('./config/mongoose-config');

app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources/views'));
app.use('/static', express.static(path.join(__dirname, 'resources/public')));

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
    const playService = new PlayService();

    /* Controllers  */
    const homeController = new HomeController(joiValidator, playService);
    const authController = new AuthController(joiValidator, userService);
    const playController = new PlayController(joiValidator, playService);

    /* Return indexRouter constructor args */
    return [homeController, authController, playController];
}


