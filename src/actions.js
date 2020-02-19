export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const EDIT_TEST_STRING = "EDIT_TEST_STRING";

export const addItem = (id, content) => ({
  type: ADD_ITEM,
  item: { id, content }
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id: id
});

export const editTestString = value => ({
  type: EDIT_TEST_STRING,
  value: value
});
