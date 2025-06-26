export default function Footer() {
    return (
        <footer className="flex flex-col justify-center items-center gap-y-4 p-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">© 2025 FlashChat. All rights reserved.</p>
            <div className="flex gap-4">
                <a href="#" className="text-sm text-gray-600">Terms of Service</a>
                <a href="#" className="text-sm text-gray-600">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-600">Contact Us</a>
            </div>
        </footer>
    );
}
