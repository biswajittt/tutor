import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import useAuth from "../../../../handler/useAuth.js";
import { useNavigate } from "react-router-dom";
export default function MentorProfile() {
  const navigate = useNavigate();
  //check user already loggedin or not
  const { isAuthenticated, user } = useAuth();
  console.log(user);
  // If the user is already logged in, redirect to the previous page
  useEffect(() => {
    // Navigate to the home page if the user is authenticated
    if (isAuthenticated === false) {
      navigate("/"); // Safely navigate after rendering
    }
  }, [isAuthenticated, navigate]); // Depend on isLoggedIn and navigate

  return (
    <ScrollArea className="border">
      <Card
        className="w-[350px]"
        style={{ margin: "auto", backgroundColor: "#ededed", width: "28rem" }}
      >
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Avatar className="w-16 h-16 m-auto">
                  <AvatarImage src={user?.mentorImage} alt="User" />
                  <AvatarFallback>Mentor</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  value={user?.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  value={user?.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  value={user?.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  value={user?.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  value={user?.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  value={user?.email}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter Your Email"
                  value={user?.phoneNumber}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </ScrollArea>
  );
}
