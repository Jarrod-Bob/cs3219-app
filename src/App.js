// import logo from "./logo.svg";
// import "./App.css";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => {
  root: {
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
