import React from 'react'
import { ArrowRight, Camera, QrCode } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

const GetStarted = () => {
  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#fffbf2] px-6 py-12 md:py-20">

      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          <p className="mb-3 text-sm font-semibold tracking-widest text-amber-600">
            LET'S GET STARTED
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
            How would you like to get your bill?
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
            Choose the easiest way to get your bill and we'll take care
            of the rest.
          </p>

        </div>


        {/* Options */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Upload / Capture */}
          <Card className="border-amber-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

            <CardHeader className="items-center text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Camera className="h-8 w-8 text-amber-600" />
              </div>

              <CardTitle className="text-2xl text-zinc-900">
                Upload or capture a bill
              </CardTitle>

              <CardDescription className="max-w-sm text-base leading-relaxed text-zinc-600">
                Take a photo or upload an image of your restaurant bill.
                We'll extract the details for you.
              </CardDescription>

            </CardHeader>

            <CardContent className="flex justify-center pb-8">

              <Button
                className="bg-amber-400 px-6 text-zinc-900 hover:bg-amber-500"
              >
                Upload Bill
                <ArrowRight />
              </Button>

            </CardContent>

          </Card>


          {/* QR Code */}
          <Card className="border-amber-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

            <CardHeader className="items-center text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <QrCode className="h-8 w-8 text-amber-600" />
              </div>

              <CardTitle className="text-2xl text-zinc-900">
                Scan a QR code
              </CardTitle>

              <CardDescription className="max-w-sm text-base leading-relaxed text-zinc-600">
                At participating restaurants, scan the QR code to get
                your bill instantly.
              </CardDescription>

            </CardHeader>

            <CardContent className="flex justify-center pb-8">

              <Button
                variant="outline"
                className="border-amber-400 px-6 text-zinc-900 hover:bg-amber-50"
              >
                Scan QR Code
                <ArrowRight />
              </Button>

            </CardContent>

          </Card>

        </div>


        {/* Small reassurance */}
        <div className="mt-10 text-center">

          <p className="text-sm text-zinc-500">
            Already have a restaurant bill?
            <span className="ml-1 font-medium text-amber-600">
              You're just a few clicks away from splitting it.
            </span>
          </p>

        </div>

      </div>

    </main>
  )
}

export default GetStarted