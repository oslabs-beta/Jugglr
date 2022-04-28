import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount } from "./reducers/counterSlice";
import {Button, Paper, Text , MantineProvider, Loader} from '@mantine/core'

const App = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [path, setPath] = useState("");

  const handleClick = async () => {
    const response = await selectorModal.openFile();
    console.log("Electron's Response:", response);
    setPath(response);
    console.log("New Path:", path);
  };

  return (
    <div id="container">
      <div>
        
        <MantineProvider theme={{
          colorScheme:"dark",
          fontFamily: "Open Sans",
          fontSizes: {md: 60},
          radius: {sm:25}
        }}>
          <Text>Testing</Text>
        <Button onClick={handleClick}>Upload file</Button>
        </MantineProvider>
        <input
          type="text"
          style={{ width: "500px" }}
          value={`${path}`}
          readOnly
        />
      </div>
      <div>
        <button
          className="button"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span>{count}</span>
        <button
          className="button"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default App;
