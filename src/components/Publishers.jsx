import React, { useEffect, useState } from "react";
import { getAllPublishers } from "../services/PublishersService";
import Spinner from "./Spinner";

const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // const [message, setMessage] = useState('');



    useEffect(() => {
        async function getPublishersFromDB() {
            setIsLoading(true);
            try {
                const publishersFromDB = await getAllPublishers();
                setTimeout(() => {
                    setPublishers(publishersFromDB);
                    setIsLoading(false); 
                }, 1000);

            } catch (error) {
                if (error.status) {
                    if (error.status === 500){
                        setErrorMessage("Server error. Please try later.")
                    }
                }else if (error.request){
                    setErrorMessage("No answer from server")
                }else{
                    setErrorMessage("An error occured")
                }
                console.log("An error occurred while fetching Publishers:", error);  
                setIsLoading(false);              
            }
        }

        getPublishersFromDB();
    }, []);

    if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }


    console.log(publishers)
    return (
        <div className="table-container">
      <table>
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
              <td>{publisher.address}</td>
              <td>{publisher.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Publishers;