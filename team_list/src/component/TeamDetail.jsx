import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TeamDetail = ({ id, open, setOpen, setId }) => {
  const dispatch = useDispatch();
  const teamData = useSelector((state) =>
    state?.teamList.find((team) => team.id == id)
  );
  console.log(teamData);

  const [form] = Form.useForm();
  const [inputList, setInputList] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [formData, setFormData] = useState({});

  const uid = () => {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, "");
  };

  const createTeam = (values) => {
    values.id = uid();
    dispatch({ type: "createTeam", payload: values });
    form.resetFields();
  };

  const updateTeam = (values) => {
    dispatch({ type: "updateTeam", payload: { id: id, updatedData: values } });
    form.resetFields();
  };

  const addInput = () => {
    setInputList([...inputList, ""]);
  };

  const removeInput = (index) => {
    const newList = [...inputList];
    newList.splice(index, 1);
    setInputList(newList);
  };

  const onNameChange = (e) => {
    const { value } = e.target;
    setTeamName(value);
    setFormData({ ...formData, name: teamName });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        !id ? createTeam(values) : updateTeam(values);
        form.resetFields();
        setOpen(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setOpen(false);

    form.resetFields();

    setId(null);
  };

  return (
    
      <>
        <Modal
          title={!!id ? `${teamData?.name} Team Details` : "Add New Team"}
          open={open}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleReset}>Reset</Button>,
            <Button onClick={handleOk}>
              {!!id ? "Update Team" : "Create Team"}
            </Button>,
          ]}
        >
          {!!id ? (
            <div className='flex justify-end m-1'>
              <Button
                type='primary'
                danger
                onClick={() => {
                  dispatch({ type: "deleteTeam", payload: { id: id } });
                  setId(null);
                  handleCancel();
                }}
              >
                Delete
              </Button>
            </div>
          ) : (
            <></>
          )}

          <Form
            form={form}
            name='Team List'
            autoComplete='off'
            initialValues={{
              name: id ? teamData?.name : "",
              members: id ? [...teamData?.members] : [],
            }}
          >
            <Form.Item
              label='name'
              name='name'
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input
                onChange={onNameChange}
                placeholder=' Team Name'
                allowClear
              />
            </Form.Item>

            <Form.List name='members'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                      <Form.Item
                        {...restField}
                        name={[name]}
                        // fieldKey={[fieldKey]}
                        rules={[
                          { required: true, message: "Input is required" },
                        ]}
                      >
                        <Input placeholder='Enter Name' />
                      </Form.Item>
                      <Button
                        className='ml-2 p-1  rounded-full w-8 '
                        type='primary'
                        danger
                        onClick={() => {
                          removeInput(key);
                          remove(name);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => {
                        add();
                        addInput();
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add Member
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      </>
    
  );
};

export default TeamDetail;
