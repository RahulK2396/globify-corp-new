import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import CrossLinkSection from "@/components/CrossLinkSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WebDevClients from "@/components/web-dev/WebDevClients";
import AIAutoHero from "@/components/ai-automation/AIAutoHero";
import AIAutoWhyInvest from "@/components/ai-automation/AIAutoWhyInvest";
import AIAutoServices from "@/components/ai-automation/AIAutoServices";
import AIAutoChatbots from "@/components/ai-automation/AIAutoChatbots";
import AIAutoPowerPlatform from "@/components/ai-automation/AIAutoPowerPlatform";
import AIAutoBusinessFunctions from "@/components/ai-automation/AIAutoBusinessFunctions";
import AIAutoCVScanning from "@/components/ai-automation/AIAutoCVScanning";
import AIAutoUseCases from "@/components/ai-automation/AIAutoUseCases";
import AIAutoCaseStudies from "@/components/ai-automation/AIAutoCaseStudies";
import AIAutoTechStack from "@/components/ai-automation/AIAutoTechStack";
import AIAutoProcess from "@/components/ai-automation/AIAutoProcess";
import AIAutoWhyDifferent from "@/components/ai-automation/AIAutoWhyDifferent";
import AIAutoLeadCapture from "@/components/ai-automation/AIAutoLeadCapture";

const faq = [
  { question: "What is AI automation and how can it help my business?", answer: "AI automation uses machine learning and intelligent algorithms to automate repetitive tasks, make predictions, and optimize workflows, reducing operational costs by up to 60% while improving accuracy and speed." },
  { question: "How long does it take to implement AI automation?", answer: "Pilot projects can be live in 4–6 weeks. Full enterprise deployments typically take 3–6 months depending on complexity, data readiness, and integration requirements." },
  { question: "What ROI can I expect from AI automation?", answer: "Most clients see 30–60% cost reduction, 40% faster processing times, and measurable revenue growth within 90 days. We define KPIs upfront and track ROI throughout." },
  { question: "Do I need a large dataset to start with AI?", answer: "Not necessarily. We can start with rule-based automation and gradually introduce ML models as data accumulates. Many solutions work effectively with existing business data." },
  { question: "Which industries benefit most from AI automation?", answer: "Healthcare, fintech, retail, manufacturing, logistics, and SaaS companies see the highest ROI. However, any business with repetitive processes can benefit significantly." },
];

const AIAutomation = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI & Automation, Intelligent Business Solutions"
        description="AI-powered automation solutions for businesses in UAE and India. Chatbots, RPA, workflow automation, and machine learning to reduce costs by 40%."
        canonical="/ai-automation"
        faq={faq}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "AI & Automation", url: "/ai-automation" },
        ]}
        services={[
          { name: "AI Chatbots & Virtual Assistants", description: "Intelligent conversational agents for support, sales, and operations.", url: "/ai-chatbots" },
          { name: "Process Automation (RPA)", description: "Automate repetitive workflows to reduce costs and errors.", url: "/process-automation" },
          { name: "Predictive Analytics", description: "ML-powered forecasting for demand, churn, and revenue.", url: "/predictive-analytics" },
          { name: "Microsoft Power Platform", description: "Low-code automation with Power Automate, Power Apps, and Power BI.", url: "/ai-automation" },
        ]}
        speakable={["h1", "[data-speakable]"]}
      />
      <Navbar />
      <AIAutoHero />
      <AIAutoWhyInvest />
      <CaseStudiesSection />
      <WebDevClients />
      <AIAutoServices />
      <AIAutoChatbots />
      <AIAutoPowerPlatform />
      <AIAutoBusinessFunctions />
      <AIAutoCVScanning />
      <AIAutoUseCases />
      <AIAutoCaseStudies />
      <AIAutoTechStack />
      <AIAutoProcess />
      <AIAutoWhyDifferent />
      <AIAutoLeadCapture />
      <CrossLinkSection currentPage="ai-automation" links={["ai-chatbots", "process-automation", "predictive-analytics", "ai-framework", "erp", "digital-transformation"]} variant="light" />
      <Footer />
      <MobileFloatingCTA />
    </div>
  );
};

export default AIAutomation;
