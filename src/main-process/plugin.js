const fs = require('fs');
const path = require('path');

module.exports = (app, mainWindow) => {

    fs.readdir('./plugins', (err, files) => {
        files.forEach((v) => {
            const pluginPath = path.join('./plugins', v, 'index.js');
            fs.access(pluginPath, fs.F_OK, (err) => {
                if(err) return;
                const plugin = require(path.resolve(pluginPath))(app, mainWindow);

                if(plugin && plugin.loadOnRenderer !== undefined) {
                    mainWindow.webContents.send('loadRendererPlugin', path.resolve(path.join('./plugins', v, plugin.loadOnRenderer)));
                }
            });
        });
    });
};