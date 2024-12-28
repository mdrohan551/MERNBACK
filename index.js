const app = require('./app');
const config = require('./src/config/config');
const port =config.PORT;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})