import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TeamList = ({ setId, setOpen }) => {
  const teamData = useSelector((state) => state?.teamList);

  const [openDrawer, setDrawerOpen] = useState(false);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <div className='flex justify-center h-[100vh] items-center '>
        <Link to={"/teams"}>
          {" "}
          <Button onClick={showDrawer}>Open Team List</Button>
        </Link>
      </div>
      <Drawer
        title='Team List'
        onClose={onClose}
        open={openDrawer}
        placement={"left"}
      >
        <Link to='/CreateTeam'>
          <Button
            className='m-1'
            onClick={() => {
              setId(null);
              setOpen(true);
              onClose();
            }}
          >
            Create Team
          </Button>
        </Link>

        {teamData?.map((item) => (
          <Link to={item?.name} key={item.id}>
            <p
              className='font-semibold text-lg cursor-pointer hover:border-2 border-gray-400 p-2 rounded-md flex justify-between items-center mt-2 '
              onClick={() => {
                setId(item?.id);
                onClose();
                setOpen(true);
              }}
            >
              <span>{item.name}</span>{" "}
              <span className='border-2 border-black ml-5  rounded-full w-10 flex items-center justify-center'>
                {item.members.length}
              </span>
            </p>
          </Link>
        ))}
      </Drawer>
    </>
  );
};

export default TeamList;
