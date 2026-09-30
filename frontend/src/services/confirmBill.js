export const confirmBillService = async (bill) => {
    const response = await fetch(
        "http://localhost:5000/confirm-bill",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bill)
        }
    )

    const data = await response.json()

    if (!response.ok) {
        console.error("Status:", response.status)
        console.error("Backend response:", data)
        throw new Error(data.message || "Failed to confirm bill")
    }

    return data
}