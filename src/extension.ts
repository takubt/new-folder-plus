'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let date = vscode.commands.registerCommand('extension.createFromDate', ({ fsPath }) => {
        // The code you place here will be executed every time your command is executed
        createFromDate(fsPath);
    });

    context.subscriptions.push(date);

    let clipboard = vscode.commands.registerCommand('extension.createFromClipboard', ({ fsPath }) => {
        // The code you place here will be executed every time your command is executed
        createFromClipBoard(fsPath);
    });

    context.subscriptions.push(clipboard);
}

function createFromDate(folder: string) {
    let configuration = vscode.workspace.getConfiguration("newFolderPlus");
    create(folder, moment().format(configuration.get("dateFormat")));
}

function createFromClipBoard(folder: string) {
    vscode.env.clipboard.readText().then((clipboard: string) => {
        create(folder, clipboard);
    }, (reason => {
        vscode.window.showErrorMessage('Cannot create directory', reason);
    }));
}

function create(folder: string, name: string) {
    let dest = path.join(folder, name);
    fs.mkdir(dest, error => {
        if (error) {
            vscode.window.showErrorMessage('Cannot create directory', error.message);
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}