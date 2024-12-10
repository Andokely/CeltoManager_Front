import _MainMenu from "../components/_MainMenu"
function MainMenu() {

    return (
        <>
            <div className='flex h-[100vh] w-full py-[20%] gap-4 bg-gradient-to-r from-blue-500 to-green-500 p-5 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 transition-all duration-300'>
                <_MainMenu />
                <_MainMenu />
                <_MainMenu />
                <_MainMenu />
                <_MainMenu />
                <_MainMenu />
            </div>
        </>
    )
}

export default MainMenu
