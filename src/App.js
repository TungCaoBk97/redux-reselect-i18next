import React from "react";
import ItemList from "./ItemList";
import { editTestString } from "./actions";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const App = ({ testString, editTestString }) => {
  const { i18n } = useTranslation();

  return (
    <div>
      <ItemList />
      <h2>--------------------------------</h2>
      <h3>{testString}</h3>
      <input type="text" onChange={e => editTestString(e)} />
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
      <button onClick={() => i18n.changeLanguage("vi")}>vi</button>
    </div>
  );
};

const mapState = state => ({
  testString: state.testString
});

const mapDispatch = dispatch => ({
  editTestString: e => dispatch(editTestString(e.target.value))
});

export default connect(mapState, mapDispatch)(App);
