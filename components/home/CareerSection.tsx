"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import SectionReveal from "@/components/shared/animation";
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
  Lightbulb,
  TrendingUp,
  Target,
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
    <div className="space-y-3 sm:space-y-4">
      <Button
        variant="outline"
        className={`w-full h-14 sm:h-16 text-sm sm:text-base lg:text-lg font-semibold rounded-2xl border-2 transition-all duration-300 group ${
          isOpen
            ? "border-ring bg-accent shadow-md"
            : "border-border hover:border-ring hover:bg-accent hover:shadow-sm"
        }`}
        onClick={onToggle}
        aria-label={`Toggle ${benefit.title} details`}>
        <div className="flex items-center justify-between w-full px-4 sm:px-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <benefit.icon
                className={`w-5 h-5 sm:w-6 sm:h-6 text-${benefit.color}-600`}
              />
            </div>
            <span className="text-foreground font-medium text-sm sm:text-base">
              {benefit.title}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          )}
        </div>
      </Button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="bg-linear-to-br from-background to-muted border border-border rounded-2xl p-4 sm:p-6 shadow-sm">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
  const [emailError, setEmailError] = useState("");

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
        icon: Lightbulb,
      },
      {
        id: "growth",
        title: "Growth Opportunities",
        description:
          "Continuous learning with mentorship programs, conference attendance, and access to premium learning resources.",
        color: "green",
        bgColor: "green-50/30",
        elementId: "benefit-2",
        icon: TrendingUp,
      },
      {
        id: "impact",
        title: "Meaningful Impact",
        description:
          "Build solutions that solve real-world problems and make a positive difference in people&apos;s lives.",
        color: "purple",
        bgColor: "purple-50/30",
        elementId: "benefit-3",
        icon: Target,
      },
    ],
    []
  );

  // Event handler for form changes
  const handleChange: FormChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = e.target;

    if (name === "resume" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      // Allow all characters for name and email
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "email") setEmailError("");
    }
  };

  const handleSubmit: FormSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setEmailError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitMessage(
          "Thank you for your application! We'll review your resume and get back to you soon."
        );
        setFormData({ name: "", email: "", resume: null });
      } else {
        setSubmitMessage(
          "There was an error submitting your application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitMessage(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="career-section"
      className="pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Career opportunities section">
      <SectionReveal
        variant="zoom-in"
        delayMs={80}
        durationMs={700}
        className="max-w-7xl mx-auto">
        {/* Navigation Link */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
            <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Careers
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Join our team
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            We&apos;re looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Benefits Section */}
          <SectionReveal
            variant="slide-right"
            delayMs={90}
            durationMs={650}
            className="w-full">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                Why work with us?
              </h3>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
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
          </SectionReveal>

          {/* Application Form - Collapsible */}
          <SectionReveal
            variant="fade-up"
            delayMs={120}
            durationMs={700}
            className="w-full">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
                  Ready to join us?
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  Send us your application and let&apos;s start the
                  conversation.
                </p>
              </div>

              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="space-y-4 sm:space-y-6">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-2xl border-2 border-border hover:border-ring hover:bg-accent hover:shadow-md transition-all duration-300 group"
                      aria-label="Toggle application form">
                      <div className="relative flex items-center justify-center w-full px-12 sm:px-14">
                        {/* Centered icon + label */}
                        <span className="inline-flex items-center gap-2 text-foreground font-medium text-sm sm:text-base">
                          <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          Apply Now
                        </span>
                        {/* Right chevron */}
                        {isOpen ? (
                          <ChevronUp className="absolute right-4 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                        ) : (
                          <ChevronDown className="absolute right-4 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-4 sm:space-y-6">
                    <div className="bg-linear-to-br from-background to-muted border border-border rounded-2xl p-4 sm:p-6 shadow-lg">
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-3 sm:space-y-4">
                        <div className="space-y-2 sm:space-y-3">
                          <Label
                            htmlFor="name"
                            className="text-xs sm:text-sm font-semibold text-foreground flex items-center space-x-2">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                            <span>Full Name</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="h-10 sm:h-12 text-xs sm:text-sm border-border focus:border-ring focus:ring-ring transition-all duration-300 hover:border-ring/50 rounded-xl bg-background shadow-sm"
                            required
                          />
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <Label
                            htmlFor="email"
                            className="text-xs sm:text-sm font-semibold text-foreground flex items-center space-x-2">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                            <span>Email Address</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className={`h-10 sm:h-12 text-xs sm:text-sm border-border focus:border-ring focus:ring-ring transition-all duration-300 hover:border-ring/50 rounded-xl bg-background shadow-sm ${
                              emailError ? "border-red-500" : ""
                            }`}
                            required
                          />
                          {emailError && (
                            <p className="text-destructive text-xs">
                              {emailError}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <Label
                            htmlFor="resume"
                            className="text-xs sm:text-sm font-semibold text-foreground flex items-center space-x-2">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                            <span>Resume</span>
                          </Label>
                          <Input
                            id="resume"
                            name="resume"
                            type="file"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx"
                            className="h-10 sm:h-12 text-xs sm:text-sm border-border focus:border-ring focus:ring-ring transition-all duration-300 hover:border-ring/50 rounded-xl bg-background shadow-sm file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-accent file:text-foreground hover:file:bg-accent/80"
                            required
                          />
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            PDF, DOC, or DOCX files up to 10MB
                          </p>
                        </div>

                        <Button
                          className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl"
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
                            className={`p-3 sm:p-4 rounded-xl text-sm sm:text-base ${
                              submitMessage.includes("error")
                                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                                : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
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
          </SectionReveal>
        </div>
      </SectionReveal>
    </section>
  );
}
