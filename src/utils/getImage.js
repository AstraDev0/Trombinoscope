import api from "./api";

async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64Data = reader.result.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(blob);
    });
}

const getEmployeeImg = async (id) => {
    try {
        const response = await api.getEmployeeImage(id);
        if (response) {
            const blob = await response.blob();
            return blobToBase64(blob);
        }
    } catch (error) {
        return null
    }
}

export default getEmployeeImg