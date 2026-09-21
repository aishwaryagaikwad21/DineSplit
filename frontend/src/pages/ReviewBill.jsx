import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ReviewBill = () => {

    const location = useLocation()
    const photo = location.state?.photo

    const [billData, setBillData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const extractBill = async () => {
        try {
            console.log("Sending bill to backend...")

            const formData = new FormData()
            formData.append('billImage', photo)

            const response = await fetch(
                'http://localhost:5000/scan',
                {
                    method: 'POST',
                    body: formData,
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log("Bill data:", data)

            setBillData(data)

        } catch (error) {
            console.error("Extraction failed:", error)
            setError(error.message)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (photo) {
            extractBill()
        }
    }, [photo])

    return (
        <main>
            <h1>Review Bill</h1>

            {loading && (
                <p>Extracting bill details...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {billData && (
                <pre>
                    {JSON.stringify(billData, null, 2)}
                </pre>
            )}
        </main>
    )
}

export default ReviewBill