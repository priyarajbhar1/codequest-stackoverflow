import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AskQuestion = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to ask a question");
      router.push("/auth");
      return;
    }

    if (!formData.title || !formData.body) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axiosInstance.post("/question/ask", {
        questiontitle: formData.title,
        questionbody: formData.body,
        questiontags: formData.tags,
        userposted: user.name,
        userid: user._id,
      });

      console.log(res.data);

      toast.success("Question posted successfully");

      router.push("/questions");
    } catch (error: any) {
      console.log(error?.response?.data || error);

      toast.error(
        error?.response?.data?.message || "Failed to post question"
      );
    }
  };

  const handleAddTag = (e: any) => {
    e.preventDefault();

    const trimmedTag = newTag.trim();

    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <Mainlayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl lg:text-2xl font-semibold mb-6">
          Ask a public question
        </h1>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">
                Writing a good question
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  Title
                </Label>

                <p className="text-sm text-gray-600 mb-2">
                  Be specific and imagine you're asking a question to another
                  person.
                </p>

                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. How to center a div in CSS?"
                />
              </div>

              <div>
                <Label htmlFor="body" className="text-base font-semibold">
                  What are the details of your problem?
                </Label>

                <p className="text-sm text-gray-600 mb-2">
                  Introduce the problem and expand on what you put in the title.
                </p>

                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={handleChange}
                  placeholder="Describe your problem in detail..."
                  className="min-h-40"
                />
              </div>

              <div>
                <Label className="text-base font-semibold">Tags</Label>

                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                  />

                  <Button
                    onClick={handleAddTag}
                    type="button"
                    className="bg-orange-600 text-white"
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag}>
                      {tag}

                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button type="submit" className="bg-blue-600 text-white">
                Review your question
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </Mainlayout>
  );
};

export default AskQuestion;