import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Link2, Zap, BarChart2, ShieldCheck, Copy, Check, ChevronRight, Globe, MousePointerClick, Sparkles, ArrowRight, X, Star } from "lucide-react";

const queryClient = new QueryClient();

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <MousePointerClick size={28} />, num: "01", title: "Paste your URL", desc: "Copy any long, unwieldy link and drop it into the Shortly input field." },
    { icon: <Sparkles size={28} />, num: "02", title: "Generate your short link", desc: "Click Shorten URL and Shortly instantly creates a clean, trackable link." },
    { icon: <Globe size={28} />, num: "03", title: "Share anywhere", desc: "Copy your new short link and share it across social media, email, or ads." },
  ];
  return (
    <FadeInSection>
      <div className="w-full max-w-5xl mt-32">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">How it works</p>
          <h2 className="text-4xl font-bold tracking-tight">Three steps to a shorter link</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="relative bg-white rounded-2xl border border-border/60 p-8 shadow-sm hover:shadow-md transition-shadow">
                <span className="absolute top-6 right-7 text-5xl font-black text-gray-100 select-none leading-none">{step.num}</span>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function StatsBanner() {
  const stats = [
    { value: "2.4B+", label: "Links shortened" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "180+", label: "Countries reached" },
    { value: "< 80ms", label: "Avg. redirect time" },
  ];
  return (
    <FadeInSection>
      <div className="w-full max-w-5xl mt-24 rounded-3xl bg-primary px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-black text-white tracking-tight">{s.value}</p>
              <p className="text-sm text-white/60 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      desc: "Perfect for personal use and quick link sharing.",
      features: ["500 links/month", "Basic analytics", "Default domain", "Link expiration"],
      cta: "Get started free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      desc: "For creators and small teams who need more power.",
      features: ["Unlimited links", "Advanced analytics", "Custom domain", "QR codes", "API access"],
      cta: "Start free trial",
      highlight: true,
    },
    {
      name: "Business",
      price: "$49",
      period: "/mo",
      desc: "For growing businesses with high-volume needs.",
      features: ["Everything in Pro", "Team collaboration", "SSO / SAML", "Priority support", "SLA guarantee"],
      cta: "Contact sales",
      highlight: false,
    },
  ];
  return (
    <FadeInSection>
      <div className="w-full max-w-5xl mt-32">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Pricing</p>
          <h2 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">No hidden fees. No surprises. Upgrade or downgrade at any time.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className={`rounded-2xl border p-8 flex flex-col h-full transition-shadow ${plan.highlight ? "bg-primary text-white border-primary shadow-2xl scale-105" : "bg-white border-border/60 shadow-sm hover:shadow-md"}`}>
                {plan.highlight && (
                  <span className="inline-flex items-center gap-1 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white mb-4">
                    <Star size={11} fill="currentColor" /> Most popular
                  </span>
                )}
                <p className={`text-sm font-semibold uppercase tracking-widest mb-1 ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-5xl font-black tracking-tight ${plan.highlight ? "text-white" : "text-foreground"}`}>{plan.price}</span>
                  <span className={`text-sm pb-2 ${plan.highlight ? "text-white/60" : "text-muted-foreground"}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-7 ${plan.highlight ? "text-white/70" : "text-muted-foreground"}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-white" : "text-foreground"}`}>
                      <Check size={15} className={plan.highlight ? "text-white" : "text-primary"} strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full h-11 rounded-xl font-semibold text-sm transition-colors ${plan.highlight ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"}`}>
                  {plan.cta}
                </button>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Sarah Chen", handle: "@sarahchen", text: "Shortly transformed how we share content. Our click-through rates are up 40% since switching. The analytics alone are worth the price." },
    { name: "Marcus Rivera", handle: "@mrivera_dev", text: "Tried every link shortener out there. Shortly is the only one that nails the balance between simplicity and power. Custom domains are flawless." },
    { name: "Priya Nair", handle: "@priyanair", text: "We use Shortly across all our campaigns. The real-time analytics and clean dashboard save our team hours every week. Absolutely worth it." },
    { name: "Tom Okafor", handle: "@tomokafor", text: "Set up our branded domain in under 5 minutes. The redirect speed is insane — users don't even notice the redirect. Highly recommend." },
    { name: "Jess Williams", handle: "@jesswill", text: "The QR code feature is a game-changer for our events. Instantly professional. Shortly is now a permanent part of our marketing stack." },
    { name: "Dmitri Volkov", handle: "@dmitriv", text: "Our agency manages 200+ client campaigns. Shortly's team features and API make it the only tool we trust at scale. Support is top-notch too." },
  ];
  return (
    <FadeInSection>
      <div className="w-full max-w-5xl mt-32">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold tracking-tight">Trusted by thousands of teams</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <FadeInSection key={i} delay={(i % 3) * 0.1}>
              <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, k) => <Star key={k} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {r.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.handle}</p>
                  </div>
                  <X size={14} className="ml-auto text-sky-400" />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function CtaBanner() {
  return (
    <FadeInSection>
      <div className="w-full max-w-5xl mt-32 mb-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 px-10 py-20 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">Get started today</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">Your links. Your brand.<br/>Your data.</h2>
          <p className="text-white/60 max-w-md mx-auto mb-10 text-lg">Join over 500,000 marketers, developers, and creators who trust Shortly every day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-white text-gray-900 font-semibold text-sm shadow hover:bg-white/90 transition-colors">
              Start for free <ArrowRight size={16} />
            </button>
            <button className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              View pricing
            </button>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function Home() {
  const [url, setUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setIsShortening(true);
    setShortenedUrl(null);
    setApiResponse(null);
    setHasCopied(false);
    
    try {
      const response = await fetch("http://localhost:8080/shortly/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: url }),
        mode: "cors",
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }
      
      const data = await response.text();
      setApiResponse(data);
      setShortenedUrl(data);
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten URL. Please try again.");
    } finally {
      setIsShortening(false);
    }
  };

  const copyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FAFAFA] font-sans selection:bg-primary/10">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <Link2 size={18} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight">Shortly</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Products</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">Resources</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex text-sm font-medium hover:text-primary transition-colors">
              Log in
            </button>
            <button className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Sign up free
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mb-12"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-muted-foreground mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Shortly 2.0 is now live
              <ChevronRight size={14} className="ml-1 opacity-50" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary mb-6 leading-[1.1]">
              Shorten your links, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">amplify your reach.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A premium URL shortener that gives you full control over your links. 
              Track clicks, customize domains, and understand your audience.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden relative z-10"
          >
            <div className="p-8 md:p-10">
              <div className="text-left mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">Shorten a long link</h2>
                <p className="text-sm text-muted-foreground mt-1">No credit card required.</p>
              </div>

              <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                    <Link2 size={20} />
                  </div>
                  <input 
                    type="url" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your long link here" 
                    required
                    className="flex h-14 w-full rounded-xl border border-input bg-transparent pl-11 pr-4 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isShortening}
                  className="h-14 inline-flex items-center justify-center rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80"
                >
                  {isShortening ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                      Shortening
                    </span>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </form>

              <AnimatePresence>
                {shortenedUrl && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden space-y-4"
                  >
                    <div className="rounded-xl bg-green-50/50 border border-green-100 p-4 flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 overflow-hidden">
                        <span className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-xs">{url}</span>
                        <div className="hidden sm:block h-4 w-px bg-border"></div>
                        <a href={shortenedUrl} target="_blank" rel="noreferrer" className="text-base font-semibold text-green-700 hover:underline">
                          {shortenedUrl}
                        </a>
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className={`ml-4 flex-shrink-0 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          hasCopied 
                            ? "bg-green-600 text-white hover:bg-green-700" 
                            : "bg-white border border-border text-foreground hover:bg-gray-50 shadow-sm"
                        }`}
                      >
                        {hasCopied ? (
                          <>
                            <Check size={16} className="mr-2" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-2" /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    {apiResponse && (
                      <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                          <span className="text-sm font-semibold text-blue-900">API Response</span>
                        </div>
                        <pre className="bg-white rounded-lg p-3 text-xs font-mono text-gray-700 overflow-auto max-h-48 border border-blue-100">
                          {typeof apiResponse === 'string' ? apiResponse : JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="bg-gray-50 px-8 py-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-green-600" /> End-to-end encrypted</span>
              <a href="#" className="font-medium hover:text-primary underline underline-offset-4">Terms of service</a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-32 text-left w-full max-w-5xl"
          >
            <div className="flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <Zap className="text-gray-900" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Lightning-fast redirects with 99.99% uptime SLA. Built on a globally distributed edge network.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <BarChart2 className="text-gray-900" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Ready</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track clicks, geographic data, and referrers in real-time with our comprehensive dashboard.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="text-gray-900" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Links</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect your own domain to create branded links that increase trust and click-through rates.
              </p>
            </div>
          </motion.div>

          {/* How it Works */}
          <HowItWorks />

          {/* Stats Banner */}
          <StatsBanner />

          {/* Pricing */}
          <Pricing />

          {/* Testimonials */}
          <Testimonials />

          {/* CTA */}
          <CtaBanner />

        </div>
      </main>

      <footer className="border-t border-border bg-white mt-auto">
        <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-primary mb-4 md:mb-0">
            <Link2 size={20} strokeWidth={2.5} />
            <span className="font-bold tracking-tight">Shortly</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Shortly. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
