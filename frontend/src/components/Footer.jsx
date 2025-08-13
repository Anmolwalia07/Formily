import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <div className="text-2xl font-bold text-white">Formily</div>
          <p className="text-sm mt-2 opacity-80">
            Make forms that people actually enjoy filling.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="flex gap-12">
          <div className="text-sm">
            <div className="font-semibold text-white">Product</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-white">Company</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Formily. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
