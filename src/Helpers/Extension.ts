import { Memento, extensions, Uri } from "vscode";


export class Extension {
  private static instance: Extension;
  
  private constructor(private globalState: Memento, private extPath: Uri) {}

  /**
   * Creates the singleton instance for the panel
   * @param extPath 
   */
  public static getInstance(globalState?: Memento, extPath?: Uri): Extension {
    if (!Extension.instance && globalState && extPath) {
      Extension.instance = new Extension(globalState, extPath);
    }
    return Extension.instance;
  }

  /**
   * Get the path to the extension
   */
  public get extensionPath(): Uri {
    return this.extPath;
  }
}