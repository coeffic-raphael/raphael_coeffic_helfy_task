const API_URL = "http://localhost:4000/api/tasks";

const request = async (url, options = {}) => {

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
            errorData.error || "An unexpected error occured"
        );
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};

export const getTasks = () => {
    return request(API_URL);
};

export const createTask = (taskData) => {
    return request(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });
};

export const updateTask = (taskId, taskData) => {
    return request(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });
};

export const deleteTask = (taskId) => {
    return request(`${API_URL}/${taskId}`, {
        method: "DELETE",
    });
};

export const toggleTask = (taskId) => {
    return request(`${API_URL}/${taskId}/toggle`, {
        method: "PATCH",
    });
};

