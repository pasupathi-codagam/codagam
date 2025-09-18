import React from "react";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="w-full px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-12">
            {/* Brand */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold text-blue-600 leading-none">
                Codagam
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 font-medium">
                Consult | Code | Collaborate
              </p>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 leading-tight">
                Digital Transformation
                <br />
                <span className="text-gray-600">for Modern Business</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                We help you establish and upscale your business online so that
                you don&apos;t miss any chance of serving a customer.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden ">
              <img
                src="/images/Codagam services.png"
                alt="Codagam team and technology solutions"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
