import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function HeroSection() {
    const navigate =useNavigate()
  return (
    <div className="relative h-screen flex flex-col justify-center items-center bg-white dark:bg-black text-black dark:text-white text-center p-4">
      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold">QueryMind</h1>
      
      {/* Subtitle */}
      <p className="mt-4 text-lg md:text-xl max-w-2xl opacity-80">
        AI-powered data insights for businesses. Ask, analyze, and act—faster than ever before.
      </p>
      
      {/* CTA Buttons */}
      <div className="mt-6 flex gap-4">
              <Button onClick={() => {
                  navigate("/query")
        }} className="bg-black text-white px-6 py-3 text-lg rounded-full dark:bg-white dark:text-black">
          Try Now
        </Button>
       
      </div>

      {/* Tagline */}
      <div className="mt-10 flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Sparkles className="w-6 h-6" /> AI-driven insights in seconds!
      </div>
    </div>
  );
}
