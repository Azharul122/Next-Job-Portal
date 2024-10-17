"use client"


import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface props {
  url: string,
  title: string,
  id: number
}




const RecentlyHired = () => {



  return (
    <div className="">
      <div className="flex h-10 items-center">
        <span className="font-semibold text-lg sm:text-xl">
          Recently Hired candidates
        </span>
      </div>
      <HorizontalScrollCarousel />

    </div>
  );
};



const HorizontalScrollCarousel = () => {
  // const [shuffledCards,setSuffleCards]=useState<props[]>([])
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  function shuffleArray(array: props[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  // useEffect(()=>{

  //   const intervalId= setInterval(()=>{

  //     setSuffleCards()

  //   },5000) ;

  //   return ()=> clearInterval(intervalId)


  // },[])

  const shuffledCards = shuffleArray([...cards])



  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]   scroll-smooth">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {shuffledCards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: any) => {
  return (
    <div
      key={card.id}
      className="group relative md:h-[450px] h-[200px] md:w-[450px] w-[300px]  overflow-hidden "
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "inherit"
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-2xl font-black  gradient-text backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default RecentlyHired;

const cards: props[] = [
  {
    url: "/1.webp",
    title: "Sr. Web devwloper",
    id: 1,
  },
  {
    url: "/2.webp",
    title: "MERN stack internship",
    id: 2,
  },
  {
    url: "/3.jpg",
    title: "Graphics designer",
    id: 3,
  },
  {
    url: "/4.webp",
    title: "Sr. graphics designer",
    id: 4,
  },
  {
    url: "/5.jpg",
    title: "Devops engineer",
    id: 5,
  },
  {
    url: "/6.png",
    title: "Jr. web developer",
    id: 6,
  },
  {
    url: "/7.png",
    title: "Software engineer",
    id: 7,
  },
  {
    url: "/8.png",
    title: "Digital marketer",
    id: 7,
  },
  {
    url: "/9.png",
    title: "Ethical hacker",
    id: 7,
  },
];