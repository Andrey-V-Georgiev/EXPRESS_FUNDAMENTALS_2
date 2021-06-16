const express = require("express");
const {PORT} = require('./config/config'); 
const errorHandler = require('./midlewares/errorHandler');
const app = express();

require('./config/mongoose-config');
require('./config/express-config')(app);

const {IndexRouter} = require('./router');
const {HomeController} = require('./controllers/homeController');
const {AuthController} = require('./controllers/authController');
const {AuthService} = require('./services/authService');

/* Services */
const authService = new AuthService();

/* Controllers */
const homeController = new HomeController();
const authController = new AuthController(authService);

const indexRouter = new IndexRouter(homeController, authController);

app.use(indexRouter._router);
//app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));


