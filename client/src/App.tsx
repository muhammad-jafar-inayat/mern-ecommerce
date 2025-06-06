import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home";
import Admin from "./pages/admin";
import { queryClient } from "./lib/queryClient"; // ✅ import shared client

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<div style={{ padding: 20 }}>404 - Page Not Found</div>} />
      </Routes>
    </QueryClientProvider>
  );
}
