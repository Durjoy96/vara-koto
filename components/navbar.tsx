"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Plus, LogOutIcon, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser, signOut } from "@/lib/supabase/auth";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignInButton from "./log-in-button";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUser().then((u) => setUser(u));
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <nav className="py-4 border-b">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <div>
          <Link href="/">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
              <span className="text-primary">ন্যায্য</span> ভাড়া
            </h3>
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <Link href="/add">
            <Button variant="secondary" className="cursor-pointer">
              <Plus className="w-4 h-4" /> ভাড়া যুক্ত করুন
            </Button>
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full cursor-pointer"
                >
                  <Avatar>
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || ""}
                      alt="User avatar"
                    />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="cursor-pointer text-foreground focus:bg-muted focus:text-foreground"
                  >
                    <UserIcon className="mr-2 h-4 w-4 stroke-foreground" />
                    প্রোফাইল
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-muted"
                >
                  <LogOutIcon className="mr-2 h-4 w-4 stroke-destructive" />
                  লগ আউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </nav>
  );
}
