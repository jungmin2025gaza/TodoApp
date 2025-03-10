import "./styles.css";
import Header from "../Header";
import TodoEditor from "../TodoEditor";
import TodoList from "../TodoList";
import Footer from "../Footer";
import mockTodo from "../../mock/mockData";
import React, { useReducer, useRef, useCallback, useMemo } from "react";

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.newItem];
    }

    case "UPDATE": {
      return state.map((item) => {
        return item.id === action.targetId
          ? {
            ...item,
            isDone: !item.isDone
          }
          : item
      });
    }

    case "DELETE": {
      return state.filter((item) => item.id !== action.targetId);
    }

    default: return state;
  }
}

const App = () => {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
          <Footer />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
};

export default App;
