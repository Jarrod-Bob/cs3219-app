// import logo from "./logo.svg";
// import "./App.css";
import StudentsTable from "./components/StudentsTable";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    minHeight: "50em",
    opacity: "0.8",
    mixBlendMode: "normal",
    padding: "1.575em 8.375em",
  },
  p: {
    marginBottom: "50px",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Paper className={classes.paper}>
          <Typography className={classes.p} variant="h3" component="h1">
            Welcome to the Student List Handler
          </Typography>
          <Typography
            className={classes.p}
            color="primary"
            variant="h5"
            component="h1"
          >
            With this SPA, you may perform simple CRUD applications on a given
            list of NUS students.
            <br />
            To help you out, we have provided you with some base data for you to
            play around with.
          </Typography>
          <StudentsTable />
        </Paper>
      </Grid>
    </div>
  );
}

export default App;
