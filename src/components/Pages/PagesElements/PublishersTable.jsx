import React, { useEffect, useState } from "react";
import { getAllPublishers } from "../../../services/PublishersService";
import Spinner from "./Spinner";

const PublishersTable = ({ publishers }) => {

  return (

    <table id="publishers-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {publishers.map((publisher) => (
          <tr key={publisher.id}>
            <td>{publisher.name}</td>
            <td>{publisher.adress}</td>
            <td>{publisher.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PublishersTable;