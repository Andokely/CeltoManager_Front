function _MainMenu({ label, img }) {

    return (
        <>
            <div class="max-w-[410px] text-center rounded-xl hover:scale-110 duration-700 p-5" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                <div className="rounded-t-xl" style={{ backgroundColor: 'var(--primary-1)', color: 'var(--text-color)' }}>
                    <img src={img} alt="" class="w-[40%] mx-auto" />
                </div>
                <div className="">
                    <h4 class="uppercase mt-5 font-bold">{label}</h4>
                </div>
            </div>

        </>
    )
}

export default _MainMenu
