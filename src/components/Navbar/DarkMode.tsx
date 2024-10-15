"use client"

import * as React from "react"

import { FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="!focus-visible:ring-0 focus-visible:ring-offset-0 " variant="ghost" size="icon">
          {/* <GradientIcon style={{ fill: 'url(#gradient)' }} id="gradient"  icon={<FaSun className="h-[1.2rem] w-[1.2rem]"/>}/> */}
          {/* <GradientIcon style={{ fill: 'url(#gradient)' }} id="gradient" icon={<FaMoon className="absolute h-[1.2rem] w-[1.2rem]"/>}/> */}
          <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 !outline-none " />
          <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 !outline-none" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
