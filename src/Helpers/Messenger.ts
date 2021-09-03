
interface ClientVsCode<T> {
  getState: () => T;
  setState: (data: T) => void;
  postMessage: (msg: unknown) => void;
}

declare const acquireVsCodeApi: <T = unknown>() => ClientVsCode<T>;

export class Messenger {
  private static vscode: ClientVsCode<any>;

  public static Commands = {
    Call: 'call'
  };
  
  public static getVsCodeAPI() {
    Messenger.vscode = acquireVsCodeApi();
    return Messenger.vscode;
  }
  
  public static sendMessage = (command: string, data?: any) => {    
    if (data) {
      Messenger.vscode.postMessage({ command, data });
    } else {
      Messenger.vscode.postMessage({ command });
    }
  }
}