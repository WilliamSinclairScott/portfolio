"use server";
import { deleteSession } from "../lib/session";
import { Dropbox } from "dropbox";
import { redirect } from "next/navigation";

export async function fetchFiles(path: string = ""): Promise<{ name: string; url: string }[]> {
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("DROPBOX_ACCESS_TOKEN is not defined in environment variables");
  }

  const dbx = new Dropbox({
    accessToken: accessToken,
    fetch: fetch,
  });

  try {
    console.log("Service Created");

    // Fetch files from Dropbox
    const response = await dbx.filesListFolder({ path });
    console.log("Response:", response.result.entries);

    // Generate shared links for each file
    const filesWithLinks = await Promise.all(
      response.result.entries.map(async (file) => {
        if (file[".tag"] === "file" && file.path_lower) {
          try {
            // Check for existing shared link
            const existingLinks = await dbx.sharingListSharedLinks({
              path: file.path_lower,
              direct_only: true, // Only fetch direct links for the file
            });

            let directUrl: string;

            if (existingLinks.result.links.length > 0) {
              // Use the existing shared link
              directUrl = existingLinks.result.links[0].url.replace(/dl=0$/, "raw=1");
            } else {
              // Create a new shared link
              const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
                path: file.path_lower,
              });
              directUrl = linkResponse.result.url.replace(/dl=0$/, "raw=1");
            }

            return {
              name: file.name,
              url: directUrl,
            };
          } catch (linkError) {
            console.error(`Error handling link for file ${file.name}:`, linkError);
          }
        }
        return null; // Return null for skipped items
      })
    );

    // Filter out any null entries
    const filteredFilesWithLinks = filesWithLinks.filter(
      (file): file is { name: string; url: string } => file !== null
    );

    console.log("Files with links:", filteredFilesWithLinks);
    return filteredFilesWithLinks;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}

export async function handleUpload(path: string, fileList: FileList): Promise<unknown[]> {
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("DROPBOX_ACCESS_TOKEN is not defined in environment variables");
  }

  if (!fileList || fileList.length === 0) {
    throw new Error("No files provided for upload");
  }

  const dbx = new Dropbox({
    accessToken,
    fetch,
  });

  console.log("Service Created, Uploading files to Dropbox");

  // Array to store upload results
  const uploadResults = [];

  // Loop through each file in the FileList
  for (const file of Array.from(fileList)) {
    const filePath = `${path}/${file.name}`;

    try {
      // Read file as ArrayBuffer
      const fileContents = await file.arrayBuffer();

      // Upload file
      const response = await dbx.filesUpload({
        path: filePath,
        contents: fileContents,
        mode: { '.tag': 'overwrite' }, // Overwrite if file already exists
      });

      console.log(`File uploaded: ${file.name}`);
      uploadResults.push(response.result);
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      uploadResults.push({ file: file.name, error: error });
    }
  }

  return uploadResults;
}


//TODO: redundant code, need to bring actions out and classify them correctly
export async function logout() {
  await deleteSession();
  redirect("/login");
}
