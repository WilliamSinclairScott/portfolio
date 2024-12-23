import { Dropbox, DropboxResponse, files } from 'dropbox';
import fetch from 'cross-fetch';

export class DropboxService {
  private dbx: Dropbox;

  constructor(accessToken: string) {
    this.dbx = new Dropbox({
      accessToken,
      fetch,
    });
  }

  static async listFolder(): Promise<DropboxResponse<files.ListFolderResult>> {
    try {
      return await this.listFolder();
    } catch (error) {
      console.error('Error listing folder:', error);
      throw error;
    }
  }

  /**
   * Upload a file to Dropbox.
   * @param path - The destination path in Dropbox.
   * @param contents - The file content as a string or Buffer.
   * @returns A promise resolving to the uploaded file's metadata.
   */
  public async uploadFile(path: string, contents: string | Buffer): Promise<files.FileMetadata> {
    try {
      const response: DropboxResponse<files.FileMetadata> = await this.dbx.filesUpload({
        path,
        contents,
        mode: { ".tag": "add" }, // Use "overwrite" if necessary
        autorename: true,
      });
      return response.result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }
}
