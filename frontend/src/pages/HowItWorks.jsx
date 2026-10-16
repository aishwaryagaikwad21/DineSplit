
import React from "react";
import { Link } from "react-router-dom";
import {
  ScanText,
  ClipboardList,
  Users,
  FileDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import GetStartedButton from "../components/GetStartedButton";

const features = [
  {
    icon: ScanText,
    title: "AI bill scanning",
    description: "Upload a bill image and let AI extract the details.",
  },
  {
    icon: ClipboardList,
    title: "Manual entry",
    description: "Add dishes, prices, quantities and bill adjustments.",
  },
  {
    icon: Users,
    title: "Flexible splitting",
    description: "Split equally or assign dishes to each member.",
  },
  {
    icon: FileDown,
    title: "Individual PDFs",
    description: "View each person's share and download their bill summary.",
  },
];

const steps = [
  {
    number: "01",
    title: "Add your bill",
    description:
      "Capture or upload a bill image, review the AI-extracted details and confirm. Alternatively, enter everything manually.",
  },
  {
    number: "02",
    title: "Add members and split",
    description:
      "Enter everyone's names and choose an equal split or an item-wise split based on who ordered what.",
  },
  {
    number: "03",
    title: "Get everyone's share",
    description:
      "DineSplit calculates the amounts owed. View the results and download an individual PDF for each member.",
  },
];

const HowItWorks = () => {
  return (
    <main className="min-h-screen bg-[#fffbf2] text-zinc-900">
      {/* Hero */}
      <section className="px-6 pb-10 pt-14 text-center md:pt-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-widest text-amber-500">
            SIMPLE AS THAT
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            From bill to{" "}
            <span className="text-amber-500">split.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Add your bill, choose how to divide it, and let DineSplit
            handle the calculations.
          </p>
        </div>
      </section>

      {/* Short feature overview */}
      <section className="px-6 pb-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-[#eadfc9] bg-white p-5"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-[#fbf3e1]">
                  <Icon
                    className="size-5 text-[#b86600]"
                    strokeWidth={1.5}
                  />
                </div>

                <h2 className="font-semibold">{feature.title}</h2>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[#eadfc9] bg-white px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-9 text-center">
            <p className="text-sm font-semibold tracking-widest text-amber-500">
              THREE SIMPLE STEPS
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Here's how it works
            </h2>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="flex items-start gap-4 rounded-2xl border border-[#eadfc9] bg-[#fffbf2] p-5 sm:gap-6 sm:p-6"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-zinc-900">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Splitting options */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold">
            Split your way
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#eadfc9] bg-white p-5">
              <h3 className="font-semibold">Split equally</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Divide the total bill equally among all members.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadfc9] bg-white p-5">
              <h3 className="font-semibold">Split item-wise</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Assign dishes to the people who ordered or shared them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-14 pt-2">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#eadfc9] bg-white px-6 py-9 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#fbf3e1]">
            <CheckCircle2
              className="size-5 text-[#b86600]"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            Good food. Fair shares.
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Let DineSplit take care of the maths.
          </p>

          <div className="mt-6 flex justify-center">
            <GetStartedButton />
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-zinc-500">
            Ready when you are
            <Link to='/get-started'>
            <ArrowRight className="size-4 text-[#b86600]" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
