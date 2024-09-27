"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"







interface propsTypes {
    options: { label: string, value: string }[],
    heading: string,
    value?: string,
    onChange: (value: string) => void
}

const ComboBox = ({ options, heading, onChange, value }: propsTypes) => {
    console.log(options)
    const [open, setOpen] = React.useState(false)
    // const [value, setValue] = React.useState("")
    console.log(value)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : "Select option..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search option..." />
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue);
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ComboBox





// "use client";

// import * as React from "react";
// import { Check, ChevronsUpDown, Search } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ListItem } from "./list-item";


// interface ComboboxProps {
//   options: { label: string; value: string }[];
//   value?: string;
//   onChange: (value: string) => void;
//   heading: string;
// }

//   const Combobox = ({
//   options,
//   value,
//   onChange,
//   heading,
// }: ComboboxProps) => {
//   const [open, setOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [filtered, setFiltered] = React.useState<
//     { label: string; value: string }[]
//   >([]);

//   const handleSearchTerm = (e: any) => {
//     setSearchTerm(e.target.value);
//     setFiltered(
//       options.filter((item) =>
//         item.label.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   };

//   console.log(value)

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-full justify-between"
//         >
//           {value
//             ? options.find((option) => option.value === value)?.label
//             : "Select option..."}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-full p-0 md:min-w-96">
//         <Command>
//           <div className="w-full px-2 py-1 flex items-center border rounded-md border-gray-100">
//             <Search className="mr-2 h-4 w-4 min-w-4" />
//             <input
//               type="text"
//               placeholder="Search category"
//               onChange={handleSearchTerm}
//               className="flex-1 w-full outline-none text-sm py-1"
//             />
//           </div>
//           <CommandList>
//             <CommandGroup heading={heading}>
//               {searchTerm === "" ? (
//                 options.map((option) => (
//                   <ListItem
//                     key={option.value}
//                     category={option}
//                     onSelect={() => {
//                       onChange(option.value === value ? "" : option.value);
//                       setOpen(false);
//                     }}
//                     isChecked={option?.value === value}
//                   />
//                 ))
//               ) : filtered.length > 0 ? (
//                 filtered.map((option) => (
//                   <ListItem
//                     key={option.value}
//                     category={option}
//                     onSelect={() => {
//                       onChange(option.value === value ? "" : option.value);
//                       setOpen(false);
//                     }}
//                     isChecked={option?.value === value}
//                   />
//                 ))
//               ) : (
//                 <CommandEmpty>No Category Found</CommandEmpty>
//               )}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };


// export default Combobox