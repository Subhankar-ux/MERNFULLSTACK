import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function Header({ setTasks, tasks, setIsAuthenticated, isAuthenticated,setTaskType }) {
  const [allTasks, setAllTasks] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(data.tasks);
      setTasks(data.tasks);
      
    } catch (error) {
      console.log("Error fetching tasks", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filterTasks = [];

    switch (filterType) {
      case "completed":
        filterTasks = allTasks.filter((task) => task.status === "completed");
        setTaskType("Completed Task!");
        break;
      case "incomplete":
        filterTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskType("Incomplete Task!");
        break;
      case "archived":
        filterTasks = allTasks.filter((task) => task.status === true);
        setTaskType("Archived Task!");
        break;
      case "all":
        filterTasks = allTasks;
        setTaskType("Tasks!");
        break;

      default:
        filterTasks = allTasks;
    }
    setTasks(filterTasks);
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}
    >
      <Container>
        <Navbar.Brand href="#home">TASK MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to={"/"}
              className="text-decoration-none d-flex align-items-center link-light"
            >
              Home
            </Link>

            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => filterTasks("all")}>
                All Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>
                Completed Tasks
              </NavDropdown.Item>

              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>
                Incomplete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("archived")}>
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Link
              to={"/profile"}
              className="text-decoration-none d-flex align-items-center link-light"
            >
              Profile
            </Link>
            <Button
              className="bg-transparent border-0 "
              style={{ width: "fit-content" }}
              onClick={handleLogout}
            >
              LogOut
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
