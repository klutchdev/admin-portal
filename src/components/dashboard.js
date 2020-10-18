import React from "react";
import "./dashboard.css";

import { firestore, handleSignout } from "../firebase";

import Button from "./button";
// import UserContext from "../providers/UserProvider";
// const user = useContext(UserContext);

const userRecords = firestore.collection("registered-accounts");

const Dashboard = () => (
  <>
    <DashHeader />
    <ShowTable />
  </>
);

const DashHeader = () => (
  <div className="col-lg-10 container mx-auto m-2">
    <nav className="navbar p-2">
      <input
        className="form-control form-control-sm search-bar"
        type="text"
        placeholder="Search..."
      />
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group mr-2">
          <Button
            type="button"
            labelText="Export"
            className="btn btn-outline-primary shadow-none"
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

const UserListTile = ({ doc }) => (
  <tr>
    <th>{doc.firstName}</th>
    <th>{doc.lastName}</th>
    <th>
      <a href={"mailto:" + doc.email}>{doc.email}</a>
    </th>
    <th>
      <a href={"tel:" + doc.phone}>{doc.phone}</a>
    </th>
    <th>{doc.tobaccoId}</th>
    <th>{doc.memberSince}</th>
  </tr>
);

const ShowTable = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 px-md-4 mx-auto">
          <h2 className="mt-2 mb-4">Customer list</h2>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Phone </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userRecords.onSnapshot((querySnapshot) => {
                  const userTiles = querySnapshot.docs.map((doc) => (
                    <UserListTile doc={doc.data()} />
                  ));
                  userTiles.join("");
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
