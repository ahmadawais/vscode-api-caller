import { ApiData, Fetcher } from './../Helpers/Fetcher';
import { join } from "path";
import { Uri, ViewColumn, Webview, WebviewPanel, window, workspace } from "vscode";
import { Extension } from "../Helpers/Extension";
import { getNonce } from "../Helpers/getNonce";
import { Messenger } from "../Helpers/Messenger";
import { ResultView } from '../Helpers/ResultView';


export class ApiWebView {
  private static webview: WebviewPanel | null = null;

  public open() {
    const extensionUri = Extension.getInstance().extensionPath;

    // Create the preview webview
    ApiWebView.webview = window.createWebviewPanel(
      'RapidApiCaller',
      'Calling APIs',
      ViewColumn.Active,
      {
        enableScripts: true
      }
    );

    ApiWebView.webview.iconPath = {
      dark: Uri.file(join(extensionUri.fsPath, 'assets/rapidapi.png')),
      light: Uri.file(join(extensionUri.fsPath, 'assets/rapidapi.png'))
    };

    ApiWebView.webview.webview.html = ApiWebView.getWebviewContent(ApiWebView.webview.webview, extensionUri);

    ApiWebView.webview.onDidChangeViewState(() => {
      if (ApiWebView.webview?.visible) {
        console.log(`ApiWebView opened`);
      }
    });

    ApiWebView.webview.webview.onDidReceiveMessage(async (msg: { command: string, data: ApiData }) => {
      switch(msg.command) {
        case Messenger.Commands.Call:
          const response = await Fetcher.call(msg.data as ApiData);
          if (response && response.ok) {
            ResultView.success(await response.json());
          } else {
            ResultView.error(response);
          }
          break;
      }
    });
  }
  
  /**
   * Retrieve the webview HTML contents
   * @param webView 
   */
  private static getWebviewContent(webView: Webview, extensionPath: Uri): string {
    const scriptUri = webView.asWebviewUri(Uri.joinPath(extensionPath, 'dist', 'webview.js'));

    const nonce = getNonce();

    return `
      <!DOCTYPE html>
      <html lang="en" style="width:100%;height:100%;margin:0;padding:0;">
      <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webView.cspSource} 'self' 'unsafe-inline'; script-src https://cdn.jsdelivr.net 'nonce-${nonce}'; style-src https://cdn.jsdelivr.net ${webView.cspSource} 'self' 'unsafe-inline'; font-src https://cdn.jsdelivr.net ${webView.cspSource}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Rapid API - API Caller</title>
      </head>
      <body style="width:100%;height:100%;margin:0;padding:0;overflow:hidden">
        <div id="app" style="width:100%;height:100%;margin:0;padding:0;"></div>

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}