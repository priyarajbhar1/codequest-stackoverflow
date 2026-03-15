import React from "react";
import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Subscription() {

  const buyPlan = (plan: string) => {

    const hour = new Date().getHours();

    if (hour < 10 || hour > 11) {
      alert("Payments allowed only between 10 AM and 11 AM IST");
      return;
    }

    alert("Subscribed to " + plan);
  };

  return (
    <Mainlayout>
      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-6">
          Subscription Plans
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Free Plan</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Post 1 question per day
              </p>

              <Button
                className="w-full"
                onClick={() => buyPlan("Free Plan")}
              >
                Select
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bronze Plan</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                ₹100/month — 5 questions per day
              </p>

              <Button
                className="w-full"
                onClick={() => buyPlan("Bronze")}
              >
                Buy Bronze
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Silver Plan</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                ₹300/month — 10 questions per day
              </p>

              <Button
                className="w-full"
                onClick={() => buyPlan("Silver")}
              >
                Buy Silver
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gold Plan</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                ₹1000/month — Unlimited questions
              </p>

              <Button
                className="w-full"
                onClick={() => buyPlan("Gold")}
              >
                Buy Gold
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </Mainlayout>
  );
}