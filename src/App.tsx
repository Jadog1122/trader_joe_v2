import { useState } from 'react';
import { Header } from './components/Header';
import { HotPosts } from './components/HotPosts';
import { Feed } from './components/Feed';
import { BottomNav } from './components/BottomNavEnhanced';
import { SurpriseBox } from './components/SurpriseBox';
import { Profile } from './components/Profile';
import { Menu } from './components/Menu';
import { RecipeHacks } from './components/RecipeHacks';
import { ProductDetail } from './components/ProductDetail';
import { CartProvider } from './components/CartContext';
import { Cart } from './components/Cart';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'surprise' | 'profile' | 'menu' | 'recipe-hacks' | 'product-detail'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const navigateToSurprise = () => setCurrentPage('surprise');
  const navigateToProfile = () => setCurrentPage('profile');
  const navigateToMenu = () => setCurrentPage('menu');
  const navigateToRecipeHacks = () => setCurrentPage('recipe-hacks');
  const navigateToHome = () => setCurrentPage('home');
  const navigateToProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  return (
    <CartProvider>
      <div className="min-h-screen gradient-tj-warm">
        <div className="max-w-md mx-auto bg-surface min-h-screen relative overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
          {currentPage === 'surprise' && <SurpriseBox onBack={navigateToHome} />}
          {currentPage === 'profile' && <Profile onBack={navigateToHome} />}
          {currentPage === 'menu' && <Menu onBack={navigateToHome} onProductDetail={navigateToProductDetail} />}
          {currentPage === 'product-detail' && <ProductDetail productId={selectedProductId} onBack={navigateToMenu} />}
          {currentPage === 'recipe-hacks' && <RecipeHacks onBack={navigateToHome} />}
          
          {currentPage === 'home' && (
            <>
              <Header />
              <HotPosts onRecipeHacksClick={navigateToRecipeHacks} />
              <Feed />
              <BottomNav onSurpriseClick={navigateToSurprise} onProfileClick={navigateToProfile} onMenuClick={navigateToMenu} />
            </>
          )}
          
          {/* Cart - available on all pages */}
          <Cart />
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        richColors
        closeButton
        duration={2000}
      />
    </CartProvider>
  );
}