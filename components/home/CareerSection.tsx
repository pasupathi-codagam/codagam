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
    <section className="min-h-screen bg-white flex items-center py-20">
      <div className="w-full px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Join Our Team
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Are you ready to take your career to the next level? At Codagam
              Software Labs, we believe in empowering our team members to
              achieve their full potential.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left space-y-8">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Work With Us?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Innovation First
                    </h4>
                    <p className="text-gray-600 text-lg">
                      Work on cutting-edge projects that shape the future of
                      technology.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Growth Opportunities
                    </h4>
                    <p className="text-gray-600 text-lg">
                      Continuous learning and career development in a supportive
                      environment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Impact Matters
                    </h4>
                    <p className="text-gray-600 text-lg">
                      Make a real difference in the world through meaningful
                      technology solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-right bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Apply Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-lg font-medium text-gray-900">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-lg font-medium text-gray-900">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="resume"
                    className="text-lg font-medium text-gray-900">
                    Resume
                  </Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="h-12 text-lg"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Accepted formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-medium bg-gray-900 hover:bg-gray-800"
                  size="lg">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg text-lg ${
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
