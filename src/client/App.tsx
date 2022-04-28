import { useState } from "react";
import AppLayout from "./components/AppLayout";

const App = () => {
  const [ path, setPath ] = useState("");

  const handleClick = async () => {
    const response = await fileController.openFile();
    console.log("Electron's Response:", response);
    setPath(response);
    console.log("New Path:", path);
  };

  return (
    <div id="container">
      <AppLayout />
    </div>
  );
};

export default App;
