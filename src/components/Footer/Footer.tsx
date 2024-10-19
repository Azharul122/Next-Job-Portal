
"use client";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import logo from "@/images/logo.png";


const menuOne = [
  { href: "#", label: "About" },
  { href: "#", label: "Company" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Blog" },
];
const menuTwo = [
  { href: "#", label: "About" },
  { href: "#", label: "Contact Support" },
  { href: "#", label: "Help Resources" },
  { href: "#", label: "Release Updates" },
];
const menuThree = [
  { href: "#", label: "Platform" },
  { href: "#", label: "Terms & Privacy" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "FAQ" },
];
const menuFour = [
  { href: "#", label: "Contact" },
  { href: "#", label: "Send a Message" },
  { href: "#", label: "Request a Quote" },
  { href: "#", label: "+123-456-7890" },
];

const Footer = () => {
  return (

    <>

      <div className="flex items-end w-full  dark:bg-darkbg bg-lightbg">

        <footer className="w-full text-gray-700 dark:text-white dark:bg-darkbg bg-lightbg body-font">
          <div
            className="container flex flex-col flex-wrap px-5 py-8 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
            <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
              <Link href="" className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
                <Image src={logo} height={50} width={50} alt="" />
              </Link>
              <p className="mt-2 text-sm text-gray-500">Design, Code and Ship!</p>
              <div className="mt-4">
                <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">


                  <Link href="" className="text-gray-500 cursor-pointer hover:text-gray-700 size-7 rounded-full border-2 backdrop-blur-xl shadow-xl dark:border-slate-700 border-light-border  flex items-center justify-center">
                    <FaFacebook className="size-5 text-slate-700" />
                  </Link>
                  <Link href="" className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700 size-7 rounded-full border-2 backdrop-blur-xl shadow-xl dark:border-slate-700 border-light-border  flex items-center justify-center">
                    <FaTwitter className="size-5 text-slate-700" />
                  </Link>
                  <Link href="" className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700 size-7 rounded-full border-2 backdrop-blur-xl shadow-xl dark:border-slate-700 border-light-border  flex items-center justify-center">
                    <FaInstagram className="size-5 text-slate-700" />
                  </Link>
                  <Link href="" className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700 size-7 rounded-full border-2 backdrop-blur-xl shadow-xl dark:border-slate-700 border-light-border  flex items-center justify-center">
                    <FaLinkedinIn size={20} className="text-slate-700" />
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 dark:text-lightbg/60 uppercase title-font">About</h2>
                <nav className="mb-10 list-none">
                  {
                    menuOne.map((manu, idx) => (
                      <li key={idx} className="mt-3">
                        <Link href={manu.href} className="text-gray-500 cursor-pointer hover:text-gray-900">{manu.label}</Link>
                      </li>
                    ))
                  }
                  
                </nav>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 dark:text-lightbg/60 uppercase title-font">Support</h2>
                <nav className="mb-10 list-none">
                {
                    menuTwo.map((manu, idx) => (
                      <li key={idx} className="mt-3">
                        <Link href={manu.href} className="text-gray-500 cursor-pointer hover:text-gray-900">{manu.label}</Link>
                      </li>
                    ))
                  }
                  
                </nav>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 dark:text-lightbg/60 uppercase title-font">Platform
                </h2>
                <nav className="mb-10 list-none">
                {
                    menuThree.map((manu, idx) => (
                      <li key={idx} className="mt-3">
                        <Link href={manu.href} className="text-gray-500 cursor-pointer hover:text-gray-900">{manu.label}</Link>
                      </li>
                    ))
                  }
                </nav>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 dark:text-lightbg/60 uppercase title-font">Contact</h2>
                <nav className="mb-10 list-none">
                {
                    menuFour.map((manu, idx) => (
                      <li key={idx} className="mt-3">
                        <Link href={manu.href} className="text-gray-500 cursor-pointer hover:text-gray-900">{manu.label}</Link>
                      </li>
                    ))
                  }
                </nav>
              </div>
            </div>
          </div>
          <Separator />
          <div className="bg-lightbg dark:bg-darkbg">
            <div className="container px-5 py-4 mx-auto">
              <p className="text-sm text-gray-700 capitalize xl:text-center">© {
                new Date().getFullYear()
              } all right reserved</p>
            </div>
          </div>
        </footer>

      </div>
    </>

  );
};


export default Footer