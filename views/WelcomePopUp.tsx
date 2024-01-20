

export default function WelcomePopUp() {
    return (
        <>
            <div className="p-4">
                <h2>
                Welcome to the {" "}
                <a href="https://www.plasmo.com" target="_blank">
                    Blemish Cleaner
                </a>{" "}
                Extension!
                </h2>
                
                <a href="/static/onboarding.html" target="_blank">
                    Go to Onboarding.
                </a>

                <div className="border rounded-xl shadow bg-slate-300 text-jet mt-6 p-4">
                    <h3>What's next?</h3>
                    <p>
                        Now I just gotta work on the popup and then I can start working on the actual extension.
                    </p>
                </div>

            </div>
        </>
    )
}