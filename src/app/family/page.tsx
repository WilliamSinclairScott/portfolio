"use client";

import { useEffect, useState } from "react";
import { logout } from "./actions";
import { files, DropboxResponse } from "dropbox";
import { DropboxService } from "@/services/dropbox";

export default function FamilyPage() {
  const [folderData, setFolderData] = useState<files.ListFolderResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Assuming DropboxService is properly instantiated with an access token
        const dropboxService = new DropboxService(
          process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN as string
        );
        const data = await dropboxService.listFolder("");
        setFolderData(data);
      } catch (err) {
        console.error("Error fetching Dropbox folder data:", err);
        setError("Failed to fetch folder data");
      }
    }

    fetchData();
    console.log("Family Page loaded");
  }, []);

  return (
    <div>
      <h1>Family</h1>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <h1>Dropbox Folder</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : folderData ? (
        <ul>
          {folderData.entries.map((entry) => (
            <li key={entry.id}>{entry.name}</li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
