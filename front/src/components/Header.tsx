import { Link, useLocation } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { useAuth } from '../contexts/AuthContext';
import { House, Heart, UserCircle, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Clock from './Clock';
import Test from './TimeJudge';

export function Header() {
  const location = useLocation();
  const { currentCharacter } = useCharacter();
  const { userInfo, signOut } = useAuth();
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const dropdownRef = useRef(null);

  // クリックイベントのハンドラーを追加
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAuthMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  const getHealthColor = (hp) => {
    if (hp > 7) return 'text-green-600';
    if (hp > 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span>
                <img width={30} src="/src/assets/images/logo.png" alt="" />
              </span>
              <span className="text-base font-bold text-gray-900">へるぴぃ</span>
            </Link>
          </div>

          {/* Center section - Main Navigation */}
          <nav className="flex space-x-8">
            {/* Auth Menu */}
            {!userInfo?.id && (
              <>
                <Link
                  to="/sign-in"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowAuthMenu(false)}
                >
                  サインイン
                </Link>
                <Link
                  to="/sign-up"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowAuthMenu(false)}
                >
                  サインアップ
                </Link>
              </>
            )}

            {userInfo?.id && (
              <>
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isCurrentPage('/')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <House className="w-6 h-6 text-primary" />
                </Link>
                <Link
                  to="/my-page"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isCurrentPage('/my-page')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <UserCircle className="w-6 h-6" />
                </Link>
                <div
                  className="relative px-3 py-2 rounded-md text-sm font-medium"
                  ref={dropdownRef}
                >
                  <button
                    onClick={() => setShowAuthMenu(!showAuthMenu)}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    <LogOut className="w-6 h-6" />
                  </button>

                  {showAuthMenu && (
                    <div className="absolute left-0 top-full mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                          <h3 className="text-lg font-semibold mb-4">
                            {/* {selectedAction.type}の詳細を選択 */}
                          </h3>
                          <div className="space-y-2"></div>
                          <button
                            onClick={signOut}
                            className="mt-4 w-full p-2 text-white bg-red-500 hover:bg-red-700 rounded-lg"
                          >
                            サインアウト
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Character Status */}
            {currentCharacter ? (
              <div className="flex items-center space-x-2">
                <Heart className={`w-5 h-5 ${getHealthColor(currentCharacter.health_points)}`} />
                <span className={`font-medium ${getHealthColor(currentCharacter.health_points)}`}>
                  {currentCharacter.health_points}/15
                </span>
              </div>
            ) : (
              <Link
                to="/character/create"
                className="text-sm font-medium text-white px-4 py-2 bg-blue-600 rounded-lg hover:text-primary-dark"
              >
                キャラクター作成
              </Link>
            )}

            {/* Time Components */}
            <div className="flex items-center space-x-4">
              <Clock />
              <Test />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
