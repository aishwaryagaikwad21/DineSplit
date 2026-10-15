
import React from "react";
import {
  Camera,
  ClipboardList,
  ScanText,
  Pencil,
  Users,
  Calculator,
  FileDown,
  CheckCircle2,
  ArrowRight,
  ReceiptText,
} from "lucide-react";

import GetStartedButton from "../components/GetStartedButton";
import Working from "../components/Working";

const features = [
  {
    icon: ScanText,
    title: "AI bill scanning",
    description:
      "Capture a photo or upload your restaurant bill. AI extracts dish names, prices and quantities for you.",
  },
  {
    icon: Pencil,
    title: "Edit before confirming",
    description:
      "Review extracted details, correct mistakes and add missing items before confirming your bill.",
  },
  {
    icon: Calculator,
    title: "Flexible bill splitting",
    description:
      "Split equally among everyone or assign dishes to the people who ordered them.",
  },
  {
    icon: FileDown,
    title: "Individual PDF bills",
    description:
      "See each person's amount owed and download an individual PDF with their bill details.",
  },
];

const Features = () => {
  return (
    <main className="min-h-screen bg-[#fffbf2] text-zinc-900">
      {/* Hero */}
      <section className="px-6 py-14 text-center md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-widest text-amber-500">
            WHAT DINESPLIT CAN DO
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Bill splitting,{" "}
            <span className="text-amber-500">made simple.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            Add your restaurant bill, choose how to split it, and let
            DineSplit calculate everyone's share. No complicated maths,
            no unnecessary hassle.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <GetStartedButton />
            <Working />
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="px-6 pb-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-[#eadfc9] bg-white p-5"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#fbf3e1]">
                  <Icon className="size-6 text-[#b86600]" />
                </div>

                <h2 className="text-lg font-semibold">{feature.title}</h2>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Two ways to add a bill */}
      <section className="border-y border-amber-100 bg-white px-6 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <p className="text-sm font-semibold tracking-widest text-amber-500">
              STEP 01
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              How would you like to add your bill?
            </h2>

            <p className="mt-3 text-zinc-600">
              Choose whichever method works best for you.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Upload and scan */}
            <article className="rounded-2xl border border-[#e4d9c5] bg-[#fffbf2] p-6 sm:p-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#fbf3e1]">
                <Camera className="size-6 text-[#b86600]" />
              </div>

              <h3 className="text-xl font-semibold">
                Upload or capture a bill
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
                Take a photo of your restaurant receipt or upload an
                existing image. AI extracts the bill details to get you
                started.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Capture or select a bill image",
                  "Extract dishes, prices and quantities",
                  "Review, edit and confirm the details",
                ].map((step) => (
                  <div key={step} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span className="text-sm text-zinc-700">{step}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* Manual entry */}
            <article className="rounded-2xl border border-[#e4d9c5] bg-[#fffbf2] p-6 sm:p-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#fbf3e1]">
                <ClipboardList className="size-6 text-[#b86600]" />
              </div>

              <h3 className="text-xl font-semibold">
                Enter bill manually
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
                Enter your bill details yourself when you don't have an
                image or prefer to fill in the information manually.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Add dish names, prices and quantities",
                  "Include additional charges and taxes",
                  "Apply discounts and confirm the total",
                ].map((step) => (
                  <div key={step} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <span className="text-sm text-zinc-700">{step}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Two splitting methods */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <p className="text-sm font-semibold tracking-widest text-amber-500">
              STEP 02
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Two ways to split. Your choice.
            </h2>

            <p className="mt-3 text-zinc-600">
              Add everyone's names and choose how the bill should be divided.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Equal split */}
            <article className="rounded-2xl border border-[#e4d9c5] bg-white p-6 sm:p-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#fbf3e1]">
                <Users className="size-6 text-[#b86600]" />
              </div>

              <h3 className="text-xl font-semibold">Split equally</h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
                Divide the total bill among all members. Everyone gets an
                equal share, calculated automatically.
              </p>

              <div className="mt-6 rounded-xl bg-[#fffbf2] p-4">
                <p className="text-sm text-zinc-500">Example bill</p>
                <p className="mt-1 text-2xl font-bold">₹1,000</p>

                <div className="my-4 border-t border-dashed border-amber-200" />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-zinc-600">
                    4 members
                  </span>
                  <span className="font-semibold text-amber-500">
                    ₹250 each
                  </span>
                </div>
              </div>
            </article>

            {/* Item-wise split */}
            <article className="rounded-2xl border border-[#e4d9c5] bg-white p-6 sm:p-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#fbf3e1]">
                <ReceiptText className="size-6 text-[#b86600]" />
              </div>

              <h3 className="text-xl font-semibold">Split item-wise</h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
                Select who ordered or shared each dish. DineSplit calculates
                each member's share based on their assigned items.
              </p>

              <div className="mt-6 rounded-xl bg-[#fffbf2] p-4">
                <p className="mb-4 text-sm font-medium text-zinc-500">
                  Example orders
                </p>

                {[
                  ["Paneer Tikka", "₹280"],
                  ["Veg Biryani", "₹320"],
                  ["Butter Naan", "₹100"],
                ].map(([dish, price]) => (
                  <div
                    key={dish}
                    className="flex items-center justify-between gap-3 border-b border-amber-100 py-2 last:border-0"
                  >
                    <span className="text-sm text-zinc-700">{dish}</span>
                    <span className="text-sm font-semibold">{price}</span>
                  </div>
                ))}

                <p className="mt-3 text-xs leading-5 text-zinc-500">
                  Assign dishes to the relevant members before calculating
                  the split.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Results and PDFs */}
      <section className="border-y border-amber-100 bg-white px-6 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-widest text-amber-500">
              STEP 03
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Know exactly what you owe.
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              Once the split is calculated, the results page displays each
              person's amount owed. Download a separate PDF for every member
              with their individual bill summary.
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Individual amount owed",
                "Items and additional charges share",
                "Downloadable PDF bill summary",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-amber-500" />
                  <span className="text-sm text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simple results preview, styled like the actual app */}
          <div className="rounded-2xl border border-[#e4d9c5] bg-[#fffbf2] p-5 sm:p-6">
            <h3 className="text-lg font-semibold">Your split is ready!</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Example results preview
            </p>

            <div className="mt-5 rounded-xl border border-[#eadfc9] bg-white p-4">
              <p className="text-sm text-zinc-500">Total group bill</p>
              <p className="mt-1 text-2xl font-bold">₹600.00</p>
              <p className="mt-1 text-xs text-zinc-500">
                3 members · Item-wise split
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ["Alex", "₹150.00"],
                ["Elena", "₹200.00"],
                ["Stefan", "₹250.00"],
              ].map(([name, amount]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#eadfc9] bg-white p-4"
                >
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Individual amount owed
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-amber-500">{amount}</p>
                    <p className="mt-1 flex items-center justify-end gap-1 text-xs text-zinc-500">
                      <FileDown className="size-3" />
                      PDF available
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-[#eadfc9] bg-white px-6 py-10 text-center sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to split your next bill?
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-zinc-600">
            Spend less time calculating everyone's share and more time
            enjoying the company.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <GetStartedButton />
            <Working />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Features;
