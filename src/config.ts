import * as fs from "fs/promises";
/**
 * Config
 *
 * Class for managing configuration for the project.
 * Hold settings that may need to be changed as part
 * of ongoing operations or testing
 */
export default class Config {
  private _initialized: boolean;

  private checkInitialized(): void {
    if (!this._initialized) {
      throw new Error(
        "Initialize method must be called before any other properties are accessed."
      );
    }
  }

  private _organization: string;
  public get organization(): string {
    this.checkInitialized();
    return this._organization;
  }
  private set organization(v: string) {
    this._organization = v;
  }

  private _apiBase: string;
  public get apiBase(): string {
    this.checkInitialized();
    return this._apiBase;
  }
  private set apiBase(v: string) {
    this._apiBase = v;
  }

  /**
   * Initializes object from the config.json file.
   * Must be called before any properties are accessed.
   * @returns The current instance of the class
   */
  public async initialize(): Promise<Config> {
    const fileData = await fs.readFile("config.json", { encoding: "utf8" });
    const configData = JSON.parse(fileData);
    this.organization = configData.organization;
    this.apiBase = configData.apiBase;
    this._initialized = true;
    return this;
  }
}
