function FormInput ({ pageUrl, setPageUrl, onSubmit }) {
    
    return (
        <div className="flex flex-row">
            <input 
                className="border text-black border-red-600 border-2 rounded-l-4xl p-3 placeholder:text-gray-500 w-xl max-w-sm md:max-w-xl mt-8 bg-transparent" 
                type="text" 
                placeholder="Place your project URL here"
                name="input"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
            />
            <button 
                className="bg-red-600 font-semibold text-base py-3 px-4 rounded-r-4xl mt-8 ml-2 hover:bg-transparent hover:text-red-500 border border-2 border-red-600 transition-colors duration-300"
                onClick={onSubmit}
                >
                Check
            </button>
        </div>
    )
}

export default FormInput