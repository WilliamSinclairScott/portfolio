// App.js
import { useState } from 'react';
import bookData from '../../data/NeedsRefactor?/books.json';
import XphbData from '../../data/NeedsRefactor?/book-xphb.json';
import TableOfContents from './TableOfContents';
import EntryDisplay from './EntryDisplay';

function BookPage() {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
  };

  return (
    <div className="App">
      <h1>Table of Contents</h1>
      <TableOfContents data={bookData.book} onSelectEntry={handleSelectEntry} />
      {selectedEntry && (
        <div>
          <h2>Entry Details</h2>
          <EntryDisplay entry={selectedEntry} />
        </div>
      )}
    </div>
  );
}

export default BookPage;
