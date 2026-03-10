import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { submitLeadForm, extractFormFields } from "@/lib/submitLeadForm";

const DMLeadCapture = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fields = extractFormFields(e.currentTarget);

    const success = await submitLeadForm({ formName: "Digital Marketing Growth Audit", fields });
    setLoading(false);
    if (success) {
      setSubmitted(true);
      toast.success("Request submitted successfully!");
    } else {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
     <section id="lead-capture" className="py-16 sm:py-24 bg-hero">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-12 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-primary mb-3">Let's Grow Together</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-hero-foreground leading-[1.1] mb-5">
              Ready to Scale Your<br />Revenue Predictably?
            </h2>
            <p className="text-hero-foreground/50 text-sm leading-relaxed mb-8">
              Tell us about your business and goals. We'll respond within 24 hours with a custom growth strategy, channel recommendations, and transparent pricing.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Free growth audit & opportunity analysis",
                "Custom channel strategy & budget allocation",
                "Competitive analysis & market insights",
                "Transparent pricing, no long-term contracts",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-hero-foreground/50">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl border border-hero-foreground/[0.06] bg-hero-foreground/[0.02]">
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-2">Multiple ways to start</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {["Free Audit", "Growth Strategy", "Campaign Review", "Performance Roadmap"].map((cta) => (
                  <a key={cta} href="#lead-capture" className="text-sm px-3 py-1.5 rounded-full border border-hero-foreground/10 text-hero-foreground/50 hover:border-primary/30 hover:text-primary transition-all">
                    {cta}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            {submitted ? (
              <div className="p-10 rounded-2xl border border-primary/20 bg-primary/5 text-center">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-hero-foreground mb-2">Thank You!</h3>
                <p className="text-sm text-hero-foreground/50">Our growth team will analyze your goals and respond within 24 hours with a custom strategy.</p>
              </div>
            ) : (
               <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl border border-hero-foreground/[0.06] bg-hero-foreground/[0.02] space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-hero-foreground/60 mb-1.5 block">Full Name *</label>
                    <input required type="text" maxLength={100} placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-hero border border-hero-foreground/10 text-hero-foreground text-sm placeholder:text-hero-foreground/25 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-hero-foreground/60 mb-1.5 block">Company</label>
                    <input type="text" maxLength={100} placeholder="Your Company"
                      className="w-full px-4 py-3 rounded-xl bg-hero border border-hero-foreground/10 text-hero-foreground text-sm placeholder:text-hero-foreground/25 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-hero-foreground/60 mb-1.5 block">Email Address *</label>
                  <input required type="email" maxLength={255} placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-hero border border-hero-foreground/10 text-hero-foreground text-sm placeholder:text-hero-foreground/25 focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div>
                  <label className="text-sm font-semibold text-hero-foreground/60 mb-1.5 block">Industry *</label>
                  <select required className="w-full px-4 py-3 rounded-xl bg-hero border border-hero-foreground/10 text-hero-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option value="">Select industry</option>
                    <option>E-Commerce / Retail</option>
                    <option>B2B SaaS / Technology</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Manufacturing</option>
                    <option>Startups</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-hero-foreground/60 mb-1.5 block">Monthly Budget</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-hero border border-hero-foreground/10 text-hero-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option value="">Select budget</option>
                      <option>$2K – $5K/mo</option>
                      <option>$5K – $15K/mo</option>
                      <option>$15K – $50K/mo</option>
                      <option>$50K+/mo</option>
                      <option>Not Sure Yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-hero-foreground/60 mb-1.5 block">Timeline</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-hero border border-hero-foreground/10 text-hero-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option value="">Select timeline</option>
                      <option>Immediate</option>
                      <option>This Month</option>
                      <option>This Quarter</option>
                      <option>Exploring Options</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-hero-foreground/60 mb-1.5 block">Primary Goals</label>
                  <textarea rows={3} maxLength={1000} placeholder="What are your main marketing goals? (e.g., increase leads, reduce CAC, scale revenue...)"
                    className="w-full px-4 py-3 rounded-xl bg-hero border border-hero-foreground/10 text-hero-foreground text-sm placeholder:text-hero-foreground/25 focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50">
                  <Send className="w-4 h-4" /> {loading ? "Submitting..." : "Get Your Free Growth Audit"}
                </button>

                <p className="text-sm text-hero-foreground/30 text-center">
                  By submitting, you agree to our Privacy Policy. We'll respond within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DMLeadCapture;
