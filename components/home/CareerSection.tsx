"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormData as FormDataType,
  BenefitCard as BenefitCardType,
  FormSubmitEvent,
  FormChangeEvent,
} from "@/models/interfaces";
import { SectionWrapper } from "@/components/shared";

// Memoized benefit card component
const BenefitCard = memo(({ benefit }: { benefit: BenefitCardType }) => (
  <Card
    className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-${benefit.bgColor} hover:from-${benefit.color}-50 hover:to-white`}>
    <CardContent className="p-8">
      <div className="flex items-start space-x-6">
        <div
          className={`w-12 h-12 bg-${benefit.color}-100 rounded-2xl flex items-center justify-center group-hover:bg-${benefit.color}-600 transition-all duration-500 group-hover:scale-110`}>
          <div
            className={`w-6 h-6 bg-${benefit.color}-600 rounded-full group-hover:bg-white transition-all duration-500`}></div>
        </div>
        <div className="flex-1">
          <CardTitle
            className={`text-2xl font-bold text-gray-900 mb-3 group-hover:text-${benefit.color}-600 transition-all duration-500`}>
            {benefit.title}
          </CardTitle>
          <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {benefit.description}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
));

BenefitCard.displayName = "BenefitCard";

// Memoized form field component
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
    <div className="space-y-3">
      <Label htmlFor={id} className="text-base font-semibold text-gray-900">
        {name}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={type}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300 ${
            type === "file"
              ? "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              : ""
          }`}
          accept={accept}
          required={required}
        />
      </div>
      {children}
    </div>
  )
);

FormField.displayName = "FormField";

export default function CareerSection() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Memoized benefits data
  const benefits = useMemo(
    (): BenefitCardType[] => [
      {
        id: "innovation",
        title: "Innovation First",
        description:
          "Work on cutting-edge projects using the latest technologies. We encourage experimentation and creative problem-solving.",
        color: "blue",
        bgColor: "blue-50/30",
        elementId: "benefit-1",
      },
      {
        id: "growth",
        title: "Growth Opportunities",
        description:
          "Continuous learning with mentorship programs, conference attendance, and access to premium learning resources.",
        color: "green",
        bgColor: "green-50/30",
        elementId: "benefit-2",
      },
      {
        id: "impact",
        title: "Meaningful Impact",
        description:
          "Build solutions that solve real-world problems and make a positive difference in people&apos;s lives.",
        color: "purple",
        bgColor: "purple-50/30",
        elementId: "benefit-3",
      },
    ],
    []
  );

  // Optimized event handlers with useCallback
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

  return (
    <SectionWrapper
      id="career-section"
      className="min-h-screen"
      role="main"
      aria-label="Career opportunities section">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-24 px-8 lg:px-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-8 border border-blue-100">
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
              Careers
            </span>
          </div>

          <h2 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8">
            Join our
            <br />
            <span className="text-blue-600">team</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re looking for passionate individuals who want to build the
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
                {benefits.map((benefit) => (
                  <BenefitCard key={benefit.id} benefit={benefit} />
                ))}
              </div>
            </div>

            {/* Application Form */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-blue-50/30 hover:shadow-3xl transition-all duration-700">
              <CardContent className="p-8 lg:p-12">
                <CardHeader className="text-center mb-8">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                    Ready to join us?
                  </CardTitle>
                  <p className="text-gray-600 text-lg">
                    Send us your application and let&apos;s start the
                    conversation.
                  </p>
                </CardHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <p className="text-sm text-gray-500">
                      PDF, DOC, or DOCX files up to 10MB
                    </p>
                  </FormField>

                  <Button
                    className="w-full h-14 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                    type="submit"
                    variant="black"
                    size="lg"
                    disabled={isSubmitting}
                    aria-label={
                      isSubmitting
                        ? "Submitting application"
                        : "Submit application"
                    }>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
