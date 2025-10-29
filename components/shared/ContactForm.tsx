"use client";
import React, { useState, useCallback } from "react";
import validateEmail from "@/helper/validateEmail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactFormProps {
  className?: string;
  showTitle?: boolean;
  onSuccess?: () => void;
  asDialog?: boolean;
  triggerText?: string;
  triggerVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "black";
  triggerSize?: "default" | "sm" | "lg" | "icon";
}

export function ContactForm({
  className = "",
  showTitle = true,
  onSuccess,
  asDialog = false,
  triggerText = "Get in Touch",
  triggerVariant = "black",
  triggerSize = "default",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle phone number validation - only allow numbers
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      // For all other fields, allow any input
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear email error when user starts typing
    if (name === "email") {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        if (asDialog) {
          setIsDialogOpen(false);
        }
        if (onSuccess) onSuccess();
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch {
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form content component - moved outside to prevent re-creation
  const formContent = (
    <div className={className}>
      {showTitle && (
        <h4 className="font-semibold mb-3 sm:mb-4 text-foreground flex items-center text-sm sm:text-base">
          📩 Get in Touch
        </h4>
      )}
      <form
        key="contact-form"
        className="flex flex-col space-y-2 sm:space-y-3"
        onSubmit={handleSubmit}>
        <input
          key="name-input"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-border rounded px-3 py-2 text-xs sm:text-sm h-10 sm:h-12"
          required
        />
        <input
          key="email-input"
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`border border-border rounded px-3 py-2 text-xs sm:text-sm h-10 sm:h-12 ${
            emailError ? "border-red-500" : ""
          }`}
          required
        />
        {emailError && <p className="text-destructive text-xs">{emailError}</p>}
        <input
          key="phone-input"
          type="tel"
          name="phone"
          placeholder="Your Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          className="border border-border rounded px-3 py-2 text-xs sm:text-sm h-10 sm:h-12"
          maxLength={10}
          pattern="[0-9]{10}"
          required
        />
        <textarea
          key="message-input"
          name="message"
          placeholder="Your Message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="border border-border rounded px-3 py-2 text-xs sm:text-sm resize-none"
          required></textarea>
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          variant="black"
          className="h-10 sm:h-12 text-xs sm:text-sm">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {submitMessage && (
          <p className="text-green-600 dark:text-green-400 text-xs mt-2">
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );

  // If asDialog is true, return dialog version
  if (asDialog) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={triggerVariant} size={triggerSize}>
            {triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl text-foreground">
              Get in Touch
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 sm:mt-6">
            {formContent}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Return inline version
  return formContent;
}
