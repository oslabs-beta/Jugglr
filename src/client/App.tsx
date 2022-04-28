import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { counter } from "./atoms/counter";
import Previous from "./components/Previous";

const App = () => {
  const [count, setCount] = useRecoilState(counter);
  const [path, setPath] = useState("");

  const updateCount = (value: number) => {
    setCount(count + value);
    console.log(count, value);
  };

  const handleClick = async () => {
    const response = await fileController.openFile();
    setPath(response);
  };

  return (
    <>
      <Heading>Testing Test</Heading>
      <Button onClick={handleClick}>Upload file</Button>
      <Text mb='8px'>File Path:</Text>
      <Input
        value={path}
        placeholder='File Path'
        size='sm'
      />
      <Button onClick={() => updateCount(1)}>PLUS</Button>
      <Text>Count: {count}</Text>
      <Button onClick={() => updateCount(-1)}>MINUS</Button>
      <br />
      <Previous />
    </>
  );
};

export default App;
