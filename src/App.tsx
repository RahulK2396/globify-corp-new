import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ContactDialogProvider } from "@/contexts/ContactDialogContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Products = lazy(() => import("./pages/Products"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const AppDevelopment = lazy(() => import("./pages/AppDevelopment"));
const DigitalMarketing = lazy(() => import("./pages/DigitalMarketing"));
const Ecommerce = lazy(() => import("./pages/Ecommerce"));
const AIAutomation = lazy(() => import("./pages/AIAutomation"));
const ERPSolutions = lazy(() => import("./pages/ERPSolutions"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const IndustryHealthcare = lazy(() => import("./pages/IndustryHealthcare"));
const IndustryFintech = lazy(() => import("./pages/IndustryFintech"));
const IndustryRetail = lazy(() => import("./pages/IndustryRetail"));
const IndustrySupplyChain = lazy(() => import("./pages/IndustrySupplyChain"));
const IndustryManufacturing = lazy(() => import("./pages/IndustryManufacturing"));
const IndustrySaaS = lazy(() => import("./pages/IndustrySaaS"));
const ShopifyThemes = lazy(() => import("./pages/ShopifyThemes"));
const ShopifyAppDev = lazy(() => import("./pages/ShopifyAppDev"));
const ShopifyPlus = lazy(() => import("./pages/ShopifyPlus"));
const AIChatbots = lazy(() => import("./pages/AIChatbots"));
const ProcessAutomation = lazy(() => import("./pages/ProcessAutomation"));
const PredictiveAnalytics = lazy(() => import("./pages/PredictiveAnalytics"));
const SEOContentStrategy = lazy(() => import("./pages/SEOContentStrategy"));
const PaidAdvertising = lazy(() => import("./pages/PaidAdvertising"));
const SocialMediaBrand = lazy(() => import("./pages/SocialMediaBrand"));
const DigitalTransformation = lazy(() => import("./pages/DigitalTransformation"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const TechnologyPage = lazy(() => import("./pages/TechnologyPage"));
const AITransformationFramework = lazy(() => import("./pages/AITransformationFramework"));
const CRORevenueEngineering = lazy(() => import("./pages/CRORevenueEngineering"));
const Resources = lazy(() => import("./pages/Resources"));
const ShopifyDevelopment = lazy(() => import("./pages/ShopifyDevelopment"));
const WooCommerceDevelopment = lazy(() => import("./pages/WooCommerceDevelopment"));
const MagentoDevelopment = lazy(() => import("./pages/MagentoDevelopment"));
const PerformanceMarketing = lazy(() => import("./pages/PerformanceMarketing"));
const SocialMediaMarketing = lazy(() => import("./pages/SocialMediaMarketing"));
const SeoAeo = lazy(() => import("./pages/SeoAeo"));
const CaseStudyWilson = lazy(() => import("./pages/case-studies/CaseStudyWilson"));
const CaseStudyMoher = lazy(() => import("./pages/case-studies/CaseStudyMoher"));
const CaseStudyKatMaconie = lazy(() => import("./pages/case-studies/CaseStudyKatMaconie"));
const CaseStudySalomon = lazy(() => import("./pages/case-studies/CaseStudySalomon"));
const CaseStudyMedoc = lazy(() => import("./pages/case-studies/CaseStudyMedoc"));
const CaseStudyEkasys = lazy(() => import("./pages/case-studies/CaseStudyEkasys"));
const CaseStudyJudithLeiber = lazy(() => import("./pages/case-studies/CaseStudyJudithLeiber"));
const CaseStudyInstaRunway = lazy(() => import("./pages/case-studies/CaseStudyInstaRunway"));
const HireDevelopers = lazy(() => import("./pages/HireDevelopers"));
const ShopifyGermany = lazy(() => import("./pages/ShopifyGermany"));
const ShopifyFrance = lazy(() => import("./pages/ShopifyFrance"));
const ShopifyUAE = lazy(() => import("./pages/ShopifyUAE"));
const ShopifyIndia = lazy(() => import("./pages/ShopifyIndia"));
const ShopifyKSA = lazy(() => import("./pages/ShopifyKSA"));
const ShopifyKuwait = lazy(() => import("./pages/ShopifyKuwait"));
const ShopifyQatar = lazy(() => import("./pages/ShopifyQatar"));
const ShopifyBahrain = lazy(() => import("./pages/ShopifyBahrain"));
const ShopifyOman = lazy(() => import("./pages/ShopifyOman"));
const ShopifySouthAfrica = lazy(() => import("./pages/ShopifySouthAfrica"));
const ShopifySpain = lazy(() => import("./pages/ShopifySpain"));
const ShopifyItaly = lazy(() => import("./pages/ShopifyItaly"));
const ShopifyNetherlands = lazy(() => import("./pages/ShopifyNetherlands"));
const PrestaShopDevelopment = lazy(() => import("./pages/PrestaShopDevelopment"));
const ShopwareDevelopment = lazy(() => import("./pages/ShopwareDevelopment"));
const BigCommerceDevelopment = lazy(() => import("./pages/BigCommerceDevelopment"));
const WixEcommerce = lazy(() => import("./pages/WixEcommerce"));
const MigrationServices = lazy(() => import("./pages/MigrationServices"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-hero">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <ContactDialogProvider>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/app-development" element={<AppDevelopment />} />
          <Route path="/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/ai-automation" element={<AIAutomation />} />
          <Route path="/erp-solutions" element={<ERPSolutions />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/industries/healthcare" element={<IndustryHealthcare />} />
          <Route path="/industries/fintech" element={<IndustryFintech />} />
          <Route path="/industries/retail" element={<IndustryRetail />} />
          <Route path="/industries/supply-chain" element={<IndustrySupplyChain />} />
          <Route path="/industries/manufacturing" element={<IndustryManufacturing />} />
          <Route path="/industries/saas-startups" element={<IndustrySaaS />} />
          <Route path="/shopify-themes" element={<ShopifyThemes />} />
          <Route path="/shopify-app-development" element={<ShopifyAppDev />} />
          <Route path="/shopify-plus" element={<ShopifyPlus />} />
          <Route path="/ai-chatbots" element={<AIChatbots />} />
          <Route path="/process-automation" element={<ProcessAutomation />} />
          <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
          <Route path="/seo-content-strategy" element={<SEOContentStrategy />} />
          <Route path="/paid-advertising" element={<PaidAdvertising />} />
          <Route path="/social-media-brand" element={<SocialMediaBrand />} />
          <Route path="/digital-transformation" element={<DigitalTransformation />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/technology/:slug" element={<TechnologyPage />} />
          <Route path="/ai-transformation-framework" element={<AITransformationFramework />} />
          <Route path="/cro-revenue-engineering" element={<CRORevenueEngineering />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/shopify-development" element={<ShopifyDevelopment />} />
          <Route path="/woocommerce-development" element={<WooCommerceDevelopment />} />
          <Route path="/magento-development" element={<MagentoDevelopment />} />
          <Route path="/performance-marketing" element={<PerformanceMarketing />} />
          <Route path="/social-media-marketing" element={<SocialMediaMarketing />} />
          <Route path="/seo-aeo" element={<SeoAeo />} />
          <Route path="/case-study/wilson" element={<CaseStudyWilson />} />
          <Route path="/case-study/moher" element={<CaseStudyMoher />} />
          <Route path="/case-study/kat-maconie" element={<CaseStudyKatMaconie />} />
          <Route path="/case-study/salomon" element={<CaseStudySalomon />} />
          <Route path="/case-study/medoc-hms" element={<CaseStudyMedoc />} />
          <Route path="/case-study/ekasys-erp" element={<CaseStudyEkasys />} />
          <Route path="/case-study/judith-leiber" element={<CaseStudyJudithLeiber />} />
          <Route path="/case-study/instarunway" element={<CaseStudyInstaRunway />} />
          <Route path="/hire-developers" element={<HireDevelopers />} />
          <Route path="/shopify-germany" element={<ShopifyGermany />} />
          <Route path="/shopify-france" element={<ShopifyFrance />} />
          <Route path="/shopify-uae" element={<ShopifyUAE />} />
          <Route path="/shopify-india" element={<ShopifyIndia />} />
          <Route path="/shopify-ksa" element={<ShopifyKSA />} />
          <Route path="/shopify-kuwait" element={<ShopifyKuwait />} />
          <Route path="/shopify-qatar" element={<ShopifyQatar />} />
          <Route path="/shopify-bahrain" element={<ShopifyBahrain />} />
          <Route path="/shopify-oman" element={<ShopifyOman />} />
          <Route path="/shopify-south-africa" element={<ShopifySouthAfrica />} />
          <Route path="/shopify-spain" element={<ShopifySpain />} />
          <Route path="/shopify-italy" element={<ShopifyItaly />} />
          <Route path="/shopify-netherlands" element={<ShopifyNetherlands />} />
          <Route path="/prestashop-development" element={<PrestaShopDevelopment />} />
          <Route path="/shopware-development" element={<ShopwareDevelopment />} />
          <Route path="/bigcommerce-development" element={<BigCommerceDevelopment />} />
          <Route path="/wix-ecommerce" element={<WixEcommerce />} />
          <Route path="/migration-services" element={<MigrationServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </ContactDialogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
