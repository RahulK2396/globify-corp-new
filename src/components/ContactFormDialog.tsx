"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { submitLeadForm, extractFormFields } from "@/lib/submitLeadForm";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan?: string;
}

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const fields = extractFormFields(form);

    const success = await submitLeadForm({
      formName: "Contact Us",
      fields,
    });

    setLoading(false);

    if (success) {
      setSubmitted(true);
      toast.success("Message sent successfully!");
      form.reset();
    } else {
      toast.error("Failed to send message.");
    }
  };
  const handleClose = (val: boolean) => {
    onOpenChange(val);
    if (!val) setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-hero border-hero-foreground/10 text-hero-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-hero-foreground">
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-hero-foreground/50">
            Fill in the form below and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <CheckCircle className="w-16 h-16 text-primary" />
            <h3 className="text-lg font-semibold">Thank You!</h3>
            <p className="text-sm text-hero-foreground/50 text-center">
              We've received your message and will respond shortly.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-hero-foreground/70 text-sm"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  required
                  placeholder="John Doe"
                  className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-hero-foreground/70 text-sm"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-hero-foreground/70 text-sm"
                >
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="+971 50 000 0000"
                  className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-hero-foreground/70 text-sm"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  placeholder="Company Name"
                  className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="service"
                className="text-hero-foreground/70 text-sm"
              >
                Service Interested In
              </Label>
              <select
                id="service"
                className="w-full h-10 rounded-md border bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground px-3 text-sm"
              >
                <option value="">Select a service</option>
                <option disabled className="font-semibold">
                  ── Web & App Development ──
                </option>
                <option>Web Development</option>
                <option>App Development</option>
                <option>Shopify Development</option>
                <option>Shopify Plus</option>
                <option>Shopify Themes</option>
                <option>Shopify App Development</option>
                <option disabled className="font-semibold">
                  ── Digital Marketing ──
                </option>
                <option>Digital Marketing</option>
                <option>SEO, AEO & Content Strategy</option>
                <option>Paid Advertising (PPC)</option>
                <option>Social Media & Branding</option>
                <option>CRO & Revenue Engineering</option>
                <option disabled className="font-semibold">
                  ── AI & Automation ──
                </option>
                <option>AI & Automation</option>
                <option>AI Chatbots</option>
                <option>Process Automation</option>
                <option>Predictive Analytics</option>
                <option>AI Transformation Framework</option>
                <option disabled className="font-semibold">
                  ── Enterprise Solutions ──
                </option>
                <option>E-Commerce Solutions</option>
                <option>ERP Solutions</option>
                <option>Digital Transformation</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-hero-foreground/70 text-sm"
              >
                Message *
              </Label>
              <Textarea
                id="message"
                required
                rows={3}
                placeholder="Tell us about your project..."
                className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30 resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-1 gap-2"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
