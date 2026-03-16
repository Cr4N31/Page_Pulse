import FormInput from "./FormInput"
import { checkPageScore, isValidUrl } from "../../utils/pagehealth"
import { useState } from "react"
import Results from "./Results"

function Home() {
    const [pageUrl, setPageUrl] = useState("");
    const [err, setErr] = useState("");
    const [result, setResult] = useState(null);

    const handleCheck = () => {
        setErr("");
        setResult(null);

        if (!isValidUrl(pageUrl)) {
            setErr("Please enter a valid URL");
            return;
        }

        const res = checkPageScore();
        setResult(res);
    };

    return (
        <div className="flex-1 overflow-y-auto pt-20 pb-20">
            <section className="min-h-full p-8 flex flex-col items-center justify-center">
                <h1 className="text-red-600 font-bold text-4xl md:text-6xl text-center">PagePulse</h1>
                <FormInput 
                    pageUrl={pageUrl} 
                    setPageUrl={setPageUrl}
                    onSubmit={handleCheck} 
                />
                {err && <p className="text-red-500 mt-4">{err}</p>}
                {result && <Results result={result} />}
            </section>
        </div>
    )
}

export default Home