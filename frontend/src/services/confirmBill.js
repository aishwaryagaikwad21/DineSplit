const API_URL = import.meta.env.VITE_API_URL;

export const confirmBillService = async (bill) => {
    const response = await fetch(
        `${API_URL}/confirm-bill`,
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