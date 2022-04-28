import { useRecoilState } from "recoil";
import { counter } from "../atoms/counter";

import { Button, Text } from "@chakra-ui/react";

const Previous = () => {
  const [count, setCount] = useRecoilState(counter);

  return (
    <>
      <Text>COUNT_2: {count}</Text>
      <Button onClick={() => setCount(count + 10)}>PLUS 10</Button>
    </>
  );
};

export default Previous;
