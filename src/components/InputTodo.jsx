import { Button } from "./ui/button";
import { Input } from "./ui/input";

function InputTodo({ inputValue, onChange, onClick }) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Write down what you want to do"
        value={inputValue}
        onChange={onChange}
      />
      <Button type="button" onClick={onClick}>
        Add to list
      </Button>
    </div>
  );
}

export default InputTodo;
