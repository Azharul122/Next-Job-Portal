"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  
} from "@/components/ui/navigation-menu"
import {  Company, Job } from "@prisma/client"
import Link from "next/link"

interface Category {
  id: string;
  categoryTitle: string;
  jobs: Job[]; 
}

interface PropsTypes {
  categories: Category[] | null; 
}

export function BrowsCategoryItems({categories}:PropsTypes) {
    // console.log(categories)
  return (
    <NavigationMenu className="z-[999]">
      <NavigationMenuList>
      <NavigationMenuItem>
          <NavigationMenuTrigger >Beows Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] sm:w-[250px]  scrollbar-thin scrollbar-thumb-gradient-start scrollbar-track-gradient-end h-[21rem] overflow-y-scroll  gap-3 p-4 md:w-[600px] md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:w-[700px] ">
              {categories && categories.length>0 &&categories.map((component) => (
                <Link
                  key={component.id}
                  
                  href={`/search?categoryId=${component.id}`}
                  className="truncate flex items-center text-sm gap-2 border dark:border-dark-border border-light-border px-3 py-2 h-[3rem] bg-lightbg dark:bg-darkbg text-justify shadow-xl backdrop-blur-md shrink-0"
                >
                  {component.categoryTitle} <span className={`${component.jobs.length>0?"text-gradient-start":"hidden"}`}>({component.jobs.length})</span>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
