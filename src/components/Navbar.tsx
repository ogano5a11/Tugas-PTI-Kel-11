import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import AuthContext from '../contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const user = authContext?.user;
  const setUser = authContext?.setUser;

  const handleLogout = () => {
    if (setUser) {
      setUser(null);
    }
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Beres.in</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">
              About Us
            </Link>
            <Link to="/kategori" className="text-gray-700 hover:text-green-600 transition-colors">
              Layanan Kami
            </Link>
            <Link to="/bantuan" className="text-gray-700 hover:text-green-600 transition-colors">
              Bantuan
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Daftar
                </Link>
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-green-600 py-2">
              Home
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-green-600 py-2">
              About Us
            </Link>
            <Link to="/kategori" className="block text-gray-700 hover:text-green-600 py-2">
              Layanan Kami
            </Link>
            <Link to="/bantuan" className="block text-gray-700 hover:text-green-600 py-2">
              Bantuan
            </Link>

            {user ? (
              <>
                <div className="py-2 text-gray-700">{user.name}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700 font-medium py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="block text-green-600 font-medium py-2">
                  Daftar
                </Link>
                <Link
                  to="/login"
                  className="block w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
