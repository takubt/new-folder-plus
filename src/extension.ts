'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as moment from 'moment';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "new-folder-plus" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let date = vscode.commands.registerCommand('extension.createFromDate', ({ path }) => {
        // The code you place here will be executed every time your command is executed
        console.debug('extension.createFromDate');
        createFromDate(path);
    });

    context.subscriptions.push(date);

    let clipboard = vscode.commands.registerCommand('extension.createFromClipboard', ({ path }) => {
        // The code you place here will be executed every time your command is executed
        console.debug('extension.createFromClipboard');
        createFromClipBoard(path);
    });

    context.subscriptions.push(clipboard);
}

function createFromDate(folder: string) {
    console.debug('createFromDate');
    let configuration = vscode.workspace.getConfiguration("newFolderPlus");
    create(folder, moment().format(configuration.get("dateFormat")));
}

function createFromClipBoard(folder: string) {
    console.debug('createFromClipBoard');
    vscode.env.clipboard.readText().then((clipboard: string) => {
        create(folder, clipboard);
    }, (reason => {
        vscode.window.showErrorMessage('Cannot create directory', reason);
    }));
}

function create(folder: string, name: string) {
    let uri = vscode.Uri.parse(folder);
    let dest = vscode.Uri.joinPath(uri, name);

    vscode.workspace.fs.createDirectory(dest).then(() => {}, reason => {
        vscode.window.showErrorMessage('Cannot create directory', reason);
    });

}

// this method is called when your extension is deactivated
export function deactivate() {
}