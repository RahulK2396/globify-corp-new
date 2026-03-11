import type { Metadata } from "next";
import PredictiveAnalytics from "@/pages/PredictiveAnalytics";

export const metadata: Metadata = {
  title: "PredictiveAnalytics | Globify Corp",
  description: "",
};

export default function PredictiveAnalyticsPage() {
  return <PredictiveAnalytics />;
}
