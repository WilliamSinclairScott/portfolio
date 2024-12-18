"use client";

import React, { useState } from "react";
import { saveAs } from "file-saver";
import { json2csv } from "json-2-csv";

const CsvPage: React.FC = () => {
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [jsonText, setJsonText] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setJsonFile(event.target.files[0]);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(event.target.value);
  };

  const handleFileUpload = async () => {
    if (jsonFile) {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        if (e.target) {
          const jsonContent = JSON.parse(e.target.result as string);
          const arrayContent = jsonContent[Object.keys(jsonContent)[0]];
          const csvContent = await json2csv(arrayContent);
          console.log(csvContent);
          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          });
          const fileName = jsonFile.name.replace(".json", ".csv");
          saveAs(blob, fileName);
        }
      };
      fileReader.readAsText(jsonFile);
    }
  };

  const handleTextConvert = async () => {
    if (jsonText) {
      const jsonContent = JSON.parse(jsonText);
      const arrayContent = jsonContent[Object.keys(jsonContent)[0]];
      const csvContent = await json2csv(arrayContent);
      console.log(csvContent);
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      saveAs(blob, "converted.csv");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Upload JSON and Download CSV</h1>
      <div className="mb-4 p-4 border border-blue-300 rounded bg-blue-50 text-blue-700">
        <h2 className="text-lg font-semibold">Upload Instructions:</h2>
        <p>Upload a JSON file with an array of objects or paste JSON content below.</p>
        <p>Ensure the JSON structure is correct.</p>
        <p>
          Example:{" "}
          <code>
            {'{"product" : [{"name": "Duck", "price": 30, ...}, {"name": "Cat", "price": 25, ...}]'}
          </code>
        </p>
        <div className="border border-gray-300 p-2 rounded bg-white">
          <p>
            Returns:{" "}
            <code>
              name, price, ...<br />
              Duck, 30, ...<br />
              Cat, 25, ...<br />
              ...
            </code>
          </p>
        </div>
      </div>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleFileUpload}
        disabled={!jsonFile}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 mb-4"
      >
        Convert to CSV
      </button>
      <textarea
        value={jsonText}
        onChange={handleTextChange}
        placeholder="Paste JSON content here"
        className="mb-4 p-2 border border-gray-300 rounded w-full h-40"
      />
      <button
        onClick={handleTextConvert}
        disabled={!jsonText}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Convert to CSV
      </button>
    </div>
  );
};

export default CsvPage;
