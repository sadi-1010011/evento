// API CALLS 


export const get_eventById = async (id: string) => {
    const res = await fetch(`/api/event/${id}`, { method: 'GET', cache: 'no-store', next: { revalidate: 0 }});
    const event = await res.json();
    return event;
}

export const delete_eventById = async (id: any) => {
    console.log('deleting id: ',id);
        const res = await fetch(`/api/event/${id}`, {
            method: "DELETE"
        }
    );
    return res;
}

export const put_eventById = async (id: string, eventdata: {}) => {
    console.log('updating event data!', id)
    // update to server
    const response = await fetch(`/api/event/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: eventdata }),
    })
    return response;
}

export const get_allEvents = async () => {
    const res = await fetch("api/events");
    const events = await res.json();
    return events;
}

export const post_event = async (eventdata: {}) => {
    console.log('posting data to server!')
    // upload to server
    const response = await fetch("api/events", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: eventdata }),
    })
    return response;
}

// CRUD operations on data complete by AUG 31 2024