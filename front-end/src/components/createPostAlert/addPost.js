

export const addPost = async (text, image, selectionBtn, setIsLoading) => {
    image = null; // to be implemented later
    setIsLoading(true)
    try{
        // http://localhost:5150/api/posts/add
        // https://masproback.vercel.app/api/posts/add
        const response = await fetch('https://masproback.vercel.app/api/posts/add', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('MASproAuth')}`
            },
            body: JSON.stringify({text, image, visibility: selectionBtn})
        })

        const data = await response.json();

        if(!response.status == 201){
            return { success: false, message: data.message };
        }

        return { success: true, message: data.message, post: data.post}
    } 
    catch(err){
        console.error("Error adding post:", err);
        return { success: false, message: err.message };
    }
    finally{
        setIsLoading(false)
    }
}