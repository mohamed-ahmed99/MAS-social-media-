import React from 'react'

export default function LoadingProfileCard() {
    return (
        <div className="pb-4 px-4 lg:-mt-[90px] -mt-[130px] z-10 flex flex-col gap-4">

            {/* profile and some user info  */}
            <div className="flex items-center lg:items-end gap-2 lg:gap-6 lg:flex-row flex-col">
                {/*profile photo skeleton */}
                <div className="relative lg:w-[180px] lg:h-[180px] w-[140px] h-[140px] shrink-0 bg-gray-400/70 animate-pulse rounded-full border-[3px] border-white " />


                <div className="w-full h-auto lg:h-[90px] space-y-4 lg:space-y-2 ">
                    {/* user name skeleton */}
                    <div className="h-8 w-48 bg-gray-400/70 animate-pulse rounded lg:mx-0 mx-auto" />

                    {/* connections skeleton */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-6 justify-between w-full lg:w-fit">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="h-3 w-16 bg-gray-400/70 animate-pulse rounded" />
                                    <div className="h-3 w-8 bg-gray-400/70 animate-pulse rounded" />
                                </div>
                            ))}
                        </div>

                        {/* buttons skeleton desktop */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="h-10 w-32 bg-gray-400/70 animate-pulse rounded-md" />
                            <div className="h-10 w-32 bg-gray-400/70 animate-pulse rounded-md" />
                        </div>
                    </div>
                </div>
            </div>


            {/* bio skeleton */}
            <div className="w-full space-y-2">
                <div className="h-4 w-full bg-gray-400/70 animate-pulse rounded" />
                <div className="h-4 w-[90%] bg-gray-400/70 animate-pulse rounded" />
                <div className="h-4 w-[75%] bg-gray-400/70 animate-pulse rounded" />
            </div>

            {/* buttons skeleton mobile */}
            <div className="grid grid-cols-2 lg:hidden gap-2">
                <div className="h-10 w-full bg-gray-400/70 animate-pulse rounded-md" />
                <div className="h-10 w-full bg-gray-400/70 animate-pulse rounded-md" />
            </div>

        </div>
    )
}