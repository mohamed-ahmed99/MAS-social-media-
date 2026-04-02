


/*
    @desc: handle user status
*/ 

export const handleUserStatus = (status_g, data_g, store, navigate, location, setGlobalData) => {

    if (status_g === "success") {
        const userStatus = data_g?.user?.status

        // if user is not verified
        if (userStatus === "Unverified") {
            setGlobalData("authenticated", false)

            // if user is not verified and not on verify email page, redirect to verify email page
            if (location.pathname !== "/auth/verify-email") {
            navigate("/auth/verify-email")
            }
        } else {
            setGlobalData("authenticated", true)
            setGlobalData("user", data_g.user)

            // if user is already logged in and tries to go to auth pages, redirect to home
            if (location.pathname.startsWith("/auth")) {
            navigate("/")
            }
        }  
    }
    
    // if user is not logged in
    else if (status_g === "fail") { 
        if (!store.authenticated) {
            setGlobalData("authenticated", false)
            // if user is not logged in and not on auth pages, redirect to signin
            if (!location.pathname.startsWith("/auth")) {
            navigate("/auth/signin")
            }
        }
    }
}
