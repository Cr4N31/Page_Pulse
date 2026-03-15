import FormInput from "./FormInput"
import { isValidUrl } from "../../utils/pagehealth";
import { useState } from "react"
import Results from "./Results"

function Home() {
    const [pageUrl, setPageUrl] = useState("");
    const [err, setErr] = useState("");
    const [result, setResult] = useState(null);

    const handleCheck = async () => {
        setErr("");
        setResult(null);

        if (!isValidUrl(pageUrl)) {
            setErr("Please enter a valid URL");
            return;
        }

        try {
            const res = await fetch('http://localhost:5050/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: pageUrl }),
            });

            const data = await res.json();
            if (res.ok) {
                setResult(data);
            } 
        } catch (err) {
            console.error(err);
            setErr('Failed to connect to the server');
        }
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