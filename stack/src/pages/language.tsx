// @ts-nocheck
import React, { useState } from "react";
import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LanguagePage() {

  const [language, setLanguage] = useState("English");

  const changeLanguage = (lang) => {

    if (lang === "French") {
      alert("OTP sent to registered email for verification");
    } else {
      alert("OTP sent to registered mobile number");
    }

    setLanguage(lang);
  };

  return (
    <Mainlayout>
      <div className="max-w-2xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-6">
          Select Language
        </h1>

        <Card>

          <CardContent className="p-6 space-y-4">

            <p className="text-gray-600">
              Current Language: <b>{language}</b>
            </p>

            <div className="grid grid-cols-2 gap-3">

              <Button onClick={() => changeLanguage("English")}>
                English
              </Button>

              <Button onClick={() => changeLanguage("Spanish")}>
                Spanish
              </Button>

              <Button onClick={() => changeLanguage("Hindi")}>
                Hindi
              </Button>

              <Button onClick={() => changeLanguage("Portuguese")}>
                Portuguese
              </Button>

              <Button onClick={() => changeLanguage("Chinese")}>
                Chinese
              </Button>

              <Button onClick={() => changeLanguage("French")}>
                French
              </Button>

            </div>

          </CardContent>

        </Card>

      </div>
    </Mainlayout>
  );
}