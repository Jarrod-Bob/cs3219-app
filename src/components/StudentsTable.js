import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "matric",
    label: "Matric Number",
    minWidth: 170,
    align: "right",
  },
  {
    id: "faculty",
    label: "Faculty",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StudentsTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // form attributes
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matric, setMatric] = useState("");
  const [faculty, setFaculty] = useState("");

  const [selected, setSelected] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDelete = (user) => {
    setSelected(user);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenEdit = (user) => {
    setSelected(user);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMatricChange = (e) => {
    setMatric(e.target.value);
  };

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value);
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/students`).then((res) => {
      const data = res.data;
      setUsers(data.data.reverse());
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleCreate = async () => {
    const data = {
      name: name,
      email: email,
      matric: matric,
      faculty: faculty,
    };
    await axios.post("http://localhost:8080/api/students", data);
    await axios.get(`http://localhost:8080/api/students`).then((res) => {
      const data = res.data;
      setUsers(data.data.reverse());
    });

    setOpen(false);
  };

  const handleEdit = async () => {
    const data = {
      name: name,
      email: email,
      matric: matric,
      faculty: faculty,
    };
    await axios.put(`http://localhost:8080/api/students/${selected._id}`, data);
    await axios.get(`http://localhost:8080/api/students`).then((res) => {
      const data = res.data;
      setUsers(data.data.reverse());
    });

    setOpenEdit(false);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/api/students/${selected._id}`);
    await axios.get(`http://localhost:8080/api/students`).then((res) => {
      const data = res.data;
      setUsers(data.data.reverse());
    });

    setOpenDelete(false);
  };

  return (
    <Paper className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Student
      </Button>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={user.email}
                  >
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenDelete(user)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              value={name}
              onInput={handleNameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onInput={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Matric Number"
              value={matric}
              onInput={handleMatricChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Faculty"
              value={faculty}
              onInput={handleFacultyChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogContent>
          This action is irreversible. Confirm Delete?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onInput={handleNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onInput={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Matric Number"
            value={matric}
            onInput={handleMatricChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Faculty"
            value={faculty}
            onInput={handleFacultyChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
