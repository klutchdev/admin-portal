import React, { useState, useContext } from "react";
import "./dashboard.css";

import { firestore, auth } from "../firebase";

import Button from "./button";
import UserContext from "../providers/UserProvider";

let unsubscribe;

const userRecords = firestore.collection("registered-accounts");

const UserListTile = (doc) => (
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

const Dashboard = () => {
  const user = useContext(UserContext);
  return (
    <>
      <DashHeader />
      <ShowTable titleText="Customer list">
        {user
          ? (unsubscribe = userRecords
              .where("uid", "==", user.uid)
              .onSnapshot((querySnapshot) => {
                const userTiles = querySnapshot.docs.map((doc) => (
                  <UserListTile doc={doc} />
                ));
                return userTiles.join("");
              }))
          : unsubscribe && unsubscribe()}
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
          className="form-control form-control-sm search-bar"
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

const ShowTable = ({ children, titleText }) => {
  const tableHeaders = [
    <th>User ID</th>,
    <th>First name</th>,
    <th>Last name</th>,
    <th>Email</th>,
    <th>Phone </th>,
    <th>Status</th>,
  ];

  return (
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
};

export default Dashboard;
