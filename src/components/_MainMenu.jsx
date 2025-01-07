function _MainMenu({ label, img }) {

    return (
        <>
            <div className="max-w-[410px] text-center rounded-xl p-5 transition-all duration-400"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-4)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-3)'}
             style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                <div className="rounded-t-xl" style={{ backgroundColor: 'var(--primary-1)', color: 'var(--text-color)' }}>
                    <img src={img} alt="" className="w-[40%] mx-auto" />
                </div>
                <div className="">
                    <h4 className="uppercase mt-5 font-bold">{label}</h4>
                </div>
            </div>

        </>
    )
}

export default _MainMenu
