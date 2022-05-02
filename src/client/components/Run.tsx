import {Select, Input , SelectChevronIcon, Textarea} from "@mantine/core"

const Run = () => {
  
    return (
      <div>
      <Select  style={{width:"80%"}}  placeholder="select existing image" label="Image" data={['Image1','Image2']} />
      <Textarea style={{width:"80%", marginTop:"5%" }}placeholder="Docker Command Line" label="Docker Command Line" autosize/>
      {/* <Input component="select" rightSection={<SelectChevronIcon size="md" error="Sorry!" color="blue"/>}>
        <option value="1">1</option>
        <option value="2">2</option>
      </Input> */}
      </div>
    );
  };
  
  export default Run;