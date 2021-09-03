import { Uri, workspace, window, languages, ViewColumn, commands, TextDocument, Range, Position, WorkspaceEdit } from "vscode";
import ContentProvider from "../Providers/ContentProvider";


export class ResultView {

  public static async success(data: string) {
    const apiData = JSON.stringify(data, null, 2);

    const uri = Uri.parse(`${ContentProvider.scheme}:API Result`);
    this.show(uri, apiData, "json");
  }

  public static error(data: any) {
    const apiData = JSON.stringify(data, null, 2);
    const uri = Uri.parse(`${ContentProvider.scheme}:API Result`);
    this.show(uri, apiData, "text");
  }

  private static async show(dataUri: Uri, data: any, type: "json" | "text") {
    const doc = await workspace.openTextDocument(dataUri);

    await window.showTextDocument(doc, { preview: true, viewColumn: ViewColumn.Beside });

    const workEdits = new WorkspaceEdit();
    workEdits.replace(doc.uri, new Range(new Position(0, 0), new Position(doc.lineCount, 0)), data);
    await workspace.applyEdit(workEdits);
                
    await languages.setTextDocumentLanguage(doc, type);
  }
}