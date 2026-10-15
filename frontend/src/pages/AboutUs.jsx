
import React from "react";
import {
  Heart,
  Utensils,
  Users,
  Calculator,
  Sparkles,
  ReceiptText,
  ArrowRight,
} from "lucide-react";

import GetStartedButton from "../components/GetStartedButton";

const values = [
  {
    icon: Utensils,
    title: "Good food brings us together",
    description:
      "Sharing a meal should be about conversations, laughter and good company, not worrying about who owes what.",
  },
  {
    icon: Calculator,
    title: "Fairness without the fuss",
    description:
      "Whether everyone shares equally or orders different dishes, splitting the bill should feel straightforward.",
  },
  {
    icon: Sparkles,
    title: "Technology that helps",
    description:
      "From AI-assisted bill scanning to automatic calculations, we use technology to take care of repetitive work.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-[#fffbf2] text-zinc-900">
      {/* Hero */}
      <section className="px-6 py-16 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#fbf3e1]">
            <Heart className="size-7 text-[#b86600]" />
          </div>

          <p className="mb-4 text-sm font-semibold tracking-widest text-[#b86600]">
            A LITTLE ABOUT US
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            More time for{" "}
            <span className="text-amber-500">the good stuff.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            DineSplit is built around a simple idea: sharing a meal should
            be easy, and splitting the bill shouldn't get in the way.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="px-6 pb-14 md:pb-20">
        <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="rounded-2xl border border-[#eadfc9] bg-white p-7 sm:p-9">
            <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#fbf3e1]">
              <ReceiptText className="size-6 text-[#b86600]" />
            </div>

            <h2 className="text-2xl font-bold">Why DineSplit?</h2>

            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
              Splitting a restaurant bill can get surprisingly complicated.
              Different dishes, shared plates, extra charges and discounts
              can turn a lovely meal into a calculator session.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
              DineSplit simplifies the process. Add your bill by scanning
              an image or entering the details manually, choose how to
              split it, and let the app calculate each person's share.
            </p>

            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
              Everyone gets a clearer picture of what they owe, with an
              individual PDF summary available to download.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold tracking-widest text-amber-500">
              OUR PURPOSE
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Less time calculating. More time connecting.
            </h2>

            <p className="leading-7 text-zinc-600">
              We believe useful technology should make everyday experiences
              simpler. DineSplit brings bill entry, flexible splitting and
              individual summaries together in one convenient place.
            </p>

            <div className="flex items-start gap-3 rounded-xl border border-[#eadfc9] bg-white p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fbf3e1]">
                <Users className="size-5 text-[#b86600]" />
              </div>

              <div>
                <h3 className="font-semibold">Made for sharing</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600">
                  Friends, family, colleagues and anyone who enjoys a meal
                  together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our values */}
      <section className="border-y border-amber-100 bg-white px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-widest text-amber-500">
              WHAT MATTERS TO US
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Simple by design.
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-zinc-600">
              The ideas behind every part of the DineSplit experience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-[#eadfc9] bg-[#fffbf2] p-6"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#fbf3e1]">
                    <Icon className="size-6 text-[#b86600]" />
                  </div>

                  <h3 className="text-lg font-semibold">{value.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold tracking-widest text-amber-500">
              THE DINESPLIT EXPERIENCE
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              One bill. Everyone's share.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Add your bill",
                description: "Scan a bill image or enter it manually.",
              },
              {
                title: "Choose your split",
                description: "Divide equally or assign individual dishes.",
              },
              {
                title: "Get your summaries",
                description: "See amounts owed and download individual PDFs.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#eadfc9] bg-white p-5"
              >
                <p className="text-sm font-bold text-amber-500">
                  0{index + 1}
                </p>

                <h3 className="mt-3 font-semibold">{item.title}</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#eadfc9] bg-white px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Good food. Fair shares. Better memories.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600 sm:text-base">
            Make your next group meal a little simpler with DineSplit.
          </p>

          <div className="mt-6 flex justify-center">
            <GetStartedButton />
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-zinc-500">
            Built for the moments around the table
            <ArrowRight className="size-4 text-amber-500" />
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
