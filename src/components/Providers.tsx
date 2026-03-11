"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ContactDialogProvider } from "@/contexts/ContactDialogContext";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ContactDialogProvider>
          <ScrollToTop />
          <Sonner />
          {children}
        </ContactDialogProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
