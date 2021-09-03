import { EventEmitter, Position, TextDocumentContentProvider, Uri } from "vscode";


export default class ContentProvider implements TextDocumentContentProvider {

	public static get scheme() { return "rapidapi" };

	provideTextDocumentContent(uri: Uri): string {
		return uri.query;
	}
}
