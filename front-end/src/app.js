
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
        }
        // account is verified "Active"
        else {
            setGlobalData("authenticated", true)
            setGlobalData("user", data_g.user)

            // if user is already logged in and tries to go to auth pages
            if (location.pathname.startsWith("/auth")) {
                // if user's onboarding is completed or onboarding route is opened
                if (store.others?.isOnboardingCompleted || data_g?.isOnboardingRouteOpend ) {
                    navigate("/")
                } 
                // else redirect to onboarding page if not already in onboarding flow
                else if (!location.pathname.startsWith("/auth/onboarding")) {
                    navigate("/auth/onboarding")
                }
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
