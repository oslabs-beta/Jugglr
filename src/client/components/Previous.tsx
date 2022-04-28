import { increment } from "../reducers/counterSlice";

const Previous = () => {
  const count = 0;
  return (
    <>
      <p>COUNT_2: {count}</p>
      <button onClick={() => count + 10}>PLUS 10</button>
    </>
  );
};

export default Previous;
