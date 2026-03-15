import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { Calendar, Edit, Plus, X } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [users, setusers] = useState<any>(null);
  const [loading, setloading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    about: "",
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState("");

  // ⭐ transfer points state
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axiosInstance.get("/user/getalluser");

        const matcheduser = res.data.data.find((u: any) => u._id === id);

        if (matcheduser) {
          setusers(matcheduser);

          setEditForm({
            name: matcheduser.name || "",
            about: matcheduser.about || "",
            tags: matcheduser.tags || [],
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    if (id) fetchuser();
  }, [id]);

  if (loading) {
    return (
      <Mainlayout>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </Mainlayout>
    );
  }

  if (!users) {
    return <div className="text-center text-gray-500 mt-4">No user found.</div>;
  }

  const handleSaveProfile = async () => {
    try {
      const res = await axiosInstance.patch(`/user/update/${user?._id}`, {
        editForm,
      });

      if (res.data.data) {
        const updatedUser = {
          ...users,
          name: editForm.name,
          about: editForm.about,
          tags: editForm.tags,
        };

        setusers(updatedUser);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();

    if (trimmedTag && !editForm.tags.includes(trimmedTag)) {
      setEditForm({
        ...editForm,
        tags: [...editForm.tags, trimmedTag],
      });

      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditForm({
      ...editForm,
      tags: editForm.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // ⭐ transfer points function
  const handleTransferPoints = async () => {

  // frontend validation
  if (!receiverId || !amount) {
    toast.error("Please enter receiver ID and amount");
    return;
  }

  try {
    const res = await axiosInstance.post("/user/transferpoints", {
      senderId: user?._id,
      receiverId,
      amount: Number(amount),
    });

    toast.success(res.data.message);

    setReceiverId("");
    setAmount("");

  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Transfer failed");
  }
};

  const currentUserId = user?._id;
  const isOwnProfile = id === currentUserId;

  return (
    <Mainlayout>
      <div className="max-w-6xl">

        {/* USER HEADER */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">

          <Avatar className="w-24 h-24 lg:w-32 lg:h-32">
            <AvatarFallback className="text-2xl lg:text-3xl">
              {users.name
                ?.split(" ")
                .map((n: any) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">

            <div className="flex justify-between mb-4">

              <h1 className="text-2xl font-bold">{users.name}</h1>

              {isOwnProfile && (
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                   <Button
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      Edit Profile
                    </Button>
                  </DialogTrigger>

                  <DialogContent>

                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">

                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Display name"
                      />

                      <Textarea
                        value={editForm.about}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            about: e.target.value,
                          })
                        }
                      />

                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag"
                        />

                        <Button onClick={handleAddTag}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {editForm.tags.map((tag) => (
                          <Badge key={tag}>
                            {tag}
                            <X
                              className="ml-1 w-3 h-3 cursor-pointer"
                              onClick={() => handleRemoveTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>

                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>

                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* MEMBER INFO */}

            <div className="flex items-center gap-4 text-sm text-gray-600">

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Member since{" "}
                {new Date(users.joinDate).toISOString().split("T")[0]}
              </div>

              {/* ⭐ POINTS */}

              <div className="bg-yellow-100 px-3 py-1 rounded-md">
                ⭐ {users?.points ?? 0} Points
              </div>

            </div>
          </div>
        </div>

        {/* ABOUT */}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>

          <CardContent>
            {users.about || "No description added"}
          </CardContent>
        </Card>

        {/* TAGS */}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Top Tags</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-2 flex-wrap">
            {users.tags?.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </CardContent>
        </Card>

        {/* ⭐ TRANSFER POINTS */}

        {isOwnProfile && (
          <Card>
            <CardHeader>
              <CardTitle>Transfer Reward Points</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">

              <Input
                placeholder="Receiver User ID"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
              />

              <Input
                type="number"
                placeholder="Points"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Button
                onClick={handleTransferPoints}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
              >
                Transfer Points
              </Button>

            </CardContent>
          </Card>
        )}

      </div>
    </Mainlayout>
  );
};

export default index;