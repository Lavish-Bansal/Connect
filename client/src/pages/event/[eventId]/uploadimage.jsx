import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Content } from "next/font/google";

const ImageUpload = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImageDataURL, setCapturedImageDataURL] = useState("null");
  const eventId = router.query.eventId;

  const handleUpload = async () => {
    if (capturedImageDataURL === "null") {
      alert("Please upload the image first");
      return;
    }

    console.log(capturedImageDataURL);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/studentimages`,
      {
        method: "POST",
        crossDomain: "true",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          base64: capturedImageDataURL,
        }),
      }
    );

    const event_id = router.query.eventId;
    const responseForPrice = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/getevent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: event_id,
        }),
      }
    );

    console.log(responseForPrice);
    if (responseForPrice.ok) {
      const data = await responseForPrice.json();
      if (data.price == 0) {
        alert("Registration successfull");
        router.push("/users/dashboard");
      }
    } else if (response.status === 200) {
      router.push(`/event/${eventId}/payment`);
    } else {
      console.error(`Failed with status code ${response.status}`);
      alert("Please try after sometime");
    }
  };

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
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "beige",
        // display: "flex",
      }}
    >
      <video ref={videoRef} autoPlay muted width="400" height="300" />
      <button
        onClick={handleCapture}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Capture Image
      </button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* Display the captured image */}
      <img
        src={capturedImageDataURL}
        width={400}
        height={300}
        alt="Captured Image"
        style={{ border: "2px solid red" }}
      />

      <button
        onClick={handleUpload}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;
