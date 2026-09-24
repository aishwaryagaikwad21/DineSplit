import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { extractBillService } from '@/services/extractBillService'
import { LoaderCircle } from 'lucide-react';


const ReviewBill = () => {

    const location = useLocation()
    const photo = location.state?.photo

    const [billData, setBillData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        if (billData) {
            navigate('/edit-scan', {
                state: { billData }
            })
        }
    }, [billData, navigate])

    const extractBill = async () => {
        try {
            //console.log("Sending bill to backend...")

            const formData = new FormData()
            formData.append('billImage', photo)

           const extractedData = await extractBillService(formData)

            setBillData(extractedData)

        } catch (error) {
            //console.error("Extraction failed:", error)
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
                <>
                <p>Extracting bill details...</p>
                <div className="flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-blue-500" size={40} />
                </div>
                </>
            )}

            {error && (
                <p>{error}</p>
            )}

        </main>
    )
}

export default ReviewBill