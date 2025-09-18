"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareerSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "resume" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitMessage(
        "Thank you for your application! We'll review your resume and get back to you soon."
      );
      setFormData({ name: "", email: "", resume: null });
    } catch (error) {
      setSubmitMessage(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modern scroll-triggered animations setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute("data-animate-id");
        if (elementId) {
          if (entry.isIntersecting) {
            // Add animation with a slight delay for smooth effect
            setTimeout(() => {
              setAnimatedElements((prev) => new Set([...prev, elementId]));
            }, 50);
          } else {
            // Element is out of view - remove animation (for scroll up effect)
            setTimeout(() => {
              setAnimatedElements((prev) => {
                const newSet = new Set(prev);
                newSet.delete(elementId);
                return newSet;
              });
            }, 100);
          }
        }
      });
    }, observerOptions);

    const section = sectionRef.current;
    if (section) {
      const elementsToObserve = section.querySelectorAll("[data-animate-id]");
      elementsToObserve.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  // Enhanced initial animations with staggered entrance
  useEffect(() => {
    const initialElements = ["career-header", "career-benefits", "career-form"];

    // Staggered entrance for smooth visual flow
    initialElements.forEach((elementId, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, elementId]));
      }, index * 300);
    });
  }, []);

  // Modern animation class helper with enhanced effects
  const getAnimationClass = (baseClass: string, elementId: string) => {
    if (animatedElements.has(elementId)) {
      return baseClass;
    }

    // Enhanced hidden state with modern CSS
    return "opacity-0 translate-y-6 scale-95 transition-all duration-700 ease-out";
  };

  return (
    <section
      id="career-section"
      ref={sectionRef}
      className="min-h-screen bg-gray-200 py-32">
      <div className="w-full">
        {/* Header */}
        <div
          data-animate-id="career-header"
          className={`${getAnimationClass(
            "animate-fade-in-up",
            "career-header"
          )} text-center mb-24 px-8 lg:px-16 transition-all duration-800`}>
          <div
            data-animate-id="career-badge"
            className={`${getAnimationClass(
              "animate-slide-in-right",
              "career-badge"
            )} inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-8 border border-blue-100 transition-all duration-800`}>
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
              Careers
            </span>
          </div>

          <h2
            data-animate-id="career-title"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "career-title"
            )} text-6xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8 transition-all duration-800`}>
            Join our
            <br />
            <span
              data-animate-id="career-title-highlight"
              className={`${getAnimationClass(
                "animate-bounce-slow",
                "career-title-highlight"
              )} text-blue-600 transition-all duration-800`}>
              team
            </span>
          </h2>

          <p
            data-animate-id="career-description"
            className={`${getAnimationClass(
              "animate-slide-in-left",
              "career-description"
            )} text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-800`}>
            We're looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>

        <div className="px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Benefits Section */}
            <div
              data-animate-id="career-benefits"
              className={`${getAnimationClass(
                "animate-slide-in-left",
                "career-benefits"
              )} space-y-12 transition-all duration-800`}>
              <h3
                data-animate-id="benefits-title"
                className={`${getAnimationClass(
                  "animate-fade-in-up",
                  "benefits-title"
                )} text-4xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-800`}>
                Why work with us?
              </h3>

              <div className="space-y-8">
                <Card
                  data-animate-id="benefit-1"
                  className={`${getAnimationClass(
                    "animate-scale-in",
                    "benefit-1"
                  )} group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50 hover:to-white`}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 group-hover:scale-110">
                        <div className="w-6 h-6 bg-blue-600 rounded-full group-hover:bg-white transition-all duration-500"></div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-all duration-500">
                          Innovation First
                        </CardTitle>
                        <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          Work on cutting-edge projects using the latest
                          technologies. We encourage experimentation and
                          creative problem-solving.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  data-animate-id="benefit-2"
                  className={`${getAnimationClass(
                    "animate-fade-in-up",
                    "benefit-2"
                  )} group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-green-50/30 hover:from-green-50 hover:to-white`}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-all duration-500 group-hover:scale-110">
                        <div className="w-6 h-6 bg-green-600 rounded-full group-hover:bg-white transition-all duration-500"></div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-all duration-500">
                          Growth Opportunities
                        </CardTitle>
                        <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          Continuous learning with mentorship programs,
                          conference attendance, and access to premium learning
                          resources.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  data-animate-id="benefit-3"
                  className={`${getAnimationClass(
                    "animate-slide-in-right",
                    "benefit-3"
                  )} group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-purple-50/30 hover:from-purple-50 hover:to-white`}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-all duration-500 group-hover:scale-110">
                        <div className="w-6 h-6 bg-purple-600 rounded-full group-hover:bg-white transition-all duration-500"></div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-all duration-500">
                          Meaningful Impact
                        </CardTitle>
                        <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          Build solutions that solve real-world problems and
                          make a positive difference in people's lives.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Application Form */}
            <Card
              data-animate-id="career-form"
              className={`${getAnimationClass(
                "animate-slide-in-right",
                "career-form"
              )} border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-blue-50/30 hover:shadow-3xl transition-all duration-700`}>
              <CardContent className="p-8 lg:p-12">
                <CardHeader className="text-center mb-8">
                  <CardTitle
                    data-animate-id="form-title"
                    className={`${getAnimationClass(
                      "animate-fade-in-up",
                      "form-title"
                    )} text-3xl font-bold text-gray-900 mb-4 transition-all duration-800`}>
                    Ready to join us?
                  </CardTitle>
                  <p
                    data-animate-id="form-description"
                    className={`${getAnimationClass(
                      "animate-slide-in-left",
                      "form-description"
                    )} text-gray-600 text-lg transition-all duration-800`}>
                    Send us your application and let's start the conversation.
                  </p>
                </CardHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div
                    data-animate-id="form-field-1"
                    className={`${getAnimationClass(
                      "animate-fade-in-up",
                      "form-field-1"
                    )} space-y-3 transition-all duration-800`}>
                    <Label
                      htmlFor="name"
                      className="text-base font-semibold text-gray-900">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300"
                      required
                    />
                  </div>

                  <div
                    data-animate-id="form-field-2"
                    className={`${getAnimationClass(
                      "animate-fade-in-up",
                      "form-field-2"
                    )} space-y-3 transition-all duration-800`}>
                    <Label
                      htmlFor="email"
                      className="text-base font-semibold text-gray-900">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300"
                      required
                    />
                  </div>

                  <div
                    data-animate-id="form-field-3"
                    className={`${getAnimationClass(
                      "animate-fade-in-up",
                      "form-field-3"
                    )} space-y-3 transition-all duration-800`}>
                    <Label
                      htmlFor="resume"
                      className="text-base font-semibold text-gray-900">
                      Resume
                    </Label>
                    <div className="relative">
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-300 hover:border-blue-300"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, or DOCX files up to 10MB
                    </p>
                  </div>

                  <Button
                    data-animate-id="form-submit"
                    className={`${getAnimationClass(
                      "animate-bounce-slow",
                      "form-submit"
                    )} w-full h-14 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                    type="submit"
                    variant="black"
                    size="lg"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>

                  {submitMessage && (
                    <div
                      data-animate-id="form-message"
                      className={`${getAnimationClass(
                        "animate-scale-in",
                        "form-message"
                      )} p-4 rounded-2xl text-base transition-all duration-800 ${
                        submitMessage.includes("error")
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-green-50 text-green-700 border border-green-200"
                      }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
