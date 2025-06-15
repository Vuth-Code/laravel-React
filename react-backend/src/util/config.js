export const config = {
    image_path: import.meta.env.VITE_STORAGE_URL || "http://127.0.0.1:8000/storage/",
    api_url: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
};
