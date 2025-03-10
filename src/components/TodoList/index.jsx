import "./styles.css";
import TodoItem from "../TodoItem";
import { TodoStateContext } from "../App";
import { useState, useContext } from "react";

const TodoList = () => {
  const todo = useContext(TodoStateContext);
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((item) => item.content.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      <input
        placeholder="검색어를 입력하세요"
        className="searchbar"
        onChange={onChangeSearch}
        value={search}
      />
      <div className="list_wrapper">
        {getSearchResult().map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

TodoList.defaultProps = {
  todo: [],
};

export default TodoList;
