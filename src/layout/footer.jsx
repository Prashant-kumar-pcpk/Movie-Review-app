
export default function Footer() {
  return (
    <footer className="bg-gray-900/50 text-white py-6 mt-10 shadow-lg">
      
      <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
        
        {/* App Name */}
        <h2 className="text-xl font-bold tracking-wide">
            Movie Review App
        </h2>

        {/* Divider */}
        <div className="w-20 h-1 bg-white mx-auto rounded"></div>

        {/* Copyright */}
        <p className="text-sm opacity-90">
          © 2026 Movie Review App. All rights reserved.
        </p>

        {/* Developer Credit */}
        <p className="text-sm font-medium">
          Designed & Developed by 
          <span className="ml-1 font-semibold underline decoration-yellow-300">
            Prashant Kumar
          </span>
        </p>

        {/* Social Icons (optional UI touch) */}
        <div className="flex justify-center gap-4 pt-2">
          <span className="hover:scale-110 transition cursor-pointer">🌐</span>
          <span className="hover:scale-110 transition cursor-pointer">🐱</span>
          <span className="hover:scale-110 transition cursor-pointer">💼</span>
        </div>

      </div>
    </footer>
  );
}