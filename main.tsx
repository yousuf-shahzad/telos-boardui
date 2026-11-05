"use client";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiAddLine,
  RiFolder3Line,
  RiBarChartBoxLine,
  RiGroupLine,
  RiArrowDownLine,
  RiCheckLine,
  RiFocus3Line,
  RiFlashlightLine,
  RiCompass3Line,
  RiGlobalLine,
  RiMenuLine,
  RiCloseLine,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiMoneyDollarCircleLine,
  RiLeafLine,
} from "@remixicon/react";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { Chip } from "@/components/base/badges/chip";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { SearchField } from "@/components/base/search-field/search-field";
import { Select, SelectItem } from "@/components/base/select/select";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/base/segmented-control/segmented-control";
import { ProgressBar } from "@/components/base/progress/progress";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/base/modal/modal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/base/table/table";
import {
  Accordion,
  AccordionItem,
} from "@/components/base/accordion/accordion";
import { Tabs, TabList, Tab, TabPanel } from "@/components/base/tabs/tabs";
import { DirectionProvider } from "@/components/foundations/direction/direction";
import { cx } from "@/utils/cx";
import "@/styles/globals.css";
import "./site.css";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { RevenueChartCard } from "@/components/application/dashboard/revenue-chart-card";

import { initialProjects, people, navItems, money, tone } from "./suite/model";
const Dashboard = lazy(() =>
  import("./suite/workspace").then((module) => ({ default: module.Workspace })),
);
function Logo({ small = false }: { small?: boolean }) {
  return (
    <a
      href="#/"
      aria-label="TELOS home"
      className={cx("logo", small && "logo-small")}
    >
      <span className="logo-mark" aria-hidden>
        <span />
        <span />
      </span>
      <span>
        TELOS<span className="logo-period">.</span>
      </span>
    </a>
  );
}
function BrutalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <ButtonLink
      href={href}
      variant="secondary"
      trailingIcon={RiArrowRightLine}
      className="brutal-btn"
    >
      {children}
    </ButtonLink>
  );
}
function ProjectTicker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy || undefined}>
            {initialProjects.map((p) => (
              <li key={p.id}>
                <a href="#/dashboard/projects" tabIndex={copy ? -1 : undefined}>
                  <span className="ticker-block">{p.progress}%</span>
                  <span className="ticker-text">
                    <strong>{p.client}</strong>
                    <span>{p.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
const MODULES = [
  {
    id: "board",
    label: "Board",
    path: "/dashboard/board",
    text: "Move work from first spark to final handoff.",
  },
  {
    id: "calendar",
    label: "Calendar",
    path: "/dashboard/calendar",
    text: "See deadlines and milestones in one place.",
  },
  {
    id: "insights",
    label: "Insights",
    path: "/dashboard/insights",
    text: "Read revenue and delivery at a glance.",
  },
];
function ModuleBox() {
  return (
    <Tabs className="module-box" defaultSelectedKey="board">
      <TabList aria-label="Workspace areas">
        {MODULES.map((item) => (
          <Tab key={item.id} id={item.id}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      {MODULES.map((item) => (
        <TabPanel key={item.id} id={item.id}>
          <a href={`#${item.path}`}>
            <span dir="ltr">open {item.path}</span>
            <RiArrowRightUpLine className="size-4" aria-hidden />
          </a>
          <p>{item.text}</p>
        </TabPanel>
      ))}
    </Tabs>
  );
}
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label text-caption-1-semibold text-text-tertiary">
      {children}
    </div>
  );
}
function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || "/");
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const onHash = () => {
      setRoute(location.hash.slice(1) || "/");
      setMenu(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(id);
  }, [toast]);
  useEffect(() => {
    document.title = `${route.includes("dashboard") ? "Studio workspace" : route === "/about" ? "About" : route === "/pricing" ? "Pricing" : "Work with purpose"} — TELOS`;
  }, [route]);
  const isDash = route.startsWith("/dashboard");
  return (
    <DirectionProvider locale="en-GB">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      {isDash ? (
        <Suspense
          fallback={
            <div className="suite-loading text-body-regular text-text-secondary">
              Opening your studio…
            </div>
          }
        >
          <Dashboard route={route} notify={setToast} />
        </Suspense>
      ) : (
        <>
          <header className="site-header">
            <div className="container header-inner">
              <div className="masthead">
                <a href="#/" aria-label="TELOS home">
                  TELOS
                  <br />
                  STUDIO
                </a>
                <ThemeToggle collapsed />
              </div>
              <nav
                className={cx("site-nav", menu && "is-open")}
                aria-label="Main navigation"
              >
                {[
                  ["/", "Product"],
                  ["/about", "About"],
                  ["/pricing", "Pricing"],
                ].map(([url, label]) => (
                  <a
                    key={url}
                    href={`#${url}`}
                    aria-current={route === url ? "page" : undefined}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="header-actions">
                <ButtonLink
                  href="#/dashboard"
                  variant="secondary"
                  className="desktop-login header-button"
                >
                  Open demo
                </ButtonLink>
                <Button
                  className="mobile-menu"
                  variant="secondary"
                  iconOnly
                  leadingIcon={menu ? RiCloseLine : RiMenuLine}
                  aria-label={menu ? "Close menu" : "Open menu"}
                  aria-expanded={menu}
                  onClick={() => setMenu(!menu)}
                />
              </div>
            </div>
          </header>
          <main id="main" className="marketing" tabIndex={-1}>
            {route === "/" ? (
              <Home />
            ) : route === "/about" ? (
              <About />
            ) : route === "/pricing" ? (
              <Pricing notify={setToast} />
            ) : (
              <section className="brand-band">
                <div className="container page-hero">
                  <SectionLabel>LOST IN SPACE?</SectionLabel>
                  <h1 className="text-large-title-medium">
                    Let’s get you back on track.
                  </h1>
                  <BrutalLink href="#/">Back to home</BrutalLink>
                </div>
              </section>
            )}
          </main>
          <Footer />
        </>
      )}
      {toast && (
        <div className="toast" role="status">
          <RiCheckboxCircleLine className="size-5 text-status-lime-text" />
          {toast}
          <Button
            size="xs"
            variant="secondary"
            iconOnly
            leadingIcon={RiCloseLine}
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          />
        </div>
      )}
    </DirectionProvider>
  );
}
function Home() {
  return (
    <>
      <section className="type-hero">
        <div className="container type-hero-main">
          <h1 className="type-wordmark" aria-label="TELOS">
            telos
            <span aria-hidden>τ</span>
          </h1>
          <p className="type-lede">
            A calmer workspace for ambitious studios that keeps your
            <br className="type-break" /> projects, people, and bigger picture
            together.
          </p>
          <p className="type-hand">[less busywork. more purpose.]</p>
        </div>
        <ProjectTicker />
      </section>
      <section className="band-ink">
        <div className="container statement">
          <h2>
            Less Busywork.
            <br />
            More Purpose.
          </h2>
          <div className="statement-side">
            <div className="statement-actions">
              <BrutalLink href="#/dashboard">Find your focus</BrutalLink>
              <ButtonLink
                href="#/about"
                variant="secondary"
                className="brutal-btn brutal-btn-quiet"
              >
                Read the idea
              </ButtonLink>
            </div>
            <span className="statement-label">Step into the workspace</span>
            <ModuleBox />
          </div>
        </div>
      </section>
      <section className="band-volt">
        <div className="container made-for">
          <p className="text-caption-1-medium">
            MADE FOR THE WAY SMALL TEAMS WORK
          </p>
          <div className="studio-types text-title-2-medium">
            <span>
              <RiCompass3Line />
              Independent studios
            </span>
            <span>
              <RiGlobalLine />
              Distributed teams
            </span>
            <span>
              <RiFlashlightLine />
              Big-picture thinkers
            </span>
          </div>
        </div>
      </section>
      <section
        className="container product-showcase"
        aria-label="TELOS product preview"
      >
        <div className="preview-top text-caption-1-medium text-text-tertiary">
          <span className="flex items-center gap-2">
            <span className="live-dot" />A clearer view of your studio
          </span>
          <span className="preview-url">workspace.telos.demo</span>
          <span>Interactive preview ↗</span>
        </div>
        <MiniDashboard />
        <div className="preview-bottom text-caption-1-regular text-text-tertiary">
          <span>Fictional studio. Real possibilities.</span>
          <a href="#/dashboard" className="text-text-accent">
            Open full workspace <RiArrowRightUpLine className="size-4" />
          </a>
        </div>
      </section>
      <section className="container features-section">
        <div className="section-heading">
          <div>
            <SectionLabel>LESS FRICTION. MORE FLOW.</SectionLabel>
            <h2 className="text-display-3-medium">
              Everything you need.
              <br />
              Space for what’s next.
            </h2>
          </div>
          <p className="text-headline-regular text-text-secondary">
            From the first spark to the final handoff,
            <br />
            keep the important things in view.
          </p>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-visual">
              <div className="mini-project">
                <div className="flex justify-between">
                  <span className="text-body-medium">Forma brand refresh</span>
                  <Chip color="orange" variant="caption">
                    In progress
                  </Chip>
                </div>
                <ProgressBar aria-label="Forma progress" value={68} />
                <div className="flex items-center justify-between text-caption-1-regular text-text-tertiary">
                  <span>One shared direction</span>
                  <Avatar initials="AL" color="orange" size="sm" />
                </div>
              </div>
              <div className="mini-project offset">
                <RiCheckboxCircleLine className="size-5 text-status-lime-text" />
                <span className="text-body-medium">
                  Brand strategy approved
                </span>
                <span className="text-caption-1-regular text-text-tertiary">
                  Just now
                </span>
              </div>
            </div>
            <SectionLabel>01 / PROJECTS</SectionLabel>
            <h3 className="text-title-2-medium">Keep good work moving.</h3>
            <p className="text-body-regular text-text-secondary">
              Clear ownership, simple milestones, and one place to see what’s
              moving and what needs a little nudge.
            </p>
          </article>
          <article className="feature-card">
            <div className="feature-visual team-visual">
              <div className="avatar-orbit">
                <Avatar initials="AL" color="orange" size="lg" />
                <Avatar initials="JK" color="lime" size="lg" />
                <span className="orbit-logo">
                  <RiFocus3Line />
                </span>
                <Avatar initials="MN" color="pink" size="lg" />
                <Avatar initials="SR" size="lg" />
              </div>
              <div className="text-caption-1-medium text-text-tertiary">
                Different talents. Shared purpose.
              </div>
            </div>
            <SectionLabel>02 / PEOPLE</SectionLabel>
            <h3 className="text-title-2-medium">A team, on the same page.</h3>
            <p className="text-body-regular text-text-secondary">
              Give everyone the context to do their best work, with
              responsibilities that feel clear from day one.
            </p>
          </article>
          <article className="feature-card">
            <div className="feature-visual insight-visual">
              <span className="text-caption-1-medium text-text-tertiary">
                STUDIO MOMENTUM
              </span>
              <div className="bar-art" aria-hidden>
                {[30, 47, 38, 62, 54, 79, 69, 94].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <Chip color="lime" variant="caption">
                A little better, every week ↗
              </Chip>
            </div>
            <SectionLabel>03 / PERSPECTIVE</SectionLabel>
            <h3 className="text-title-2-medium">See the bigger picture.</h3>
            <p className="text-body-regular text-text-secondary">
              Turn a busy week into a clear story. Understand your studio’s
              revenue, delivery, and momentum at a glance.
            </p>
          </article>
        </div>
      </section>
      <section className="band-ink">
        <div className="container philosophy-strip">
          <span className="philosophy-symbol" aria-hidden>
            τ
          </span>
          <div>
            <SectionLabel>A NAME WITH INTENTION</SectionLabel>
            <h2 className="text-title-1-medium">
              TELOS means purpose.
              <br />
              We think your workspace should have one.
            </h2>
            <BrutalLink href="#/about">A little about us</BrutalLink>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
function MiniDashboard() {
  return (
    <div className="mini-dashboard">
      <aside className="mini-sidebar">
        <Logo small />
        <div className="mini-workspace text-body-medium">
          <Avatar initials="N" color="orange" size="sm" />
          Northstar Studio<span className="text-text-tertiary">⌄</span>
        </div>
        <nav aria-label="Preview navigation">
          {navItems
            .filter((item) =>
              ["overview", "projects", "insights", "team"].includes(item.key),
            )
            .map(({ key, label, icon: Icon, href }) => (
              <a
                className={cx("mini-nav", key === "overview" && "selected")}
                key={key}
                href={href}
              >
                <Icon className="size-4" />
                {label}
              </a>
            ))}
        </nav>
        <div className="mini-sidebar-bottom text-caption-1-regular text-text-tertiary">
          A space for good work.
          <br />
          <span className="text-text-accent">Studio demo</span>
        </div>
      </aside>
      <div className="mini-content">
        <div className="flex justify-between items-center gap-3">
          <div>
            <span className="text-caption-1-regular text-text-tertiary">
              YOUR STUDIO, AT A GLANCE
            </span>
            <h2 className="text-title-2-medium">
              Good morning, Alex <span aria-hidden>☀</span>
            </h2>
          </div>
          <ButtonLink href="#/dashboard" leadingIcon={RiAddLine} size="small">
            New project
          </ButtonLink>
        </div>
        <div className="mini-stats">
          {[
            ["Active projects", "4", "Moving forward"],
            ["Studio revenue", "$68,200", "H1 2026 · demo"],
            ["Delivery rate", "94%", "A little ahead"],
          ].map(([label, value, sub]) => (
            <div key={label}>
              <span className="text-caption-1-regular text-text-secondary">
                {label}
              </span>
              <strong className="text-title-1-medium">{value}</strong>
              <span className="text-caption-1-regular text-text-tertiary">
                {sub}
              </span>
            </div>
          ))}
        </div>
        <div className="preview-chart-grid">
          <RevenueChartCard
            title="Studio revenue · 2026 demo"
            data={revenueData}
            className="preview-chart"
          />
          <div className="preview-focus">
            <div className="flex justify-between items-center">
              <h3 className="text-body-medium">In focus</h3>
              <RiFocus3Line className="size-4 text-accent-500" />
            </div>
            {initialProjects.slice(0, 3).map((p) => (
              <a
                href="#/dashboard/projects"
                className="focus-project"
                key={p.id}
              >
                <span className="text-body-medium">{p.client}</span>
                <span className="text-caption-1-regular text-text-tertiary">
                  {p.category}
                </span>
                <ProgressBar
                  aria-label={`${p.client} progress`}
                  value={p.progress}
                  size="sm"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const revenueData = [
  { label: "Jan", current: 8100, previous: 6400 },
  { label: "Feb", current: 9800, previous: 7300 },
  { label: "Mar", current: 11200, previous: 7900 },
  { label: "Apr", current: 10600, previous: 8200 },
  { label: "May", current: 13800, previous: 9600 },
  { label: "Jun", current: 14700, previous: 10100 },
];
function CTA() {
  return (
    <section className="container">
      <div className="cta-panel">
        <h2 className="text-display-3-medium">
          Make space for your best work.
        </h2>
        <p className="text-body-medium">
          A fresh perspective is just one click away.
        </p>
        <BrutalLink href="#/dashboard">Step inside TELOS</BrutalLink>
        <span className="text-caption-1-regular">
          An interactive demo. No sign-up needed.
        </span>
      </div>
    </section>
  );
}
function About() {
  return (
    <>
      <section className="brand-band">
        <div className="container page-hero about-hero">
          <SectionLabel>THE IDEA BEHIND TELOS</SectionLabel>
          <h1 className="text-large-title-medium">
            Good work starts
            <br />
            with a clear purpose.
          </h1>
          <p className="text-body-medium">
            A little less noise. A little more intention.
            <br />A workspace that gives your team room to think.
          </p>
        </div>
      </section>
      <section className="container about-story">
        <div className="about-art" aria-hidden>
          <div className="purpose-ring ring-one" />
          <div className="purpose-ring ring-two" />
          <div className="purpose-ring ring-three" />
          <span>
            τέλος
            <span className="text-body-regular">
              an end, a purpose, a direction
            </span>
          </span>
        </div>
        <div className="story-copy">
          <SectionLabel>WHY THIS EXISTS</SectionLabel>
          <h2 className="text-display-4-medium">
            We have enough tools.
            <br />
            What we need is clarity.
          </h2>
          <p className="text-headline-regular text-text-secondary">
            Creative work rarely moves in a straight line. A brief becomes a
            conversation. An idea becomes a prototype. A small team makes
            something much bigger than itself.
          </p>
          <p className="text-headline-regular text-text-secondary">
            TELOS imagines a home for all of it: a shared view of the projects,
            people, and progress that give a studio its direction.
          </p>
          <p className="text-body-regular text-text-tertiary">
            This is a fictional product, built as an interactive Board UI trial.
            Northstar Studio, its people, and all dashboard figures are
            illustrative.
          </p>
        </div>
      </section>
      <section className="container values-section">
        <SectionLabel>A FEW THINGS WE BELIEVE</SectionLabel>
        <div className="values-grid">
          {[
            {
              icon: RiFocus3Line,
              title: "Clarity is a kindness.",
              text: "A clear next step gives people the confidence to move. Make the important things obvious.",
            },
            {
              icon: RiLeafLine,
              title: "Calm is productive.",
              text: "Progress doesn’t need to feel frantic. Leave room for focus, curiosity, and a proper lunch break.",
            },
            {
              icon: RiCompass3Line,
              title: "Purpose over process.",
              text: "The point is the work you make together. Your tools should help you get there, then get out of the way.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <article key={title}>
              <span className="value-number text-caption-1-medium">
                0{i + 1}
              </span>
              <Icon className="size-7 text-text-accent" />
              <h3 className="text-title-2-medium">{title}</h3>
              <p className="text-headline-regular text-text-secondary">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
function Pricing({ notify }: { notify: (message: string) => void }) {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <section className="brand-band">
        <div className="container page-hero pricing-hero">
          <SectionLabel>SIMPLE PLANS. ROOM TO GROW.</SectionLabel>
          <h1 className="text-large-title-medium">
            A little investment.
            <br />A lot more focus.
          </h1>
          <p className="text-body-medium">
            Start small. Find your flow. Grow at your own pace.
          </p>
          <div className="billing-switch">
            <SegmentedControl
              aria-label="Billing interval"
              selectedKeys={[annual ? "annual" : "monthly"]}
              onSelectionChange={(keys) => setAnnual(keys.has("annual"))}
            >
              <SegmentedControlItem id="monthly">Monthly</SegmentedControlItem>
              <SegmentedControlItem id="annual">Yearly</SegmentedControlItem>
            </SegmentedControl>
            <Chip color="lime" variant="caption">
              Save 20% yearly
            </Chip>
          </div>
          <p className="text-caption-1-regular">
            Illustrative plans for this demo. No payments or subscriptions.
          </p>
        </div>
      </section>
      <section className="container pricing-grid">
        {[
          {
            name: "Solo",
            description: "Your ideas, with a little more structure.",
            price: 0,
            features: [
              "1 workspace member",
              "3 active projects",
              "Project overview",
              "Simple progress tracking",
            ],
            cta: "Find your focus",
          },
          {
            name: "Studio",
            description: "A shared rhythm for your whole team.",
            price: annual ? 12 : 15,
            features: [
              "Up to 15 workspace members",
              "Unlimited active projects",
              "Revenue & delivery insights",
              "Shared project ownership",
              "CSV project exports",
            ],
            cta: "Try the studio",
            featured: true,
          },
          {
            name: "Collective",
            description: "More space for bigger ambitions.",
            price: annual ? 24 : 30,
            features: [
              "Everything in Studio",
              "Unlimited workspace members",
              "Multiple team spaces",
              "Advanced reporting concept",
              "Priority support concept",
            ],
            cta: "Explore Collective",
          },
        ].map((plan) => (
          <article
            className={cx("price-card", plan.featured && "featured")}
            key={plan.name}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-title-2-medium">{plan.name}</h2>
              {plan.featured && (
                <Chip color="orange" variant="caption">
                  A good place to start
                </Chip>
              )}
            </div>
            <p className="text-body-regular text-text-secondary">
              {plan.description}
            </p>
            <div className="price">
              <span className="text-display-1-medium">${plan.price}</span>
              <span className="text-body-regular text-text-tertiary">
                / person / month
              </span>
            </div>
            <span className="text-caption-1-regular text-text-tertiary">
              {plan.price === 0
                ? "Free, for a little focus."
                : annual
                  ? `$${plan.price * 12} per person, billed yearly`
                  : "Billed monthly. Change any time."}
            </span>
            <Button
              className="w-full"
              variant={plan.featured ? "primary" : "secondary"}
              trailingIcon={RiArrowRightLine}
              onClick={() => {
                location.hash = "/dashboard";
                notify(
                  `${plan.name} preview opened. This demo has no billing.`,
                );
              }}
            >
              {plan.cta}
            </Button>
            <div className="plan-divider" />
            <ul>
              {plan.features.map((f) => (
                <li key={f}>
                  <RiCheckLine className="size-4 text-text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <section className="container faq-section">
        <div>
          <SectionLabel>A LITTLE MORE CLARITY</SectionLabel>
          <h2 className="text-display-4-medium">Good questions.</h2>
          <p className="text-headline-regular text-text-secondary">
            A few things before you step inside.
          </p>
        </div>
        <Accordion variant="divided">
          <AccordionItem
            id="demo"
            title="Is this a real product I can subscribe to?"
          >
            TELOS is a fictional product created to try Board UI. The prices are
            illustrative and no payment information is collected. Every plan
            opens the same interactive demo.
          </AccordionItem>
          <AccordionItem
            id="data"
            title="What happens to the projects I create?"
          >
            Projects you add are saved in this browser’s local storage. They
            remain here when you reload, but are not synced to other devices.
            The board, calendar, and insights share those projects. Reset demo
            data in the dashboard to start fresh.
          </AccordionItem>
          <AccordionItem id="design" title="What is the interface built with?">
            Real Board UI components, React, and Tailwind CSS v4. Buttons,
            charts, dialogs, inputs, the sidebar, and other controls use the
            free component library.
          </AccordionItem>
          <AccordionItem id="team" title="Can I invite my real team?">
            The Team page shows an illustrative studio team. Invites, accounts,
            shared storage, and subscriptions are outside this local prototype.
          </AccordionItem>
        </Accordion>
      </section>
      <CTA />
    </>
  );
}
function Footer() {
  return (
    <footer className="band-ink">
      <div className="site-footer container">
        <div className="footer-top">
          <div>
            <a href="#/" className="footer-wordmark" aria-label="TELOS home">
              telos
            </a>
            <p className="text-body-regular">Good work. Clear purpose.</p>
          </div>
          <div className="footer-links">
            <a href="#/">Product</a>
            <a href="#/about">About</a>
            <a href="#/pricing">Pricing</a>
            <a href="#/dashboard">Explore workspace ↗</a>
          </div>
        </div>
        <div className="footer-bottom text-caption-1-regular">
          <span>
            © {new Date().getFullYear()} TELOS. A fictional studio workspace.
          </span>
          <a href="https://www.boardui.com" target="_blank" rel="noreferrer">
            Built with Board UI ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
createRoot(document.getElementById("root")!).render(<App />);

