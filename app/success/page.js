"use client";

import Card from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { API } from "@/utilities/axios";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { Eye, EyeOff } from 'lucide-react';
import {  toast } from 'react-toastify';
 
export default function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isPwVisible, setIsPwVisible] = React.useState(false);
  const toggleVisibility = () => setIsPwVisible(!isPwVisible);
  const [loading, setLoading] = useState(false); // Track loading state
  const [apiError, setApiError] = useState(null); // Track API error
  const router = useRouter(); // Initialize router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    setApiError(null); // Reset API error before making the request
    try {
      const response = await API.post("/register", data);
      console.log("Response:", response.data);
      if (response.status === 201) {
        setLoading(false);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("address", response.data.user.address);
        localStorage.setItem("id", response.data.user.id);

        router.push("/success"); // Navigate to the success page
      }
    } catch (error) {
      console.error("Error:", error);
      setApiError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };
  
  const notify = () => toast("Wow so easy!");
 
  return (
    <div className="flex items-center justify-center w-full pt-10 max-h-screen">
      <Card>
        
        
        <div className="flex flex-col m-8">
          <p className="text-center text-lg">Success</p>
        </div>
        
        <Button color="primary" onClick={notify} >
          Login to continue
        </Button>
      </Card>
    </div>
  );
}
