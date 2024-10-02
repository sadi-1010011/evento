// API calls to user route

export const put_favoritesById = async (userId: string, favoritedId: string) => {
    // console.log(`updating user: ${userId}, with event: ${favoritedId}`);
    // update to server
    const response = await fetch(`/api/user/${userId}/${favoritedId}`, {
        method: 'PUT',
    })
    return response;
}
