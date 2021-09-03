import * as vscode from 'vscode';
import { Extension } from './Helpers/Extension';
import ContentProvider from './Providers/ContentProvider';
import { ApiWebView } from './View';

declare const cowsay: any;

export function activate({subscriptions, globalState, extensionUri}: vscode.ExtensionContext) {
	const extension = Extension.getInstance(globalState, extensionUri);
	const apiCaller = new ApiWebView();

	subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(ContentProvider.scheme, new ContentProvider()));

	subscriptions.push(vscode.commands.registerCommand('rapidapi-caller.open', apiCaller.open));
}

// this method is called when your extension is deactivated
export function deactivate() {}