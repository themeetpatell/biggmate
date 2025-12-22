import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';

const MarketingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-2xl p-3 shadow-md">
                <img
                  src="/BiggMate-long.png"
                  alt="BiggMate"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The premier platform for finding cofounders, building startups, and launching successful ventures together.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3 0 .693-.09 1.093-.36.374-.238.744-.36 1.097-.36.53 0 .995.24 1.383.713.39.465.611 1.08.611 1.68 0 .51-.166 1.02-.48 1.44-.3.42-.72.705-1.17.855l-.074.015c-.016.008-.033.015-.048.023-.09.044-.165.09-.225.15-.09.074-.152.18-.166.33l-.014.163c.03.6.136 1.08.3 1.59.194.555.525 1.155 1.005 1.83.494.675.96 1.185 1.395 1.665.433.48.825.915 1.125 1.32.3.405.51.78.511 1.155 0 .51-.195.96-.525 1.29-.33.33-.78.51-1.29.51h-.012c-.3 0-.6-.06-.9-.165-.3-.105-.615-.21-.945-.285-.33-.075-.69-.12-1.08-.12-.36 0-.72.045-1.065.12-.345.075-.675.18-.99.3l-.03.015c-.314.12-.629.195-.959.195-.45 0-.855-.12-1.2-.36-.346-.24-.601-.57-.766-.96l-.015-.045c-.074-.195-.12-.405-.165-.645-.045-.24-.075-.51-.09-.81-.03-.3-.045-.645-.045-1.02v-.015c0-.33.015-.645.045-.96.03-.315.075-.63.135-.93.06-.3.135-.585.225-.855.09-.27.195-.51.315-.72.12-.21.24-.375.375-.51.135-.135.255-.195.346-.195.12 0 .195.03.255.09.061.06.106.15.136.27.03.12.045.27.045.45v.03c0 .15-.015.3-.045.45-.03.15-.075.3-.136.45-.06.15-.135.27-.226.375-.09.105-.195.15-.315.15-.045 0-.09-.015-.12-.03l-.015-.015c-.03-.015-.06-.015-.09-.015-.075 0-.135.03-.18.075-.045.045-.075.105-.09.18-.016.074-.016.165-.016.27v.015c0 .12.015.24.045.36.03.12.075.225.135.315.06.09.135.165.225.21.09.045.195.075.315.075h.015c.27 0 .51-.09.72-.27.21-.18.375-.405.495-.675.12-.27.195-.585.225-.93.03-.346.045-.72.045-1.125v-.06c0-.36-.015-.705-.045-1.02-.03-.315-.075-.6-.15-.855-.075-.255-.165-.465-.285-.63-.12-.165-.27-.255-.465-.255-.105 0-.21.03-.3.075-.09.045-.165.12-.225.21-.06.09-.105.195-.135.315-.03.12-.045.255-.045.405v.015c0 .074.015.135.03.195.015.06.045.12.075.165.03.045.075.09.12.105.045.015.09.03.135.03.03 0 .06 0 .09-.015l.03-.015c.015 0 .03-.015.045-.015.015 0 .03-.015.045-.015.015 0 .03 0 .03.015.015.015.03.03.03.045.015.015.015.03.015.06 0 .03 0 .045-.015.06-.015.015-.03.03-.045.045-.015.015-.03.015-.045.03l-.015.015c-.12.09-.255.15-.405.195-.15.045-.315.06-.48.06-.21 0-.405-.03-.585-.105-.18-.074-.345-.18-.495-.3-.15-.135-.27-.3-.36-.48-.09-.18-.135-.405-.135-.645v-.03c0-.24.045-.465.135-.675.09-.21.21-.39.375-.54.165-.15.36-.27.585-.345.225-.075.48-.12.75-.12.3 0 .585.045.855.15.27.105.51.24.72.435.21.195.375.435.51.705.135.27.225.585.27.945.045.36.075.75.075 1.17v.075c0 .375-.015.735-.045 1.065-.03.33-.075.645-.15.945-.075.3-.18.585-.3.84-.12.255-.27.495-.45.705-.18.21-.39.39-.63.525-.24.135-.51.21-.81.21h-.015c-.195 0-.375-.03-.54-.09-.165-.06-.3-.15-.42-.27-.12-.12-.225-.27-.3-.435-.075-.165-.12-.36-.135-.57v-.015c0-.12.015-.24.045-.36.03-.12.075-.225.135-.315.06-.09.135-.165.225-.21.09-.045.195-.075.315-.075.09 0 .165.015.24.045.075.03.135.075.18.135.045.06.075.135.09.21.015.075.015.165.015.255v.015c0 .09-.015.165-.03.24-.015.075-.045.135-.075.195-.03.06-.075.105-.12.135-.045.03-.09.045-.15.045-.045 0-.075-.015-.105-.03l-.03-.015c-.015-.015-.03-.015-.045-.015-.015 0-.03 0-.045.015-.015.015-.03.03-.03.045-.015.015-.015.045-.015.075v.015c0 .06.015.12.045.18.03.06.075.105.135.15.06.045.135.075.225.09.09.015.195.03.3.03.165 0 .315-.03.45-.09.135-.06.255-.15.36-.27.105-.12.18-.27.24-.45.06-.18.09-.39.09-.615v-.03c0-.21-.03-.405-.09-.585-.06-.18-.15-.345-.27-.48-.12-.135-.27-.24-.45-.315-.18-.075-.39-.12-.63-.12-.27 0-.525.045-.765.135-.24.09-.45.225-.63.405-.18.18-.315.405-.42.675-.105.27-.15.585-.15.93v.06c0 .36.06.69.165 1.005.105.315.255.585.45.81.195.225.435.405.705.525.27.12.585.18.93.18.24 0 .465-.03.675-.09.21-.06.405-.135.585-.24.18-.105.345-.225.48-.375.135-.15.24-.315.315-.495l.015-.03c.03-.06.06-.12.09-.18.03-.06.06-.12.105-.165.045-.045.09-.09.15-.12.06-.03.135-.045.225-.045.104 0 .195.03.27.09.075.06.135.135.18.225.045.09.075.195.09.315.015.12.03.24.03.36v.03c0 .21-.03.42-.09.63-.06.21-.15.405-.27.585-.12.18-.27.345-.45.495-.18.15-.39.27-.63.36l-.03.015c-.18.075-.375.135-.585.18-.21.045-.435.06-.675.06-.345 0-.675-.045-.99-.135-.315-.09-.6-.225-.855-.405-.255-.18-.48-.405-.675-.675-.195-.27-.345-.585-.465-.945-.12-.36-.18-.765-.18-1.215v-.06c0-.45.06-.87.18-1.26.12-.39.3-.735.525-1.05.225-.315.51-.585.84-.795.33-.21.72-.36 1.155-.45.435-.09.915-.135 1.44-.135.435 0 .855.045 1.245.15.39.105.735.255 1.035.465.3.21.54.465.72.765.18.3.27.645.27 1.02v.03c0 .255-.045.495-.135.705-.09.21-.225.39-.39.54-.165.15-.36.27-.585.345-.225.075-.48.12-.75.12-.225 0-.435-.03-.63-.105-.195-.074-.36-.18-.51-.315-.15-.135-.27-.3-.36-.495-.09-.195-.135-.42-.135-.66v-.03c0-.195.03-.375.09-.54.06-.165.15-.3.27-.42.12-.12.27-.21.435-.27.165-.06.36-.09.57-.09.15 0 .285.015.42.06.135.045.255.105.36.195.105.09.18.195.24.33.06.135.09.285.09.45v.015c0 .12-.03.225-.075.315-.045.09-.105.165-.18.225-.075.06-.165.105-.27.135-.105.03-.21.045-.33.045-.09 0-.165-.015-.24-.045-.075-.03-.135-.075-.18-.135-.045-.06-.075-.135-.09-.21-.015-.075-.015-.165-.015-.255v-.015c0-.075.015-.135.03-.195.015-.06.045-.12.075-.165.03-.045.075-.09.12-.105.045-.015.09-.03.135-.03.03 0 .06 0 .09.015l.03.015c.015 0 .03.015.045.015.015 0 .03.015.045.015.015 0 .03 0 .03-.015.015-.015.03-.03.03-.045.015-.015.015-.03.015-.06 0-.03 0-.045-.015-.06-.015-.015-.03-.03-.045-.045-.015-.015-.03-.015-.045-.03l-.015-.015c-.104-.09-.239-.15-.389-.195-.15-.045-.315-.06-.48-.06z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span>Privacy Policy</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span>Terms of Service</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 Biggmate. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;

