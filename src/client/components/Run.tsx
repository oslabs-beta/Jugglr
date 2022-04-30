import {Select, Input , SelectChevronIcon} from "@mantine/core"

const Run = () => {
    
    return (
      <div>
      <Select rightSectionWidth={2}  placeholder="select existing image" label="Image" data={['Image1','Image2']} />
      
      {/* <Input component="select" rightSection={<SelectChevronIcon size="md" error="Sorry!" color="blue"/>}>
        <option value="1">1</option>
        <option value="2">2</option>
      </Input> */}
      </div>
    );
  };
  
  export default Run;