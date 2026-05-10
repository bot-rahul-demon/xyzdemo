import { Link } from 'react-router';
import { Menu } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/imports/logo.png" alt="MockSaathi" className="h-10 md:h-12" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/category/ssc" className="text-sm text-foreground hover:text-secondary transition-colors">
            SSC
          </Link>
          <Link to="/category/banking" className="text-sm text-foreground hover:text-secondary transition-colors">
            Banking
          </Link>
          <Link to="/category/railways" className="text-sm text-foreground hover:text-secondary transition-colors">
            Railways
          </Link>
          <Link to="/category/regulatory" className="text-sm text-foreground hover:text-secondary transition-colors">
            Regulatory
          </Link>
          <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-[#002952] transition-colors">
            Login
          </button>
        </div>

        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
