import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import CategoryDetail from "./pages/CategoryDetail";
import Booking from "./pages/Booking";
import ContactUs from "./pages/ContactUs";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/service" component={Services} />
      <Route path="/service/:slug" component={ServiceDetail} />
      <Route path="/locations" component={Locations} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/category/:slug" component={CategoryDetail} />
      <Route path="/booking" component={Booking} />
      <Route path="/contact-us" component={ContactUs} />
      {/* Dynamic routes for locations and blogs */}
      <Route path="/best-physiotherapist-in-:area" component={LocationDetail} />
      <Route path="/physiotherapist-in-:area" component={LocationDetail} />
      <Route path="/home-physiotherapist-in-:area" component={LocationDetail} />
      <Route path="/:slug" component={BlogDetail} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <GoogleAnalytics />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
