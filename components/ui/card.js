import React from "react";
import { Card as MCard, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function Card({ children }) {
  return (
    <div className="flex items-center justify-center w-full pt-10 max-h-screen">
      <MCard className="w-[400px]">
        <CardBody>{children}</CardBody>
        
      </MCard>
    </div>
  );
}
