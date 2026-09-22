export const extractBillService = async (formData) => {
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
    return data
}