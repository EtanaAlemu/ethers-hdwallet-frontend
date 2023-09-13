"use client";
// Import statements should be separated and ordered correctly.
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { API } from "@/utilities/axios";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { Eye, EyeOff } from "lucide-react";
import { error, succuss } from "@/components/modals/notify";

export default function Wallet() {
  const savedEthB = localStorage.getItem("eth");
  const savedMttB = localStorage.getItem("mtt");
  const [eth, setEth] = useState(savedEthB ? savedEthB : "");
  const [mtt, setMtt] = useState(savedMttB ? savedMttB : "");

  // Use useEffect to fetch data after component is mounted.
  useEffect(() => {
    const balance = async () => {
      try {
        const ethBalance = await API.get("/getEthBalance");
        const tokenBalance = await API.get("/getTokenBalance");

        if (ethBalance.status === 200) {
          setEth(ethBalance.data.balance);
          localStorage.setItem("eth", ethBalance.data.balance);
        }
        if (tokenBalance.status === 200) {
          setMtt(tokenBalance.data.balance), localStorage.setItem("mtt", tokenBalance.data.balance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    balance();
  }, []); // Empty dependency array means this effect runs once after mount.

  const [data, setData] = useState({
    toAddress: "",
    amount: "",
  });
  const [isPwVisible, setIsPwVisible] = React.useState(false);
  const toggleVisibility = () => setIsPwVisible(!isPwVisible);
  const [loading, setLoading] = useState(false); // Track loading state
  const [apiError, setApiError] = useState(null); // Track API error
  const router = useRouter(); // Initialize router

  const [openTab, setOpenTab] = React.useState(1);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const sendEth = async () => {
    setLoading(true);
    setApiError(null); // Reset API error before making the request
    try {
      const response = await API.post("/sendEthToAddr", data);
      console.log("Response:", response.data);
      if (response.status === 200) {
        setLoading(false);
        setData({ toAddress: "", amount: "" });
        succuss(response.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };
  const sendToken = async () => {
    setLoading(true);
    setApiError(null); // Reset API error before making the request
    try {
      const response = await API.post("/sendTokenToAddr", data);
      console.log("Response:", response.data);
      if (response.status === 200) {
        setLoading(false);
        setData({ toAddress: "", amount: "" });
        succuss(response.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div>
      <p>Address: {localStorage.getItem("address")}</p>
      <p>ETH Balance: {eth || "No balance"}</p>
      <p>Token Balance: {mtt || "No balance"}</p>

      <div className="flex items-center justify-center w-full pt-10 max-h-screen">
        <Card>
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " + (openTab === 1 ? "text-white bg-blue-500" : "text-blue-500 bg-white")}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Send ETH
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " + (openTab === 2 ? "text-white bg-blue-500" : "text-blue-500 bg-white")}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Send Token
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      <Input className="p-4" type="text" name="amount" label="amount" value={data.amount} onChange={handleChange} placeholder="Enter amount" />
                      <Input className="p-4" type="text" name="toAddress" label="receiver" value={data.receiver} onChange={handleChange} placeholder="Enter receiver address" />
                      <Button color="primary" onClick={sendEth} isLoading={loading}>
                        Send
                      </Button>
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <Input className="p-4" type="text" name="amount" label="amount" value={data.amount} onChange={handleChange} placeholder="Enter amount" />
                      <Input className="p-4" type="text" name="toAddress" label="receiver" value={data.receiver} onChange={handleChange} placeholder="Enter receiver address" />
                      <Button color="primary" onClick={sendToken} isLoading={loading}>
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
