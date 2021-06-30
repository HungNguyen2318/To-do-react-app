import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from 'react'
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  //state, props
  const [todoList, setTodoList] = useState([]); // trả về 1 array với 2 element : 1 biến để lưu trữ state - 1 method dùng để cập nhật State này
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);


  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      //them text input vao danh sach todo listlist
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  },[]);

  return (
    <>
      <h3>Danh sach can lam</h3>
      <Textfield name='add-todo' placeholder='Them viec can lam...' elemAfterInput={
        <Button
          isDisabled={!textInput}
          appearance='primary'
          onClick={onAddBtnClick}
        >
          Add
        </Button>
      }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
  );
}

export default App;
