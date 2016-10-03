import { ipcRenderer } from 'electron';

ipcRenderer.on('loadPluginRenderer', (path) => {
    document.write(`<script src=${path}></script>`);
});