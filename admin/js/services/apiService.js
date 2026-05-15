export async function fetchData(url) {
    const res = await fetch(url);
    return res.json();
}

export async function createData(url, data) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function updateData(url, id, data) {
    const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

export async function deleteData(url, id) {
    await fetch(`${url}/${id}`, {
        method: "DELETE"
    });
}