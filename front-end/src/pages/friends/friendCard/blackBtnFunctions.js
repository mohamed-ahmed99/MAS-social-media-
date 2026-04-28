



export const addFriend = async (e, userId, body, postData) => {
    e.stopPropagation()
    e.preventDefault()

    // /api/relationship/build/
    await postData(`/api/relationship/build/${userId}`, {}, body);
}