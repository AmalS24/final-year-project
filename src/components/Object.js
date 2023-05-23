import React from "react";
import "../styles/Object.css";

const Object = () => {
  return (
    <div className="main-container">
      <div className="model-box">
        <div className="model-output">
          <div className="frame-container">
          <img
    src="http://localhost:5000/video_feed"
    alt="Video"
    width={470}
    // height={}
   />
          </div>
          {/* <div className="status">
            <p>🎞️ 234/4435</p>
            <p>80%:Running...</p>
            <p>📦Objects X 23</p>
          </div> */}
        </div>
        <div className="model-input">
          <input type="file" />
          <button className="btn">
            Proceed
          </button>
        </div>
      </div>
      <div className="description">
        
        <p className="desc-content">
          <h2>OBJECT DETECTION</h2>
          The object detection model looks through out the video
          taking each frame by frame, and grabs each object and keeps 
          a list of all the infered object thereby allowing 
          the user to look for a particular item within the video
          The results from feed appper here ...
        </p>
        <div className="object-list">

        </div>
      </div>
    </div>
  );
};

export default Object;
