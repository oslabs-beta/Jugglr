import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount } from "./reducers/counterSlice";

const App = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [path, setPath] = useState("");

  const handleClick = async () => {
    const response = await fileController.openFile();
    console.log("Electron's Response:", response);
    setPath(response);
    console.log("New Path:", path);
  };

  return (
    <div id="container">
      <div>
        <h1>Testing</h1>
        <button onClick={handleClick}>Upload file</button>
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
