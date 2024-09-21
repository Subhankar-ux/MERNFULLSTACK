import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateTaskModel = ({handleCreateModelClose,showCreateModel,setTasks}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async () => {
    await axios
      .post(
        `http://localhost:8080/api/v1/task/post`,
        {
          title,
          description,
        },
        { withCredentials: true ,
          headers:{
            "Content-Type":"application/json",
          }
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTasks(prevTasks=>[...prevTasks,res.data.task]);
        setTitle("");
        setDescription("");
        handleCreateModelClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Modal show={showCreateModel} onHide={handleCreateModelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br/>
          <Stack gap={3}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTaskModel;
