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

    // Handle phone number validation
    if (name === "phone") {
      // Only allow numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "email") setEmailError("");
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [formData, onSuccess, asDialog]
  );

  // Form content component
  const FormContent = () => (
    <div className={className}>
      {showTitle && (
        <h4 className="font-semibold mb-4 text-black flex items-center">
          📩 Get in Touch
        </h4>
      )}
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`border border-gray-300 rounded px-3 py-2 text-sm ${
            emailError ? "border-red-500" : ""
          }`}
          required
        />
        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          maxLength={10}
          pattern="[0-9]{10}"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
          required></textarea>
        <Button type="submit" disabled={isSubmitting} size="sm" variant="black">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {submitMessage && (
          <p className="text-green-600 text-xs mt-2">{submitMessage}</p>
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
            <DialogTitle className="text-lg sm:text-xl text-black">
              Get in Touch
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 sm:mt-6">
            <FormContent />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Return inline version
  return <FormContent />;
}
