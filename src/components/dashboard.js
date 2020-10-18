import React, { useState } from "react";
import "./dashboard.css";

import { auth } from "../firebase";

import Button from "./button";

const Dashboard = () => {
  const userTiles = [
    <UserListTile>
      <th>1</th>
      <th>Bob</th>
      <th>Ross</th>
      <th>
        <a href="mailto:happy_trees@email.com">happy_trees@email.com</a>
      </th>
      <th>
        <a href="tel:4133625555">413-362-5555</a>
      </th>
      <th className="text-success">Active</th>
    </UserListTile>,
    <UserListTile>
      <th>2</th>
      <th>Chuck</th>
      <th>Norris</th>
      <th>
        <a href="mailto:happy_trees@email.com">angry_fist@email.com</a>
      </th>
      <th>
        <a href="tel:4133625555">413-362-5555</a>
      </th>
      <th className="text-success">Active</th>
    </UserListTile>,
  ];

  const accountDetails = [
    <th>index</th>,
    <th>First name</th>,
    <th>Last name</th>,
    <th>Email</th>,
    <th>Phone</th>,
    <th>Status</th>,
  ];

  return (
    <>
      <DashHeader />
      <ShowTable titleText="Customer list" tableHeaders={accountDetails}>
        {userTiles}
      </ShowTable>
    </>
  );
};

const DashHeader = () => {
  const [error, setError] = useState(null);

  const handleSignout = () => {
    auth.signOut().catch((error) => {
      setError("Error signing out");
      console.error("Error signing out", error);
    });
  };

  return (
    <div className="col-lg-10 container mx-auto m-2">
      <nav className="navbar p-2">
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Search..."
          onChange={(e) => console.log(e.target.value)}
        />
        {error && <p>{error}</p>}
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <Button
              type="button"
              labelText="Export"
              className="btn btn-outline-primary shadow-none"
              // onClick={handleSignout}
            />
            <Button
              type="button"
              labelText="Sign out"
              className="btn btn-outline-dark shadow-none"
              onClick={handleSignout}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

const ShowTable = ({ tableHeaders, children, titleText }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-10 px-md-4 mx-auto">
        <h2 className="mt-2 mb-4">{titleText}</h2>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const UserListTile = ({ children }) => <tr>{children}</tr>;

// const SideBar = () => (
//   <div className="col-md-3 col-lg-2 bg-dark sidebar">
//     <div className="p-4">
//       <ul className="nav mx-auto">
//         <li className="nav-item">Dashboard</li>
//         <li className="nav-item">Customers</li>
//         <li className="nav-item">New requests</li>
//         <li className="nav-item">Site content</li>
//       </ul>
//     </div>
//   </div>
// );

export default Dashboard;
