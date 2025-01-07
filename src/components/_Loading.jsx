
export const _LoadingComponents = () => {
    return (
        <div className="h-[40vh] w-full bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="flex">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
            </div>
        </div>
    )

}

export const _LoadingFull = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="flex">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
            </div>
        </div >
    )

}

export const _LoadingGestionGif = ({ image }) => {
    return (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
            <img src={image} alt="" className="w-[15%] mx-auto" />
        </div >
    )

}

export const _LoadingLogin = ({ image }) => {
    return (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
            <img src={image} alt="" className="rounded-full w-[20%] mx-auto" />
        </div >
    )

}