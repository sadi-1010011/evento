// API calls to user route

export const dynamicParams = true // dynamic params ON!

export const get_favoritesById = async (userId: string) => {
    console.log(`fetching favorites of ${userId}`);
    // fetch favorites
    const response = await fetch(`/api/user/${userId}`, {
        method: 'GET',
    })
    return response;
}

export const put_favoritesById = async (userId: string, favoritedId: string) => {
    // console.log(`updating user: ${userId}, with event: ${favoritedId}`);
    // update in server
    const response = await fetch(`/api/user/${userId}/${favoritedId}`, {
        method: 'PUT',
    })
    return response;
}

export const delete_favoritesById = async (userId: string, favoritedId: string) => {
    // console.log(`deleting event: ${favoritedId}, from user: ${userId}`);
    // update in server
    const response = await fetch(`/api/user/${userId}/${favoritedId}`, {
        method: 'DELETE',
    })
    return response;
}