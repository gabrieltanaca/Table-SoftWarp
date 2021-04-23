import React from "react";

import { Container } from "./styles";

import { RiDashboardFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";

const SideBar: React.FC = () => {
  return (
    <Container>
      <div>
        <RiDashboardFill size="24" />
        <h1>Dashboard</h1>
      </div>

      <div>
        <HiUsers />
        <h1>Users</h1>
      </div>
    </Container>
  );
};

export default SideBar;
