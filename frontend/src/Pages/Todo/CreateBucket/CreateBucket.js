import React,{useState} from 'react'
import axios from "axios";
import backendConfig from "../../../backendConfig";

const CreateBucket = () => {

    const [bucket, setBucket] = useState("");
    const handleCreateBucket = async () => {
      try {
        let response = await axios.post(
          `${backendConfig.baseUrl}/api/create_bucket/`,
          {
            bucket: bucket,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Bucket Name"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onInput={(event) => setBucket(event.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleCreateBucket}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
}

export default CreateBucket
