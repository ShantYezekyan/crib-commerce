"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntdRegistry } from "@ant-design/nextjs-registry"

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>{children}</AntdRegistry>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Provider;
