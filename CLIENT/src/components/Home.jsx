import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Card, Button, Stack } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import CreateTaskModel from "../components/CreateTaskModel";
import UpdateTaskModel from "../components/UpdateTaskModel";
import ViewTaskModel from "../components/ViewTaskModel";

const Home = ({ setTasks, tasks, isAuthenticated,taskType }) => {
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showViewModel, setShowViewModel] = useState(false);
  const [viewTaskId, setViewTaskId] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState("");

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/v1/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleCreateModelClose = () => setShowCreateModel(false);
  const handleUpdateModelClose = () => setShowUpdateModel(false);
  const handleViewModelClose = () => setShowViewModel(false);

  const handleCreateModelShow = () => setShowCreateModel(true);

  const handleUpdateModelShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModel(true);
  };

  const handleViewModelShow = (id) => {
    setViewTaskId(id);
    setShowViewModel(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <h1 style={{width:"fit-content"}}>{taskType}</h1>
        <div className="col text-end" style={{width:"fit-content"}}>
          <Button variant="primary" onClick={handleCreateModelShow}>
            Create Task
          </Button>
        </div>
      </div>
      <div className="row">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => {
            return (
              <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
                <Card style={{ marginBottom: "20px", minHeight: "400px" }}>
                  <Card.Body className="d-flex justify-content-between flex-column">
                    <Stack gap={2}>
                      <Card.Title className="mb-2" style={{ height: "50px" }}>
                        {task && task.title.length <= 40
                          ? task.title
                          : task.title.slice(0, 40) + "..."}
                      </Card.Title>
                      <Card.Text>
                        {task && task.description.length <= 300
                          ? task.description
                          : task.description.slice(0, 300) + "..."}
                      </Card.Text>
                    </Stack>

                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="justify-content-end"
                    >
                      <MdEdit
                        className="fs-3"
                        onClick={() => handleUpdateModelShow(task._id)}
                      />
                      <MdDelete
                        className="fs-3"
                        onClick={() => deleteTask(task._id)}
                      />
                      <FaEye
                        className="fs-3"
                        onClick={() => handleViewModelShow(task._id)}
                      />
                    </Stack>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <h1>You don't have any {taskType} </h1>
        )}
      </div>

      <CreateTaskModel
        handleCreateModelClose={handleCreateModelClose}
        showCreateModel={showCreateModel}
        setTasks={setTasks}
      />
      <UpdateTaskModel
        showUpdateModel={showUpdateModel}
        handleUpdateModelClose={handleUpdateModelClose}
        id={updateTaskId}
        setTasks={setTasks}
      />
      <ViewTaskModel
       showViewModel={showViewModel}
       handleViewModelClose={handleViewModelClose}
       id={viewTaskId}
      />
    </div>
  );
};

export default Home;
