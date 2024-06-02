import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUserToken } from "@/utils/getUserToken";

const ImageUpload = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImageDataURL, setCapturedImageDataURL] = useState("null");
  const [price, setPrice] = useState(0);
  const event_id = router.query.eventId;

  const token = {
    billing_name: "CampusConnect",
    billing_address_line1: "Bulandshahr",
    billing_address_zip: "203001",
    billing_address_state: "36",
    billing_address_city: "Bulandshahr",
    billing_address_country: "India",
    billing_address_country_code: "IN",
    shipping_name: "CampusConnect",
    shipping_address_line1: "Bulandshahr",
    shipping_address_zip: "203001",
    shipping_address_state: "36",
    shipping_address_city: "Bulandshahr",
    shipping_address_country: "India",
    shipping_address_country_code: "IN",
  };

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const user_id = getUserToken();
      console.log(user_id);
      try {
        const response = await fetch(
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
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPrice(data.price);
          setProduct({
            name: data.name,
            price: data.price,
            description: data.description,
          });
        } else {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching event data:", error.message);
      }
    };

    if (event_id) {
      fetchEvent();
    }
  }, [event_id]);

  const handleToken = async (addresses = "null") => {
    // Fetching user_token cookie value in user_id
    const user_id = getUserToken();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            product,
            addresses,
            user: { user_id },
            event: { event_id },
          }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        alert("Successful Registered");
        router.push("/users/dashboard");
      } else if (data.status === "alreadyregistered") {
        alert("User is already registered.");
        router.push("/users/dashboard");
      } else {
        console.error(`Failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (capturedImageDataURL === "null") {
      alert("Please upload the image first");
      return;
    }

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

    if (response.status === 200) {
      if (price === 0) handleToken();
      else router.push(`/event/${event_id}/payment`);
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
