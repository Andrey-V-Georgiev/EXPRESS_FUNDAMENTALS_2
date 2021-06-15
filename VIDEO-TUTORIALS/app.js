const express = require("express");
const {PORT} = require('./config/config');
const routes = require('./routes');
const errorHandler = require('./midlewares/errorHandler');
const app = express();

require('./config/mongoose-config');
require('./config/express-config')(app);

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));














