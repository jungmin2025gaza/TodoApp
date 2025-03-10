import "./styles.css";
import { TodoStateContext } from "../App";
import { useMemo, useContext } from "react";

const Footer = () => {
  const todo = useContext(TodoStateContext);

  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((item) => item.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);

  const { totalCount, doneCount, notDoneCount } = analyzeTodo;
  return (
    <div className="Footer">
      <div className="total_col">총 갯수: {totalCount}</div>
      <div>완료된 할 일: {doneCount}</div>
      <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
    </div>
  );
}

export default Footer;
