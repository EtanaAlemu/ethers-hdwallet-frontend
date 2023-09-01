"use client";

import Card from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { API } from "@/utilities/axios";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { Eye, EyeOff } from 'lucide-react';
import { error, succuss } from "@/components/modals/notify";

 
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
        succuss(response.data.message)
        router.push("/login"); // Navigate to the success page
      }
    } catch (err) {
      console.error("Error:", err);
      error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };
  
 
  return (
    <div className="flex items-center justify-center w-full pt-10 max-h-screen">
      <Card>
        
        
        <div className="flex flex-col">
          <p className="text-md">Signup</p>
        </div>
        <Input isRequired required className="p-4" type="text" name="username" label="Username" value={data.username} onChange={handleChange} placeholder="Enter your username" />
        <Input isRequired required className="p-4" name="password" label="Password" value={data.password} onChange={handleChange} placeholder="Enter your password"  endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isPwVisible ? (
            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <Eye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
        } type={isPwVisible ? "text" : "password"}/>
        <Input isRequired required className="p-4" name="confirm_pw" label="Confirm Password" value={data.confirm_pw} onChange={handleChange} placeholder="Re-enter your password"  endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isPwVisible ? (
            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <Eye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
        } type={isPwVisible ? "text" : "password"}/>
        <Button color="primary" onClick={handleSubmit} isLoading={loading}>
          Signup
        </Button>
      </Card>
    </div>
  );
}
