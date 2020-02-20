import React from "react";
import { useState } from "react";
import _ from "lodash";
import { addItem, removeItem } from "./actions";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { useTranslation } from "react-i18next";

const EditForm = ({ editingItem, addItem }) => {
  const [content, setContent] = useState(editingItem.content);
  const { t } = useTranslation();
  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        disabled={editingItem.content === content}
        onClick={() => addItem(editingItem.id, content)}
      >
        {t("save")}
      </button>
    </div>
  );
};

const ItemList = ({ items, selectItem, addItem, removeItem }) => {
  const [content, setContent] = useState("");
  const [id, setId] = useState(1);
  const [editingItemId, setEditingItemId] = useState(null);

  const { t } = useTranslation();

  console.log("Item List");

  const displayList = items.map((item, index) => (
    <div key={index}>
      <p>id: {item.id}</p>
      <p>content: {item.content}</p>
      <button onClick={() => removeItem(item.id)}>{t("delete")}</button>
      <button onClick={() => setEditingItemId(item.id)}>{t("edit")}</button>
      <br />
    </div>
  ));

  const editingItem = editingItemId === null ? null : selectItem(editingItemId);
  return (
    <div>
      <h2>Item:</h2>
      {displayList}
      <h2>Add item:</h2>
      <p>{content}</p>
      <input
        type="text"
        value={id}
        onChange={e => setId(parseInt(e.target.value))}
      />
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={() => addItem(id, content)}>{t("add")}</button>
      {editingItem === null ? (
        <div></div>
      ) : (
        <EditForm
          key={editingItem.id}
          editingItem={editingItem}
          addItem={addItem}
        />
      )}
    </div>
  );
};

const mapState = createSelector(
  state => state.items,
  items => {
    console.log("MapState Item List");
    return {
      items: _.values(items),
      selectItem: id => (items[id] === undefined ? null : items[id])
    };
  }
);

const mapDispatch = dispatch => ({
  addItem: (id, content) => dispatch(addItem(id, content)),
  removeItem: id => dispatch(removeItem(id))
});

export default connect(mapState, mapDispatch)(ItemList);
