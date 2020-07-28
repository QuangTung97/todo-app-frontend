import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { List, ListItem, Loader, Input, Button } from "../util";
import { apiPost, apiGet, apiPut, apiDelete } from "../api";
import AppContext from "../context";

const MainContent = styled.div`
  flex: 9;
  background-color: #ddd;
  padding: 8px;
`;

const AddItemButton = styled(Button)`
  margin: 0 4px;
  border-radius: 10px;
`;

const AddItemForm = styled.div`
  display: flex;
  align-items: center;
`;

const ItemInput = styled(Input)`
  width: 500px;
`;

const TodoName = styled.div`
  font-size: 16px;
  color: green;
  font-family: sans-serif;
  margin: 4px 0;
`;

const CheckboxStyle = styled.input`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const BottonStyle = styled.div`
  color: #666;
  font-family: sans-serif;
  background-color: #fff;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemsLeft = styled.div`
  margin-right: auto;
  padding: 4px;
`;

const TextButton = styled.div`
  padding: 8px;
  border: ${props =>
    props.active ? "1.6px solid rgba(255, 0, 0, 0.5)" : "none"};
  margin-right: 8px;
  border-radius: 10px;
  cursor: pointer;
`;

const BottomButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TodoItem = ({ item, onCheck }) => {
  return (
    <ListItem>
      <CheckboxStyle
        type="checkbox"
        checked={!!item.completed}
        onChange={onCheck}
      />
      <TodoName>{item.description}</TodoName>
    </ListItem>
  );
};

const BottomBar = ({ items, filter, setFilter }) => {
  return (
    <BottonStyle>
      <ItemsLeft>{Object.keys(items).length} items</ItemsLeft>
      <TextButton active={filter === "all"} onClick={() => setFilter("all")}>
        All
      </TextButton>
      <TextButton
        active={filter === "active"}
        onClick={() => setFilter("active")}
      >
        Active
      </TextButton>
      <TextButton
        active={filter === "completed"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </TextButton>
    </BottonStyle>
  );
};

const listToObjectWithId = list => {
  const result = {};
  list.forEach(e => {
    result[e.id] = e;
  });
  return result;
};

const sortByDate = (list, func) => {
  const compare = (a, b) => new Date(func(a)) - new Date(func(b));
  return list.sort(compare);
};

const completedEqual = (itemA, itemB) =>
  !!itemA.completed === !!itemB.completed;

const itemsEqual = (a, b) =>
  Object.keys(a).length === Object.keys(b).length &&
  Object.values(a).every(item => item.id in b) &&
  Object.values(a).every(item => completedEqual(item, b[item.id]));

const toBeCompletedIds = (items, currentItems) => {
  const result = new Set([]);
  Object.values(currentItems).forEach(item => {
    const id = item.id;
    if (item.completed && !items[id].completed) result.add(id);
  });
  return result;
};

const toBeActiveIds = (items, currentItems) => {
  const result = new Set([]);
  Object.values(currentItems).forEach(item => {
    const id = item.id;
    if (!item.completed && items[id].completed) result.add(id);
  });
  return result;
};

const RightPanel = ({ currentTodoId }) => {
  const [description, setDescription] = useState("");
  const [state, setState] = useState("initial"); // initial, loading, error
  const [items, setItems] = useState({});
  const [currentItems, setCurrentItems] = useState({});
  const [filter, setFilter] = useState("all"); // all, active, completed

  const { token, setToken } = useContext(AppContext);

  const loadItems = async function() {
    if (currentTodoId) {
      apiGet(`/todo-items/${currentTodoId}`, token, setToken)
        .then(res => {
          const object = listToObjectWithId(res.todo_items || []);
          setItems(object);
          setCurrentItems(object);
        })
        .catch(e => console.log(e));
    }
  };

  useEffect(() => {
    loadItems();
  }, [currentTodoId]);

  const onSubmit = async function(e) {
    e.preventDefault();
    setState("loading");

    try {
      const res = await apiPost(
        "/todo-items",
        {
          todoListId: currentTodoId,
          description
        },
        token,
        setToken
      );
      console.log(res);
      setState("initial");
      loadItems();
    } catch (e) {
      console.log(e);
      setState("error");
    }
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
    if (state === "error") {
      setState("initial");
    }
  };

  const onCheck = item => {
    setCurrentItems({
      ...currentItems,
      [item.id]: {
        ...item,
        completed: !item.completed
      }
    });
  };

  const onSave = () => {
    apiPut(
      "/todo-items/completed",
      {
        todo_list_id: currentTodoId,
        to_be_completed_ids: [...toBeCompletedIds(items, currentItems)],
        to_be_active_ids: [...toBeActiveIds(items, currentItems)]
      },
      token,
      setToken
    )
      .then(() => loadItems())
      .catch(e => console.log(e));
  };

  const onClearCompleted = () => {
    apiDelete(`/todo-items/completed/${currentTodoId}`, token, setToken)
      .then(() => loadItems())
      .catch(e => console.log(e));
  };

  const disabled = itemsEqual(items, currentItems);

  let filterFunc = () => true;
  if (filter === "active") {
    filterFunc = item => !item.completed;
  } else if (filter === "completed") {
    filterFunc = item => !!item.completed;
  }

  const filteredItems = sortByDate(
    Object.values(currentItems),
    e => e.created_at
  ).filter(filterFunc);

  const clearDisabled =
    Object.values(items).filter(item => !!item.completed).length === 0;

  return (
    <MainContent>
      {currentTodoId ? (
        <React.Fragment>
          <form onSubmit={onSubmit} style={{ marginBottom: "4px" }}>
            <AddItemForm>
              <ItemInput
                type="text"
                value={description}
                onChange={onChangeDescription}
              />
              <AddItemButton type="submit">Add Item</AddItemButton>
              {state === "loading" ? <Loader /> : ""}
              {state === "error" ? (
                <h3 style={{ color: "red" }}>An error has occured</h3>
              ) : (
                ""
              )}
            </AddItemForm>
          </form>
          <List>
            {filteredItems.map(e => (
              <TodoItem key={e.id} item={e} onCheck={() => onCheck(e)} />
            ))}
          </List>
          <BottomBar
            items={filteredItems}
            filter={filter}
            setFilter={setFilter}
          />
          <BottomButtons>
            <Button disabled={clearDisabled} onClick={onClearCompleted}>
              Clear completed
            </Button>
            <Button disabled={disabled} onClick={onSave}>
              Save
            </Button>
          </BottomButtons>
        </React.Fragment>
      ) : (
        ""
      )}
    </MainContent>
  );
};

export default RightPanel;
