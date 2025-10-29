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
            ? "border-gray-500 bg-gray-50"
            : "border-gray-200 hover:border-gray-500 hover:bg-gray-50"
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
            <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-colors duration-300" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-colors duration-300" />
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
    <section
      id="career-section"
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Career opportunities section">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full mb-8 border border-gray-100">
            <span className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
              Careers
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Join our
            <br />
            <span className="text-black">team</span>
          </h2>

          <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
            {/* Benefits Section */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Why work with us?
              </h3>

              <div className="space-y-4 sm:space-y-6">
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
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                  Ready to join us?
                </h3>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
                  Send us your application and let&apos;s start the
                  conversation.
                </p>
              </div>

              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="space-y-6">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-16 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-500 hover:bg-gray-50 transition-all duration-300 group"
                      aria-label="Toggle application form">
                      <div className="flex items-center justify-center space-x-4">
                        <Send className="w-6 h-6 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                        <span>Apply Now</span>
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-colors duration-300" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-gray-600 transition-colors duration-300" />
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
                            <User className="w-5 h-5 text-gray-600" />
                            <span>Full Name</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="h-14 text-base border-gray-200 focus:border-gray-500 focus:ring-gray-500 transition-all duration-300 hover:border-gray-300 rounded-xl"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="email"
                            className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-gray-600" />
                            <span>Email Address</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="h-14 text-base border-gray-200 focus:border-gray-500 focus:ring-gray-500 transition-all duration-300 hover:border-gray-300 rounded-xl"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="resume"
                            className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <span>Resume</span>
                          </Label>
                          <Input
                            id="resume"
                            name="resume"
                            type="file"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx"
                            className="h-14 text-base border-gray-200 focus:border-gray-500 focus:ring-gray-500 transition-all duration-300 hover:border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
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
    </section>
  );
}
