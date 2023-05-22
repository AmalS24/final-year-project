
import "../styles/Text.css";
import { useEffect, useState } from "react";

const Text = () => {

  const [data,setData] = useState({})

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/detect');
    eventSource.onmessage = (event) => {
      let json_data = JSON.parse(event.data)
      setData(json_data)
      console.log(data.text_arr)
      let fill = (json_data.c_frame / json_data.frames)*100
      document.querySelector('.circular-progress').style.background = `conic-gradient(#434ddb ${fill*3.6}deg, #d0daed 0deg)`
    };
    return () => {
      eventSource.close();
    };
  },[]);

  return (
    <div className="main">
      <div className="description">
        <p className="desc-content">
          <h2>TEXT DETECTION</h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="model-container">
        <div className="side-box-alpha">
          <p className="side-box-text-high">{data.c_frame}/{data.frames}</p>
          <p className="side-box-text-norm">Frames</p>

          <p className="side-box-text-high">🎞️</p>
          <p className="side-box-text-norm">video.mp4</p>
        </div>
        <div className="mid-box">
            <div className="circular-progress">
                <span className="progress-value">{ (data.c_frame*100 / data.frames).toFixed(2) }%</span>
            </div>
        <p className="side-box-text-high">🕛{data.time_stamp}s</p>
          <p id="verbose" className="side-box-text-norm">' {data.text}'</p>
        </div>
        <div className="side-box-beta">
          <p className="side-box-text-high">{data.text_arr ? data.text_arr.length : 0}</p>
          <p className="side-box-text-norm">Text found</p>
          {/* <img width={280} height={200} src="https://www.womanthology.co.uk/wp-content/uploads/2017/06/facescan.gif"/> */}
          {/* <p className="side-box-text-high">00.01.03</p> */}
          <p className="side-box-text-norm">{data.text_arr}</p>
        </div>
      </div>
    </div>
  );
};

export default Text;
