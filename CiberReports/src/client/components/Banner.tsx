function Banner() {
    return (
        <section className="banner bg-violet-100 h-96 relative z-10">
            <div className="Text-Button flex flex-col relative z-10 xl:flex-row">
                {/* xl:flex-row md:relative sm:relative xs:relative md:z-10 sm:z-10 xs:z-10 */}
                <div className=" xl-w-[853px] lg-w-[853px] h-96 p-6 z-10 sm:z-10 xs:z-10">
                    <p className="mt-5 font-bold">
                        Com o Techquiz pode avaliar o seu conhecimento e saber o seu nível
                        em todas as diversas áreas de informática.
                    </p>
                    <button
                        type="button"
                        className="h-12 mt-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                        Começar agora!
                    </button>
                </div>
                <div className=" w-full absolute overflow-hidden h-96 xl:relative">
                    {/* xl:w-full xxl:relative xl:relative  md:absolute sm:absolute md:inset-0 md:z-0 sm:inset-0 sm:z-0 xs:inset-0 xs:z-0*/}
                    <img
                        className="w-full xxl:blur-none xl:blur-none lg:blur-sm md:blur-sm sm:blur-sm xs:blur-sm h-full object-cover"
                        src=""
                        alt="banner"
                    />
                </div>
            </div>
        </section>
    )
}

export default Banner;