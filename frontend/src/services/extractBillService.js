const API_URL = import.meta.env.VITE_API_URL;

export const extractBillService = async (formData) => {
    const response = await fetch(
        `${API_URL}/scan`,
        {
            method: 'POST',
            body: formData,
        }
    )

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    //console.log("Bill data:", data)
    return data
}
//'http://IP_address/scan'