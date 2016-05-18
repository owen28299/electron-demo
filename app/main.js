/* eslint strict: 0*/
'use strict';
/**
 * Electron main application
 * Import required packages
 * @required electron
 */
const electron = require('electron');

/**
 * Create contructors
 * Create a constuctor for the window and electron application
 * @implements electron
 * @const BrowserWindow
 * @const app
 */
 const BrowserWindow = electron.BrowserWindow;
 const app = electron.app;


// keep reference to window to be constructed or else window will automatically close on
// on-ready function when it gets garbage collected.
let mainWindow = null;

app.on('window-all-closed', () => {
   /**
   * Handle window-all-closed event
   *
   * close applicaton when all windows are closed if we are not on a darwin system
   *        proccess.platform; returns the platform the application is running on
   */

  if (process.platform !== 'darwin') {
    app.quit();
  }

 });
// Most work will be done in the on "ready" handler
app.on('ready', () => {
  /**
   * Construct a new Browser Window
   * @implements mainWindow
   * Store a new Browser window to mainWindow variable.
   *
   * Set the Url of the new window created using the loadURL method
   *        set the url to the file path of the index.html document
   * @example 'file://${__dirname}/app/app.html'
   * Handle on Close event on the window to set the mainWindow back to null;
   *        This will remove the windows its saved states but not stop the application
   */

  mainWindow = new BrowserWindow({ width: 800, height: 600, title: 'Electron Workshop'});

  const systemPath = 'file://';
  const initialFileOnStart = '/index.html';
  mainWindow.loadURL(systemPath + __dirname + initialFileOnStart);

  mainWindow.on('closed', () => {
   mainWindow = null;
  });

});
app.on('activate', () => {
  /**
   * RE-Cap of on ready:
   * Construct a new Browser Window only when mainWindow = null
   * @implements mainWindow
   * Store a new Browser window to mainWindow variable.
   *
   * Set the Url of the new window created using the loadURL method
   *        set the url to the file path of the index.html document
   *        or possibly have a store method to save on darwin the previous view rendered
   * @example 'file://${__dirname}/app/app.html'
   * Handle on Close event on the window to set the mainWindow back to null;
   *        This will remove the windows its saved states but not stop the application
   */

  if (mainWindow === null) {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    const systemPath = 'file://';
    const index = '/index.html';

    mainWindow.loadURL(systemPath + __dirname + index);

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Handle Menu code here
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

});