import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Button, Modal, message, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ApiService from "../api_service/apiService";

const API = new ApiService();

const ListNotes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [addButtonLoading, setAddButtonLoading] = useState(false)
  const [editButtonLoading, setEditButtonLoading] = useState(false)
  const [noteId, setNoteId] = useState(null)
  const [ addFrom ] = Form.useForm()
  const [ editForm ] = Form.useForm()


  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = () => {
    API.getAllNotes()
      .then((res) => {
        setNotes(res?.data?.data);
      })
      .then((err) => {
        console.log(err);
      });
  };

  const getSingleNote = (id) => {
    API.getSingleNote(id)
      .then((res) => {
        if(res?.data?.success){
          setIsEditModalOpen(true)
          setNote(res?.data?.data);
          editForm.setFieldsValue(res?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNote = (values) => {
    setAddButtonLoading(true)
    API.createNote(values)
    .then((res)=>{
      if(res?.data?.success){
        message.success(res?.data?.message)
        setAddButtonLoading(false)
        addFrom.resetFields()
        getAllNotes()
        setIsAddModalOpen(false)
      }
    })
  }

  const editNote = (values) => {
    setEditButtonLoading(true)
    API.updateNote(note._id, values)
    .then((res)=>{
      if (res?.data?.success) {
        message.success(res?.data?.message);
        setEditButtonLoading(false)
        editForm.resetFields()
        setIsEditModalOpen(false)
        getAllNotes();
      } else {
        message.warning(res?.data?.message);
      }
    })
  }

  const deleteNote = (id) => {
    API.deleteNote(id)
      .then((res) => {
        if (res?.data?.success) {
          message.success(res?.data?.message);
          getAllNotes();
        } else {
          message.warning(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
    addFrom.resetFields()
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    editForm.resetFields()
  };



  return (
    <div className="notesContainer">
      <Button className="addButton" type="primary" danger onClick={showModal}>
        Add Note
      </Button>
      <div className="notes">
        {notes.map((note) => (
          <div key={note._id} className="note">
            <div className="headingContainer">
              <h3>{note.title}</h3>
              <DeleteOutlined onClick={() => deleteNote(note._id)} />
              <EditOutlined onClick={()=> getSingleNote(note._id)}/>
            </div>
            <div className="descContainer">
              <p>{note.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Add Note"
        open={isAddModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={addFrom} layout="vertical" onFinish={addNote}>
          <Form.Item name="title" label="Title">
              <Input placeholder="title"/>
          </Form.Item>
          <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="description"/>
          </Form.Item>
          <Button type="primary" htmlType="submit" danger loading={addButtonLoading}>Add</Button>
        </Form>
      </Modal>
      <Modal
        title="Edit Note"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={editNote}>
          <Form.Item name="title" label="Title">
              <Input placeholder="title"/>
          </Form.Item>
          <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="description"/>
          </Form.Item>
          <Button type="primary" htmlType="submit" danger loading={editButtonLoading}>Edit</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ListNotes;
