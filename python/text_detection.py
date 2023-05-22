import cv2
import json
import pytesseract
from flask_cors import CORS
from flask import Flask, Response


app = Flask(__name__)
CORS(app)


@app.route('/detect')
def text_detect():
    def process_video():
        
        # Open the video file and start processing the frames
        cap = cv2.VideoCapture('video.mp4')
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        arr = []

    
        while True:

            # Read the video frame
            ret, frame = cap.read()

            # If the frame is not valid, break out of the loop
            if not ret:
                break
            
            
            current_frame = int(cap.get(cv2.CAP_PROP_POS_FRAMES))
            # print(current_frame,total_frames)

            # Convert the frame to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # Apply thresholding to remove noise and enhance the text
            thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

            # Perform OCR on the thresholded image
            text = pytesseract.image_to_string(thresh)
            if text not in arr:
                arr.append(text)

            # Get the current time stamp
            timestamp = round(cap.get(cv2.CAP_PROP_POS_MSEC)/1000,2)
            # Print the detected text and the time stamp to the terminal
            # text = f'[{timestamp}]s ==> {text}'
                    
            
            data = {
                "time_stamp": timestamp, 
                "text": text,
                "frames":total_frames,
                "c_frame":current_frame,
                "text_arr": arr
                }
            yield f"data: {json.dumps(data)}\n\n"
            
        cap.release()
        cv2.destroyAllWindows()
            
    return Response(process_video(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
