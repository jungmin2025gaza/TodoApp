import "./styles.css";
import { TodoDispatchContext } from "../App";
import { useRef, useContext } from "react";

const TodoEditor = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const inputRef = useRef(null);

  const onSubmit = () => {
    if (inputRef.current.value.trim() === "") {
      inputRef.current.focus();
      return;
    }
    onCreate(inputRef.current.value);
    inputRef.current.value = "";
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기</h4>
      <div className="editor_wrapper">
        <input
          placeholder="새로운 Todo..."
          ref={inputRef}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
