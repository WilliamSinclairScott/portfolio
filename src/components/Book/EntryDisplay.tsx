const EntryDisplay = ({ entry }) => {
  return (
    <div>
      <h3>{entry.name}</h3>
      {entry.headers && (
        <div>
          <h4>Headers:</h4>
          <ul>
            {entry.headers.map((header, index) => (
              <li key={index}>
                {typeof header === 'string' ? (
                  header
                ) : (
                  <div style={{ marginLeft: `${header.depth * 10}px` }}>
                    {header.header}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EntryDisplay;
