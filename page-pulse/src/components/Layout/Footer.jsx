function Footer () {
    return (
        <footer className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center text-sm text-gray-400 bg-white z-10">
            &copy; {new Date().getFullYear()} PagePulse. All rights reserved.
        </footer>
    )
}
export default Footer