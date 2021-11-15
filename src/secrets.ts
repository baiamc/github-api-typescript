import * as fs from "fs/promises";
/**
 * Secrets
 *
 * Class for managing secret information stored outside the main project folder
 */
export default class Secrets {
  private _accessToken: string;
  public get accessToken(): string {
    if (!this._accessToken) {
      throw new Error(
        "Initialize method must be called before any properties can be accessed."
      );
    }
    return this._accessToken;
  }
  private set accessToken(v: string) {
    this._accessToken = v;
  }

  /**
   * initialize
   *
   * Initialize secrets from the secrets.json file.  Must be called before properties can be used.
   */
  public async initialize(): Promise<Secrets> {
    const fileData = await fs.readFile("../secrets.json", { encoding: "utf8" });
    const secretData = JSON.parse(fileData);
    this.accessToken = secretData.accessToken;
    if (!this.accessToken) {
      throw new Error(
        "secrets.json not properly configured.  Please review the project README.md."
      );
    }
    return this;
  }
}
