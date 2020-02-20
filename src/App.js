import React, { useState } from "react";
import ItemList from "./ItemList";
import { editTestString, increaseAsync, apiRequest } from "./actions";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const ShowItem = ({ item }) => (
  <div>
    <h1>userId: {item.userId} </h1>
    <h2>Id: {item.id} </h2>
    <h2>Title: {item.title} </h2>
  </div>
);

const App = ({
  testString,
  editTestString,
  counter,
  remoteItem,
  increaseAsync,
  loadData
}) => {
  const { i18n } = useTranslation();
  const [remoteId, setRemoteId] = useState(1);

  return (
    <div>
      <ItemList />
      <h2>--------------------------------</h2>
      <h3>{testString}</h3>
      <input type="text" onChange={e => editTestString(e)} />
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
      <button onClick={() => i18n.changeLanguage("vi")}>vi</button>

      <h2>Counter: {counter}</h2>
      <button onClick={increaseAsync}>Increase Async</button>
      <div>
        <input
          type="text"
          onChange={e => setRemoteId(parseInt(e.target.value))}
          value={remoteId}
        />
        <button onClick={() => loadData(remoteId)}>Load Data</button>

        {remoteItem === null ? <div></div> : <ShowItem item={remoteItem} />}
      </div>
    </div>
  );
};

const mapState = state => ({
  testString: state.testString,
  counter: state.counter,
  remoteItem: state.remoteItem
});

const mapDispatch = dispatch => ({
  editTestString: e => dispatch(editTestString(e.target.value)),
  increaseAsync: () => dispatch(increaseAsync()),
  loadData: id => dispatch(apiRequest(id))
});

export default connect(mapState, mapDispatch)(App);
