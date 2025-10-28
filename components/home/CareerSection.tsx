"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FormData as FormDataType,
  BenefitCard as BenefitCardType,
  FormSubmitEvent,
  FormChangeEvent,
} from "@/models/interfaces";
import {
  ChevronDown,
  ChevronUp,
  Send,
  User,
  Mail,
  FileText,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared";

// Memoized benefit card component with collapsible
const BenefitCard = memo(
  ({
    benefit,
    isOpen,
    onToggle,
  }: {
    benefit: BenefitCardType;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div className="space-y-4">
      <Button
        variant="outline"
        className={`w-full h-16 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 group ${
          isOpen
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
        }`}
        onClick={onToggle}
        aria-label={`Toggle ${benefit.title} details`}>
        <div className="flex items-center justify-center space-x-4">
          <div
            className={`w-8 h-8 bg-${benefit.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <div
              className={`w-4 h-4 bg-${benefit.color}-600 rounded-full`}></div>
          </div>
          <span className="text-gray-900">{benefit.title}</span>
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
          )}
        </div>
      </Button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-lg text-gray-600 leading-relaxed">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  )
);

BenefitCard.displayName = "BenefitCard";

export default function CareerSection() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openBenefit, setOpenBenefit] = useState<string | null>(null);

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

              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    isOpen={openBenefit === benefit.id}
                    onToggle={() =>
                      setOpenBenefit(
                        openBenefit === benefit.id ? null : benefit.id
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Application Form - Collapsible */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Ready to join us?
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Send us your application and let&apos;s start the
                  conversation.
                </p>
              </div>

              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="space-y-6">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-16 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                      aria-label="Toggle application form">
                      <div className="flex items-center justify-center space-x-4">
                        <Send className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                        <span>Apply Now</span>
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-6">
                    <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-sm">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                          <Label
                            htmlFor="name"
                            className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                            <User className="w-5 h-5 text-blue-600" />
                            <span>Full Name</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300 rounded-xl"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="email"
                            className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <span>Email Address</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300 rounded-xl"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="resume"
                            className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span>Resume</span>
                          </Label>
                          <Input
                            id="resume"
                            name="resume"
                            type="file"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx"
                            className="h-14 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            required
                          />
                          <p className="text-sm text-gray-500">
                            PDF, DOC, or DOCX files up to 10MB
                          </p>
                        </div>

                        <Button
                          className="w-full h-14 text-lg font-semibold rounded-xl transition-all duration-500 hover:scale-105"
                          type="submit"
                          variant="black"
                          size="lg"
                          disabled={isSubmitting}
                          aria-label={
                            isSubmitting
                              ? "Submitting application"
                              : "Submit application"
                          }>
                          {isSubmitting
                            ? "Submitting..."
                            : "Submit Application"}
                        </Button>

                        {submitMessage && (
                          <div
                            className={`p-4 rounded-xl text-base ${
                              submitMessage.includes("error")
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-green-50 text-green-700 border border-green-200"
                            }`}>
                            {submitMessage}
                          </div>
                        )}
                      </form>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
