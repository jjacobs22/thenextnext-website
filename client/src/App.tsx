import { Switch, Route, Router } from "wouter";
import Home from "@/pages/Home";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Handle base path for GitHub Pages
const base = window.location.pathname.startsWith('/thenextnext-website')
  ? '/thenextnext-website'
  : '';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router base={base}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;