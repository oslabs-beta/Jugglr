import { useState } from 'react';

const App = () => {
  const [path, setPath] = useState('');

  const handleClick = async () => {
    const response = await electron.openFile();
    console.log("Electron's Response:", response);
    setPath(response);
    console.log('New Path:', path);
  };

  return (
    <>
      <h1>Testing</h1>
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
