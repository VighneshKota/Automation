"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Blog", href: "/dashboard/generate/blog" },
  { name: "LinkedIn", href: "/dashboard/generate/linkedin" },
  { name: "Video", href: "/dashboard/generate/video" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { userProfile, signOut } = useAuth();
  const getInitials = (name: string) => name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) || 'U';

  return (
    <div className="flex items-center space-x-2 md:space-x-4 text-sm font-medium">
      <nav className="flex items-center space-x-2 md:space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "transition-colors hover:text-white px-3 py-2 rounded-md",
              pathname.startsWith(item.href) && item.href !== '/dashboard' || pathname === item.href
                ? "bg-zinc-800 text-white"
                : "text-zinc-400"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ml-2 focus:outline-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name} />
              <AvatarFallback>{getInitials(userProfile?.full_name)}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium leading-none">{userProfile?.full_name || 'User'}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="flex items-center cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
