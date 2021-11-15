import * as fs from "fs/promises";
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
  public set apiBase(v: string) {
    this._apiBase = v;
  }

  public async initialize(): Promise<Config> {
    const fileData = await fs.readFile("config.json", { encoding: "utf8" });
    const configData = JSON.parse(fileData);
    this.organization = configData.organization;
    this.apiBase = configData.apiBase;
    this._initialized = true;
    return this;
  }
}
