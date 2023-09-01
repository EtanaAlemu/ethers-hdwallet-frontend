"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";

export default function App() {
  return (
    <div className="p-5 flex items-center">
      <Input type="text" placeholder="search ..." />
      <Button color="primary">Button</Button>
    </div>
  );
}
