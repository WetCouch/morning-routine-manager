const { resolve } = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config
    config.entry.main = "./src/server/index.js";

    // config.resolve.alias = {
    //     'config': resolve(__dirname, 'config'),
    // };
    //
    // console.log(config);


    return config;
  }
}
