const TableOfContents = ({ data, onSelectEntry }) => {
  
  const TOCEntry = ({ content, onSelectEntry }) => {
    const handleClick = () => {
      onSelectEntry(content);
    };

    return (
      <div style={{ marginLeft: "20px" }} onClick={handleClick}>
        <h3>{content.name}</h3>
        {content.headers && (
          <ul>
            {content.headers.map((header, idx) => (
              <li key={idx}>
                {typeof header === "string" ? (
                  header
                ) : (
                  <div style={{ marginLeft: `${header.depth * 10}px` }}>
                    {header.header}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div>
      {data.map((book) => (
        <div key={book.id}>
          <h2>{book.name}</h2>
          {book.contents.map((content, index) => (
            <TOCEntry
              key={index}
              content={content}
              onSelectEntry={onSelectEntry}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableOfContents;
