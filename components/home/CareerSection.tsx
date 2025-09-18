"use client";

import React, { useState } from "react";
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

  return (
    <section className="min-h-screen bg-white py-32">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-24 px-8 lg:px-16">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8">
            <span className="text-gray-700 text-sm font-medium">Careers</span>
          </div>

          <h2 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8">
            Join our
            <br />
            <span className="text-blue-600">team</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>

        <div className="px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Benefits Section */}
            <div className="space-y-12">
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Why work with us?
              </h3>

              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <div className="w-6 h-6 bg-blue-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        Innovation First
                      </h4>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Work on cutting-edge projects using the latest
                        technologies. We encourage experimentation and creative
                        problem-solving.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                      <div className="w-6 h-6 bg-green-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                        Growth Opportunities
                      </h4>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Continuous learning with mentorship programs, conference
                        attendance, and access to premium learning resources.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                      <div className="w-6 h-6 bg-purple-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                        Meaningful Impact
                      </h4>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Build solutions that solve real-world problems and make
                        a positive difference in people's lives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to join us?
                </h3>
                <p className="text-gray-600 text-lg">
                  Send us your application and let's start the conversation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
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
                    className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-3">
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
                    className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-3">
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
                      className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, or DOCX files up to 10MB
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="black"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-semibold rounded-full transition-all duration-300 disabled:opacity-50">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-2xl text-base ${
                      submitMessage.includes("error")
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-green-50 text-green-700 border border-green-200"
                    }`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
