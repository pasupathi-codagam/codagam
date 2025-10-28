"use client";

import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Users, Target } from "lucide-react";
import {
  FormData as FormDataType,
  FormSubmitEvent,
  FormChangeEvent,
} from "@/models/interfaces";
import {
  NavigationButton,
  useScrollAnimation,
  // ContactForm,
} from "@/components/shared";

// Constants for better maintainability
const CAREER_CONFIG = {
  title: "Careers",
  scrollMargin: "scroll-mt-32 sm:scroll-mt-32 md:scroll-mt-32 lg:scroll-mt-28",
} as const;

// Career feature interface
interface CareerFeature {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  stats: string;
}

// Custom hook for form management
const useFormManagement = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange: FormChangeEvent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;

      if (name === "resume" && files) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleSubmit: FormSubmitEvent = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSubmitMessage(
          "Thank you for your application! We'll review your resume and get back to you soon."
        );
        setFormData({ name: "", email: "", resume: null });
      } catch {
        setSubmitMessage(
          "There was an error submitting your application. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    formData,
    isSubmitting,
    submitMessage,
    handleChange,
    handleSubmit,
  };
};

// Memoized career gallery item component with modern card design
const CareerGalleryItem = memo(
  ({
    feature,
    index,
    isActive,
  }: {
    feature: CareerFeature;
    index: number;
    isActive: boolean;
  }) => (
    <Card
      id={`career-gallery-item-${index + 1}`}
      className={`career-card w-full h-[320px] sm:h-[350px] relative overflow-hidden transition-all duration-500 ease-in-out transform ${
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } ${
        feature.id === 1
          ? "bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200/50"
          : feature.id === 2
          ? "bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-200/50"
          : "bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-200/50"
      }`}
      role="tabpanel"
      aria-labelledby={`career-gallery-item-${index + 1}-trigger`}
      aria-hidden={!isActive}
      style={{
        willChange: "transform, opacity",
      }}>
      <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in-up">
        {/* Icon Section */}
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ease-in-out ${
              feature.id === 1
                ? "bg-blue-500 text-white shadow-blue-500/25"
                : feature.id === 2
                ? "bg-green-500 text-white shadow-green-500/25"
                : "bg-purple-500 text-white shadow-purple-500/25"
            } shadow-lg hover:scale-110 hover:shadow-xl`}>
            {feature.icon}
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-1">
          <div
            className={`text-3xl sm:text-4xl font-black transition-all duration-300 ease-in-out ${
              feature.id === 1
                ? "text-blue-600"
                : feature.id === 2
                ? "text-green-600"
                : "text-purple-600"
            } hover:scale-105`}>
            {feature.stats}
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {feature.subtitle}
          </div>
        </div>

        {/* Title Section */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight transition-colors duration-300 hover:text-gray-700">
          {feature.title}
        </h3>

        {/* Description Section */}
        <p className="text-gray-600 text-sm leading-relaxed max-w-xs transition-colors duration-300 hover:text-gray-500">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  )
);

CareerGalleryItem.displayName = "CareerGalleryItem";

// Enhanced form field component with clean styling
const FormField = memo(
  ({
    id,
    name,
    type,
    value,
    onChange,
    placeholder,
    required,
    accept,
    children,
  }: {
    id: string;
    name: string;
    type: string;
    value: string | File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    accept?: string;
    children?: React.ReactNode;
  }) => (
    <div className="space-y-2 sm:space-y-3">
      <Label
        htmlFor={id}
        className="text-sm sm:text-base font-medium text-gray-900">
        {name}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={typeof value === "string" ? value : ""}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-500 focus:ring-gray-500"
        accept={accept}
        required={required}
      />
      {children && (
        <p className="text-xs sm:text-sm text-gray-500">{children}</p>
      )}
    </div>
  )
);

FormField.displayName = "FormField";

export default function CareerSection() {
  // Career cards state for single card display
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Apple-like scroll animations
  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const contentAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 });

  // Memoized career features data
  const careerFeatures = useMemo(
    (): CareerFeature[] => [
      {
        id: 1,
        title: "Innovation & Growth",
        subtitle: "Cutting-Edge Projects",
        description:
          "Join a team that's at the forefront of digital transformation. Work on cutting-edge projects that shape the future of technology and help businesses embrace innovation.",
        icon: <Rocket className="w-8 h-8" />,
        color: "from-blue-500 to-blue-600",
        bgColor: "from-blue-50 to-cyan-50",
        stats: "50+ Projects Delivered",
      },
      {
        id: 2,
        title: "Collaborative Culture",
        subtitle: "Team Excellence",
        description:
          "Be part of a diverse, inclusive team where your ideas matter. We foster a collaborative environment that encourages learning, creativity, and professional development.",
        icon: <Users className="w-8 h-8" />,
        color: "from-green-500 to-green-600",
        bgColor: "from-green-50 to-emerald-50",
        stats: "25+ Team Members",
      },
      {
        id: 3,
        title: "Career Advancement",
        subtitle: "Growth Opportunities",
        description:
          "Accelerate your career with opportunities for growth, mentorship, and skill development. We invest in our people and provide clear paths for advancement.",
        icon: <Target className="w-8 h-8" />,
        color: "from-purple-500 to-purple-600",
        bgColor: "from-purple-50 to-pink-50",
        stats: "90% Internal Promotions",
      },
    ],
    []
  );

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % careerFeatures.length);
    }, 4000); // Change card every 4 seconds

    return () => clearInterval(interval);
  }, [careerFeatures.length]);

  // Form management
  const { formData, isSubmitting, submitMessage, handleChange, handleSubmit } =
    useFormManagement();

  return (
    <section
      id="career-section"
      className="homepage-section standalone-module w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen pt-0 pb-8 sm:pt-0 sm:pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-24"
      data-module-template="career-section"
      data-analytics-region="career-section"
      role="main"
      aria-label="Career opportunities section">
      <div className="module-content w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 sm:px-6 md:px-8 scroll-animate-fade ${
            headerAnimation.isVisible ? "animate-in" : ""
          }`}>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight ${CAREER_CONFIG.scrollMargin}`}>
            {CAREER_CONFIG.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4">
            Build your future with cutting-edge technology and innovation
          </p>
        </div>

        {/* Main Content - Single Card Layout */}
        <div
          ref={contentAnimation.ref}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 scroll-animate-scale ${
            contentAnimation.isVisible ? "animate-in" : ""
          }`}>
          {/* Left Side - Single Career Card Display */}
          <div className="lg:col-span-2">
            <div className="max-w-lg mx-auto lg:mx-0">
              {/* Single Card Container with Animation */}
              <div className="relative h-[350px] sm:h-[400px] overflow-hidden">
                {careerFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                      index === currentCardIndex
                        ? "opacity-100 translate-x-0 scale-100"
                        : index < currentCardIndex
                        ? "opacity-0 -translate-x-full scale-95"
                        : "opacity-0 translate-x-full scale-95"
                    }`}>
                    <CareerGalleryItem
                      feature={feature}
                      index={index}
                      isActive={index === currentCardIndex}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Controls - Arrows and Dots */}
              <div className="flex flex-col items-center mt-8 space-y-4">
                {/* Arrow Navigation */}
                <div className="flex items-center gap-4">
                  <NavigationButton
                    direction="prev"
                    onClick={() =>
                      setCurrentCardIndex(
                        (prev) =>
                          (prev - 1 + careerFeatures.length) %
                          careerFeatures.length
                      )
                    }
                    disabled={false}
                    ariaLabel="Previous card"
                  />

                  <div className="flex items-center gap-2">
                    {careerFeatures.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCardIndex(index)}
                        className={`transition-all duration-300 ease-in-out transform hover:scale-110 ${
                          index === currentCardIndex
                            ? "w-8 h-2 bg-gray-800 rounded-full"
                            : "w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-600"
                        }`}
                        aria-label={`Go to card ${index + 1}`}
                      />
                    ))}
                  </div>

                  <NavigationButton
                    direction="next"
                    onClick={() =>
                      setCurrentCardIndex(
                        (prev) => (prev + 1) % careerFeatures.length
                      )
                    }
                    disabled={false}
                    ariaLabel="Next card"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Application Form */}
          <div className="w-full lg:col-span-1">
            <div className="max-w-md mx-auto lg:max-w-none animate-fade-in-up">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 transition-colors duration-300 hover:text-gray-700">
                  Join Our Team
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-600 font-light leading-relaxed transition-colors duration-300 hover:text-gray-500">
                  Ready to start your career with us? Submit your application
                  below.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6">
                  <FormField
                    id="name"
                    name="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                  <FormField
                    id="email"
                    name="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />

                  <FormField
                    id="resume"
                    name="Resume"
                    type="file"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder=""
                    accept=".pdf,.doc,.docx"
                    required>
                    PDF, DOC, or DOCX files up to 10MB
                  </FormField>

                  <Button
                    variant="black"
                    className="w-full text-sm sm:text-base py-3 h-10 sm:h-12 font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>

                  {submitMessage && (
                    <div
                      className={`p-4 rounded-lg text-sm font-medium ${
                        submitMessage.includes("error")
                          ? "text-red-700 border-l-4 border-red-500 bg-red-50"
                          : "text-green-700 border-l-4 border-green-500 bg-green-50"
                      }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
