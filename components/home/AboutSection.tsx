import React from "react";
import StaggeredAnimation from "@/components/shared/StaggeredAnimation";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-gray-200 flex items-center py-20">
      <div className="w-full px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <StaggeredAnimation animationType="slideUp" delay={100}>
            <header className="text-center mb-20">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
                We are
              </h2>
              <h1 className="text-5xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8">
                Empowering businesses
                <br />
                <span className="text-gray-600">since 2020</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Codagam is a one-stop solution for every business, be it a
                startup, an enterprise or an individual just diving into the
                digital ecosystem. We deliver transformative technology
                solutions that drive positive change and foster sustainable
                growth.
              </p>
            </header>
          </StaggeredAnimation>

          {/* Media Container */}
          <StaggeredAnimation animationType="scale" delay={200}>
            <div className="flex justify-center mb-20">
              <div className="w-full max-w-4xl">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="/images/Codagam_Img (2).jpg"
                    alt="Codagam team and technology solutions"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </StaggeredAnimation>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
