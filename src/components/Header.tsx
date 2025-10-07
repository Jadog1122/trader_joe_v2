import { Search, MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { useCart } from './CartContext';
import { useState } from 'react';

export function Header() {
  const { state, toggleCart } = useCart();
  const [isStorePickerOpen, setIsStorePickerOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState({
    name: "Downtown",
    address: "123 Main St",
    distance: "0.8 mi",
    id: "1"
  });

  const nearbyStores = [
    { id: "1", name: "Downtown", address: "123 Main St", distance: "0.8 mi", isOpen: true },
    { id: "2", name: "Westside", address: "456 Oak Ave", distance: "2.1 mi", isOpen: true },
    { id: "3", name: "North Hills", address: "789 Pine Rd", distance: "3.4 mi", isOpen: true },
    { id: "4", name: "Southpark", address: "321 Elm St", distance: "4.2 mi", isOpen: false },
    { id: "5", name: "East Valley", address: "654 Maple Dr", distance: "5.1 mi", isOpen: true }
  ];

  const handleStoreSelect = (store: typeof nearbyStores[0]) => {
    setSelectedStore(store);
    setIsStorePickerOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b" style={{ borderColor: 'rgba(211, 47, 47, 0.1)' }}>
        <div className="max-w-md mx-auto px-4 py-3">
          {/* Top Row: Logo and User Avatar */}
          <div className="flex items-center justify-between mb-3">
            {/* Trader Joe's Logo */}
            <div className="flex items-baseline gap-1.5">
              <span 
                className="text-tj-red-500 font-serif italic text-xl font-semibold tracking-tight"
                style={{ fontFamily: 'Crimson Text, serif' }}
              >
                Trader
              </span>
              <span 
                className="text-tj-amber-600 font-serif italic text-lg font-semibold tracking-tight"
                style={{ fontFamily: 'Crimson Text, serif' }}
              >
                Joe's
              </span>
              <div className="w-1.5 h-1.5 bg-tj-red-500 rounded-full mb-1 animate-bounce"></div>
            </div>

            {/* Right Side: Cart and User Avatar */}
            <div className="flex items-center gap-3">
              {/* Cart Icon */}
              <button
                onClick={toggleCart}
                className="relative w-10 h-10 bg-tj-cream-50 hover:bg-tj-cream-100 rounded-xl flex items-center justify-center transition-all duration-200 border group"
                style={{ 
                  borderColor: 'rgba(211, 47, 47, 0.1)',
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                <ShoppingBag className="w-5 h-5 text-tj-red-500 group-hover:text-tj-red-600 transition-colors" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-tj-amber-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-bounce">
                    {state.totalItems > 99 ? '99+' : state.totalItems}
                  </span>
                )}
              </button>

              {/* User Profile Avatar */}
              <UserAvatar 
                userName="Sarah Chen" 
                size="md" 
                showOnlineStatus={true}
              />
            </div>
          </div>

          {/* Bottom Row: Store Location and Search */}
          <div className="flex items-center gap-3">
            {/* Store Location Picker */}
            <button
              onClick={() => setIsStorePickerOpen(!isStorePickerOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-tj-cream-50 hover:bg-tj-cream-100 rounded-xl transition-all duration-200 border group min-w-0"
              style={{ 
                borderColor: 'rgba(211, 47, 47, 0.1)',
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <MapPin className="w-4 h-4 text-tj-red-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-neutral-900 truncate">{selectedStore.name}</div>
                <div className="text-xs text-neutral-600 truncate">{selectedStore.distance}</div>
              </div>
              <ChevronDown className={`w-3 h-3 text-neutral-500 flex-shrink-0 transition-transform duration-300 ${isStorePickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-enhanced w-full pl-10 pr-4 py-2.5 text-sm placeholder:text-neutral-500 rounded-xl"
                  style={{ boxShadow: 'var(--shadow-soft)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Store Picker Dropdown */}
      {isStorePickerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            onClick={() => setIsStorePickerOpen(false)}
          />
          
          {/* Store List */}
          <div className="fixed top-[110px] left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50 bg-surface rounded-2xl border overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)', borderColor: 'var(--card-border)' }}>
            <div className="p-5 border-b border-border gradient-tj-subtle">
              <h3 className="font-semibold text-foreground flex items-center gap-2.5">
                <div className="w-8 h-8 bg-tj-red-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                Choose Your Store
              </h3>
              <p className="text-sm text-muted-foreground mt-2 text-balance">Prices and availability may vary by location</p>
            </div>
            
            <div className="max-h-80 overflow-y-auto scrollbar-hide">
              {nearbyStores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => handleStoreSelect(store)}
                  className={`w-full p-4 text-left hover:bg-tj-cream-50 transition-all duration-200 border-b border-border/50 last:border-b-0 ${
                    selectedStore.id === store.id ? 'bg-tj-red-50 border-tj-red-100' : ''
                  }`}
                  style={selectedStore.id === store.id ? { boxShadow: 'var(--shadow-soft)' } : {}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-medium text-foreground">TJ's {store.name}</span>
                        {selectedStore.id === store.id && (
                          <div className="w-2 h-2 bg-tj-red-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{store.address}</div>
                      <div className="flex items-center gap-2.5 mt-2">
                        <span className="text-sm text-muted-foreground">{store.distance}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          store.isOpen 
                            ? 'bg-success-light text-success border border-success/20' 
                            : 'bg-error-light text-error border border-error/20'
                        }`}>
                          {store.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-tj-cream-50 border-t border-border">
              <button className="w-full text-sm text-tj-red-500 hover:text-tj-red-600 transition-colors duration-200 font-medium py-2 hover:bg-tj-red-50 rounded-lg">
                View All Locations
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}