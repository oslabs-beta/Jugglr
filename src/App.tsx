import { useState } from 'react';

const App = () => {
  const [path, setPath] = useState('');

  const handleClick = async () => {
    const response = await electron.openFile();
    setPath(response);
  };

  return (
    <>
      <h1>Testing Test</h1>
      <button onClick={ handleClick }>Upload file</button>
      <input
        type="text"
        style={{ width: '500px' }}
        value={`${ path }`}
        readOnly
      />
    </>
  );
};

export default App;
