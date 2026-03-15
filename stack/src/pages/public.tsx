// @ts-nocheck
import React, { useState } from "react";
import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PublicPage() {

  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const friends = 2;

  const addPost = () => {

    if (friends === 0) {
      alert("Add friends to post");
      return;
    }

    if (friends === 1 && posts.length >= 1) {
      alert("Only 1 post allowed per day");
      return;
    }

    if (friends === 2 && posts.length >= 2) {
      alert("Only 2 posts allowed per day");
      return;
    }

    setPosts([...posts, post]);
    setPost("");
  };

  return (
    <Mainlayout>
      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-4">
          Public Feed
        </h1>

        <div className="flex gap-3 mb-6">

          <Input
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Write a post..."
          />

          <Button onClick={addPost}>
            Post
          </Button>

        </div>

        {posts.map((p, i) => (
          <Card key={i} className="mb-4">
            <CardContent className="p-4">
              {p}
            </CardContent>
          </Card>
        ))}

      </div>
    </Mainlayout>
  );
}