// const environment = process.env.NODE_ENV ? process.env.NODE_ENV : "production";
const config = require('./environments/config.development.js');
// console.log("Loading environment: " + environment);
module.exports = config;
