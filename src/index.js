import React from "react";
import ReactDOM from "react-dom";
import { withState, mapProps, renameProp, compose, withProps } from "recompose";
import _ from "lodash";

import "./styles.css";

// withState is HOC which lets you inject state without using
// classes
const counterStateEnhancer = withState("countState", "setCounter", 0);

var CounterComponent = counterStateEnhancer(({ countState, setCounter }) => {
  return (
    <div>
      Count: {countState}
      <button onClick={() => setCounter(n => n + 1)}>Increment</button>
      <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
    </div>
  );
});

var dropPersonalInfoProps = ownerProps => {
  return _.omit(ownerProps, ["age", "phonenumber"]);
};

// removes personal info from the props
const pInfoRemover = mapProps(dropPersonalInfoProps);

const GenericPropPrinterComponent = props => {
  return <div>{JSON.stringify(props)}</div>;
};

function App() {
  // hoc that removes personal info props
  const PInfoRemoved = pInfoRemover(GenericPropPrinterComponent);

  // personal info removed and capital ID prop
  const enhance = compose(
    withProps({ oho: "oho", aha: "aha" }), // add more props
    renameProp("id", "ID"), // rename prop id to ID
    pInfoRemover // removal personal info
  );
  const CapitalIDPinfo = enhance(GenericPropPrinterComponent);
  return (
    <div className="App">
      <h3>Learning Recompose</h3>
      <CounterComponent />

      <h5>Generic component that prints all its props</h5>
      <GenericPropPrinterComponent
        name="chet"
        age="323"
        phonenumber="23"
        id="22"
      />

      <h5>Component with personal info removed using "mapProps"</h5>
      <PInfoRemoved name="chet" age="323" phonenumber="23" id="22" />

      <h5>
        Component that has peronal info removed and capitalized an id prop name
        and added new props
      </h5>
      <CapitalIDPinfo name="chet" age="323" phonenumber="23" id="22" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
