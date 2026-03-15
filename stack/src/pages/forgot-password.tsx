import React, { useState } from "react";
import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const generatePassword = () => {

    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let pass = "";

    for (let i = 0; i < 8; i++) {
      pass += letters[Math.floor(Math.random() * letters.length)];
    }

    alert("Generated password: " + pass);
  };

  return (
    <Mainlayout>
      <div className="max-w-xl mx-auto p-6">

        <Card>

          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <Input
              placeholder="Enter email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              className="w-full"
              onClick={generatePassword}
            >
              Generate New Password
            </Button>

          </CardContent>

        </Card>

      </div>
    </Mainlayout>
  );
}