import React, { useRef, useState, useEffect } from "react";

const ImageUpload = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImageDataURL, setCapturedImageDataURL] = useState("null");

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing webcam", error);
      }
    };

    enableVideoStream();
  }, []);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [videoRef, mediaStream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current.videoWidth,
        videoRef.current.videoHeight
      );
      setCapturedImageDataURL(canvasRef.current.toDataURL("image/png"));
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="400" height="300" />
      <button onClick={handleCapture}>Capture Image</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* Display the captured image */}
      <img
        src={capturedImageDataURL}
        width={400}
        height={300}
        alt="Captured Image"
      />
    </div>
  );
};

export default ImageUpload;
