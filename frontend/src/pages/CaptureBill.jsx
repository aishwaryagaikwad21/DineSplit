import React, { useEffect, useRef, useState } from 'react'
import { Camera, Image, RotateCcw, X } from 'lucide-react'

const CaptureBill = () => {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const fileInputRef = useRef(null)

  const [cameraOpen, setCameraOpen] = useState(false)
  const [photo, setPhoto] = useState(null)

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: false,
                })

      console.log('Camera stream:', stream)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
        }

        console.log('Video element:', videoRef.current)
        console.log('Video readyState:', videoRef.current.readyState)
      }

      setCameraOpen(true)
    } catch (error) {
      console.error('Unable to access camera:', error)
      console.error('Camera error:', error.name)
      console.error('Message:', error.message)
      console.error('Full error:', error)
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })

      streamRef.current = null
    }

    setCameraOpen(false)
  }

  // Capture photo from video
  const capturePhoto = () => {
    const video = videoRef.current

    if (!video) return

    const canvas = document.createElement('canvas')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    )

    canvas.toBlob((blob) => {
      if (!blob) return

      const file = new File(
        [blob],
        'bill-photo.jpg',
        { type: 'image/jpeg' }
      )

      setPhoto(file)
      stopCamera()
    }, 'image/jpeg')
  }

  // Upload existing image
  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setPhoto(file)
  }

  // Create preview URL
  const previewUrl = photo
    ? URL.createObjectURL(photo)
    : null

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
  if (cameraOpen && videoRef.current && streamRef.current) {
    videoRef.current.srcObject = streamRef.current
  }
}, [cameraOpen])

  // Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [])

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#fffbf2] px-6 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-amber-600">
            SCAN YOUR BILL
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Get a photo of your bill
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-zinc-600">
            Take a clear photo of your restaurant bill or upload
            one from your device.
          </p>
        </div>

        {/* Camera */}

        {cameraOpen && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-amber-100 bg-black shadow-sm">

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="aspect-video w-full object-cover"
            />

            <div className="flex justify-center gap-4 p-4">
              <button
                onClick={capturePhoto}
                className="rounded-full bg-amber-400 px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-amber-500"
              >
                Capture
              </button>

              <button
                onClick={stopCamera}
                className="rounded-full border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-800 hover:bg-zinc-50"
              >
                Cancel
              </button>
            </div>

          </div>
        )}

        {/* Preview */}

        {photo && !cameraOpen && (
          <div className="mb-6">

            <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">

              <img
                src={previewUrl}
                alt="Bill preview"
                className="max-h-[500px] w-full object-contain"
              />

              <button
                onClick={() => setPhoto(null)}
                className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md hover:bg-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="mt-4 flex justify-center gap-3">

              <button
                onClick={startCamera}
                className="flex items-center gap-2 rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-amber-50"
              >
                <RotateCcw className="h-4 w-4" />
                Retake
              </button>

              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-amber-50"
              >
                <Image className="h-4 w-4" />
                Choose another
              </button>

            </div>

          </div>
        )}

        {/* Options */}

        {!cameraOpen && !photo && (
          <div className="grid gap-6 sm:grid-cols-2">

            {/* Camera */}

            <button
              onClick={startCamera}
              className="flex flex-col items-center rounded-2xl border border-amber-100 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Camera className="h-8 w-8 text-amber-600" />
              </div>

              <h2 className="text-xl font-semibold text-zinc-900">
                Take a photo
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Use your phone camera or computer webcam.
              </p>
            </button>

            {/* Upload */}

            <button
              onClick={() => fileInputRef.current.click()}
              className="flex flex-col items-center rounded-2xl border border-amber-100 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Image className="h-8 w-8 text-amber-600" />
              </div>

              <h2 className="text-xl font-semibold text-zinc-900">
                Upload a photo
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Choose a bill image from your device.
              </p>
            </button>

          </div>
        )}

        {/* Hidden file input */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Continue */}

        {photo && !cameraOpen && (
          <div className="mt-8 flex justify-center">
            <button
              className="rounded-lg bg-amber-400 px-8 py-3 font-semibold text-zinc-900 transition-colors hover:bg-amber-500"
            >
              Extract Bill
            </button>
          </div>
        )}

      </div>
    </main>
  )
}

export default CaptureBill