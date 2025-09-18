import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="w-full px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-12 animate-fade-in-up">
            {/* Brand */}
            <div className="space-y-4 animate-slide-in-left">
              <h1 className="text-6xl lg:text-8xl font-bold text-blue-600 leading-none animate-bounce-slow">
                Codagam
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-medium animate-slide-in-right">
                Consult | Code | Collaborate
              </p>
            </div>

            {/* Main Headline */}
            <div className="space-y-6 animate-slide-in-up">
              <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 leading-tight animate-slide-in-left">
                Digital Transformation
                <br />
                <span className="text-gray-600 animate-slide-in-right">
                  for Modern Business
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl animate-fade-in-up">
                We help you establish and upscale your business online so that
                you don&apos;t miss any chance of serving a customer.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4 animate-slide-in-up">
              <Button
                variant="black"
                size="lg"
                className="px-8 py-4 rounded-full text-lg font-medium animate-pulse-slow hover:animate-bounce">
                Get Started
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative ">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/images/Codagam services.png"
                alt="Codagam team and technology solutions"
                className="w-full h-[600px] object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
