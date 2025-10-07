import { useState, useRef, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Plus, 
  Minus, 
  ChevronDown,
  Gift,
  Users,
  ShoppingCart,
  Star,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Camera,
  Share2,
  Zap,
  X,
  RotateCcw
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from './CartContext';

interface SurpriseBoxProps {
  onBack: () => void;
}

export function SurpriseBox({ onBack }: SurpriseBoxProps) {
  const { addItem, setCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    glutenFree: false,
    nutFree: false
  });

  // Mock state - could be 'pre-drop', 'lottery', 'pre-order', 'sold-out', 'pickup'
  const [currentState] = useState<'lottery' | 'pre-order' | 'sold-out' | 'pre-drop'>('lottery');
  
  // Lottery flow states
  const [lotteryStep, setLotteryStep] = useState<'main' | 'form' | 'spinning' | 'result'>('main');
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<'50off' | '25off' | 'fullprice' | 'nothing' | null>(null);
  const [finalRotation, setFinalRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const stores = [
    'Downtown Seattle - 1700 Madison St',
    'Capitol Hill - 1700 14th Ave', 
    'Ballard - 4555 14th Ave NW',
    'University Village - 4555 25th Ave NE',
    'West Seattle - 4741 42nd Ave SW'
  ];

  const timeSlots = [
    'Today 2:00 PM - 3:00 PM',
    'Today 4:00 PM - 5:00 PM', 
    'Tomorrow 10:00 AM - 11:00 AM',
    'Tomorrow 2:00 PM - 3:00 PM',
    'Tomorrow 5:00 PM - 6:00 PM',
    'Friday 12:00 PM - 1:00 PM',
    'Friday 3:00 PM - 4:00 PM'
  ];

  // Lottery functions
  const handleEnterLottery = () => {
    setLotteryStep('form');
  };

  const handleFormSubmit = () => {
    if (!selectedStore || !selectedTimeSlot) return;
    setLotteryStep('spinning');
    spinWheel();
  };

  const spinWheel = () => {
    setIsSpinning(true);
    
    // Determine result based on probabilities
    const random = Math.random();
    let result: '50off' | '25off' | 'fullprice' | 'nothing';
    
    if (random < 0.2) {
      result = '50off'; // 20% chance
    } else if (random < 0.4) {
      result = '25off'; // 20% chance  
    } else if (random < 0.6) {
      result = 'fullprice'; // 20% chance
    } else {
      result = 'nothing'; // 40% chance
    }
    
    // Calculate rotation to land on the correct segment
    const segmentAngles = {
      '50off': 45,    // 0-90 degrees
      '25off': 135,   // 90-180 degrees  
      'fullprice': 225, // 180-270 degrees
      'nothing': 315    // 270-360 degrees (and 0-90 for the second nothing segment)
    };
    
    const baseAngle = segmentAngles[result];
    const randomOffset = (Math.random() - 0.5) * 80; // Random within segment
    const spins = 3 + Math.random() * 2; // 3-5 full rotations
    const finalAngle = spins * 360 + baseAngle + randomOffset;
    
    setFinalRotation(finalAngle);
    setSpinResult(result);
    
    // Show result after animation
    setTimeout(() => {
      setIsSpinning(false);
      setLotteryStep('result');
    }, 3000);
  };

  const resetLottery = () => {
    setLotteryStep('main');
    setSpinResult(null);
    setFinalRotation(0);
    setSelectedStore('');
    setSelectedTimeSlot('');
  };

  const handleCompletePurchase = () => {
    if (!spinResult || spinResult === 'nothing') return;
    
    const basePrice = 24.99;
    let finalPrice = basePrice;
    let originalPrice: number | undefined = undefined;
    
    switch (spinResult) {
      case '50off':
        finalPrice = basePrice * 0.5;
        originalPrice = basePrice;
        break;
      case '25off':
        finalPrice = basePrice * 0.75;
        originalPrice = basePrice;
        break;
      case 'fullprice':
        finalPrice = basePrice;
        break;
    }

    // Add the surprise box to cart
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `surprise-box-${Date.now()}-${i}`,
        name: 'Winter Seasonal Surprise Box',
        price: finalPrice,
        originalPrice,
        image: 'https://images.unsplash.com/photo-1646181868801-17e68a0e8cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwZ2lmdCUyMGJveCUyMHN1cnByaXNlJTIwcGFja2FnZXxlbnwxfHx8fDE3NTkxOTE1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Seasonal',
        inStock: true
      });
    }

    // Open cart and navigate back
    setCartOpen(true);
    resetLottery();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowStoreDropdown(false);
        setShowTimeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStateContent = () => {
    switch (currentState) {
      case 'pre-drop':
        return {
          title: 'Coming Soon',
          subtitle: 'Get notified when the Winter Surprise Box drops',
          ctaText: 'Get Notified',
          ctaClass: 'bg-gray-600 hover:bg-gray-700'
        };
      case 'lottery':
        return {
          title: 'Lottery Open',
          subtitle: 'Enter for a chance to get the Winter Surprise Box',
          ctaText: 'Enter Lottery',
          ctaClass: 'bg-gradient-to-r from-[#D32F2F] to-[#B22222] hover:from-[#B22222] hover:to-[#8B1A1A]'
        };
      case 'pre-order':
        return {
          title: 'Pre-Order Now',
          subtitle: 'Limited Winter Surprise Boxes available',
          ctaText: 'Pre-Order Now',
          ctaClass: 'bg-gradient-to-r from-[#D32F2F] to-[#B22222] hover:from-[#B22222] hover:to-[#8B1A1A]'
        };
      case 'sold-out':
        return {
          title: 'Sold Out',
          subtitle: 'Join the waitlist for the next surprise box',
          ctaText: 'Join Waitlist',
          ctaClass: 'bg-amber-600 hover:bg-amber-700'
        };
    }
  };

  const stateContent = getStateContent();

  // Render different content based on lottery step
  if (lotteryStep === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-white">
        <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative">
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-100">
            <div className="px-4 py-3 flex items-center">
              <button 
                onClick={() => setLotteryStep('main')}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="ml-3 text-lg font-medium text-gray-900">Complete Your Entry</h1>
            </div>
          </header>

          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D32F2F] to-[#B22222] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">Almost There!</h2>
              <p className="text-gray-600 text-base leading-relaxed px-4">Select your pickup preferences to enter the lottery</p>
            </div>

            <div className="space-y-6">
              {/* Store Selection */}
              <div className="relative dropdown-container">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Pickup Store <span className="text-red-500">*</span>
                </label>
                <button 
                  onClick={() => {
                    setShowStoreDropdown(!showStoreDropdown);
                    setShowTimeDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-colors duration-200 ${
                    selectedStore 
                      ? 'border-[#D32F2F] bg-red-50' 
                      : 'border-gray-200 hover:border-[#D32F2F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className={selectedStore ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedStore || 'Select your preferred store'}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showStoreDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showStoreDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {stores.map((store, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedStore(store);
                          setShowStoreDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-semibold text-gray-900 text-sm leading-tight">
                          {store.split(' - ')[0]}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 leading-tight">
                          {store.split(' - ')[1]}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Slot Selection */}
              <div className="relative dropdown-container">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Pickup Time <span className="text-red-500">*</span>
                </label>
                <button 
                  onClick={() => {
                    setShowTimeDropdown(!showTimeDropdown);
                    setShowStoreDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-colors duration-200 ${
                    selectedTimeSlot 
                      ? 'border-[#D32F2F] bg-red-50' 
                      : 'border-gray-200 hover:border-[#D32F2F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className={selectedTimeSlot ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedTimeSlot || 'Choose your pickup time'}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showTimeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedTimeSlot(slot);
                          setShowTimeDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-semibold text-gray-900 text-sm leading-tight">
                          {slot}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-xl font-medium text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(Math.min(3, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-sm text-gray-500 ml-2">Max 3 per person</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button 
                onClick={handleFormSubmit}
                disabled={!selectedStore || !selectedTimeSlot}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedStore && selectedTimeSlot
                    ? 'bg-gradient-to-r from-[#D32F2F] to-[#B22222] hover:from-[#B22222] hover:to-[#8B1A1A] shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Zap className="w-5 h-5" />
                <span>Enter Lottery - ${(24.99 * quantity).toFixed(2)}</span>
              </button>
              <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                Entry fee is refundable if you don't win
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (lotteryStep === 'spinning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-red-50/20 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative flex flex-col items-center justify-center p-6">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#D32F2F] to-[#B22222] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Spinning the Wheel!</h2>
            <p className="text-gray-600 text-lg">Let's see what fate has in store...</p>
          </div>

          {/* Modern Spinning Wheel */}
          <div className="relative mb-12">
            {/* Outer Ring */}
            <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl"></div>
            
            {/* Wheel */}
            <div 
              ref={wheelRef}
              className="w-72 h-72 rounded-full relative overflow-hidden transition-transform duration-3000 ease-out shadow-xl m-4"
              style={{ 
                transform: `rotate(${finalRotation}deg)`,
                background: `conic-gradient(
                  from 0deg,
                  #10B981 0deg 72deg,     /* Nothing - 40% */
                  #D32F2F 72deg 90deg,    /* 50% off - 20% */
                  #F59E0B 90deg 108deg,   /* 25% off - 20% */
                  #6366F1 108deg 126deg,  /* Full price - 20% */
                  #10B981 126deg 198deg,  /* Nothing - 40% (continued) */
                  #D32F2F 198deg 216deg,  /* 50% off - 20% */
                  #F59E0B 216deg 234deg,  /* 25% off - 20% */
                  #6366F1 234deg 252deg,  /* Full price - 20% */
                  #10B981 252deg 360deg   /* Nothing - 40% (final) */
                )`
              }}
            >
              {/* Inner Circle */}
              <div className="absolute inset-6 bg-white rounded-full shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-8 h-8 text-[#D32F2F] mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-800">TJ's</div>
                  <div className="text-xs text-gray-600">LOTTERY</div>
                </div>
              </div>

              {/* Segment Labels - Better positioned */}
              <div className="absolute inset-0">
                {/* 50% OFF - Red segments */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs text-center leading-tight">
                  50%<br/>OFF
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rotate-180 text-white font-bold text-xs text-center leading-tight">
                  50%<br/>OFF
                </div>
                
                {/* 25% OFF - Amber segments */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 rotate-90 text-white font-bold text-xs text-center leading-tight">
                  25%<br/>OFF
                </div>
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 -rotate-90 text-white font-bold text-xs text-center leading-tight">
                  25%<br/>OFF
                </div>

                {/* FULL PRICE - Blue segments */}
                <div className="absolute top-12 right-12 transform rotate-45 text-white font-bold text-xs text-center leading-tight">
                  FULL<br/>PRICE
                </div>
                <div className="absolute bottom-12 left-12 transform rotate-225 text-white font-bold text-xs text-center leading-tight">
                  FULL<br/>PRICE
                </div>

                {/* NOTHING - Green segments */}
                <div className="absolute top-12 left-12 transform -rotate-45 text-white font-bold text-xs text-center leading-tight">
                  TRY<br/>AGAIN
                </div>
                <div className="absolute bottom-12 right-12 transform rotate-135 text-white font-bold text-xs text-center leading-tight">
                  TRY<br/>AGAIN
                </div>
              </div>
            </div>

            {/* Modern Pointer */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative">
                <div className="w-6 h-6 bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-gray-800 shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 text-[#D32F2F] font-semibold text-lg">
              <RotateCcw className="w-6 h-6 animate-spin" />
              <span>Determining your fate...</span>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              Results are determined fairly and randomly
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (lotteryStep === 'result') {
    const resultConfig = {
      '50off': {
        title: '🎉 CONGRATULATIONS!',
        subtitle: 'You won 50% off your Surprise Box!',
        price: (24.99 * quantity * 0.5).toFixed(2),
        originalPrice: (24.99 * quantity).toFixed(2),
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50'
      },
      '25off': {
        title: '🎊 NICE!',
        subtitle: 'You won 25% off your Surprise Box!',
        price: (24.99 * quantity * 0.75).toFixed(2),
        originalPrice: (24.99 * quantity).toFixed(2),
        color: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50'
      },
      'fullprice': {
        title: '📦 You Won!',
        subtitle: 'You can purchase at full price!',
        price: (24.99 * quantity).toFixed(2),
        originalPrice: null,
        color: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50'
      },
      'nothing': {
        title: '😔 Not This Time',
        subtitle: 'Better luck next time! Your entry fee will be refunded.',
        price: null,
        originalPrice: null,
        color: 'from-gray-500 to-gray-600',
        bgColor: 'bg-gray-50'
      }
    };

    const config = resultConfig[spinResult!];

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-white">
        <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative">
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-100">
            <div className="px-4 py-3 flex items-center justify-between">
              <h1 className="text-lg font-medium text-gray-900">Lottery Results</h1>
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </header>

          <div className="p-6 text-center">
            <div className={`p-8 rounded-2xl ${config.bgColor} mb-6`}>
              <div className="text-6xl mb-4">
                {spinResult === '50off' && '🎉'}
                {spinResult === '25off' && '🎊'}
                {spinResult === 'fullprice' && '📦'}
                {spinResult === 'nothing' && '😔'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h2>
              <p className="text-lg text-gray-700">{config.subtitle}</p>
            </div>

            {spinResult !== 'nothing' && (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-3 font-medium">Your Surprise Box</div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {config.originalPrice && (
                      <span className="text-lg text-gray-400 line-through font-medium">${config.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-[#D32F2F]">${config.price}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                    <div><span className="font-medium">Store:</span> {selectedStore?.split(' - ')[0]}</div>
                    <div><span className="font-medium">Pickup:</span> {selectedTimeSlot}</div>
                    <div><span className="font-medium">Quantity:</span> {quantity} box{quantity > 1 ? 'es' : ''}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {spinResult !== 'nothing' ? (
                <button 
                  onClick={handleCompletePurchase}
                  className={`w-full bg-gradient-to-r ${config.color} text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ${config.price}
                </button>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4 leading-relaxed">Your ${(24.99 * quantity).toFixed(2)} entry fee will be refunded within 3-5 business days.</p>
                </div>
              )}
              
              <button 
                onClick={resetLottery}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>Results are final. Entry fees for non-winning entries will be refunded automatically.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-white">
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative pb-24">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-100">
          <div className="px-4 py-3 flex items-center">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="ml-3 text-lg font-medium text-gray-900">Seasonal Surprise Box</h1>
          </div>
        </header>

        {/* Hero Section */}
        <div className="px-4 py-6 text-center bg-gradient-to-br from-red-50 to-orange-50">
          <div className="mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1646181868801-17e68a0e8cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwZ2lmdCUyMGJveCUyMHN1cnByaXNlJTIwcGFja2FnZXxlbnwxfHx8fDE3NTkxOTE1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Winter Surprise Box"
              className="w-32 h-32 mx-auto rounded-2xl shadow-lg object-cover"
            />
            <div className="mt-3">
              <div className="inline-flex items-center gap-1 bg-[#D32F2F] text-white px-3 py-1 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Winter Edition
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Limited seasonal picks.<br />
            Contents revealed at pickup.
          </h2>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-4">
            {['2', '14', '30', '45'].map((time, index) => (
              <div key={index} className="text-center">
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                  <div className="text-lg font-bold text-[#D32F2F]">{time}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {['Days', 'Hours', 'Min', 'Sec'][index]}
                </div>
              </div>
            ))}
          </div>

          {/* Price and CTA */}
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900 mb-1">$24.99</div>
            <div className="text-sm text-gray-600">Estimated value: $40-60</div>
          </div>

          <button 
            onClick={currentState === 'lottery' ? handleEnterLottery : undefined}
            className={`w-full ${stateContent.ctaClass} text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center`}
          >
            {stateContent.ctaText}
          </button>

          <p className="text-xs text-gray-500 mt-2">{stateContent.subtitle}</p>
        </div>

        {/* Store & Time Selection */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Pick Your Store</label>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#D32F2F] transition-colors duration-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {selectedStore || 'Select a store location'}
                </span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Pickup Time</label>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#D32F2F] transition-colors duration-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {selectedTimeSlot || 'Choose pickup time'}
                </span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-sm text-gray-500 ml-2">Max 3 per person</span>
            </div>
          </div>
        </div>

        {/* What's Inside Section */}
        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 mx-4 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#D32F2F]" />
            What's Inside?
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Winter seasonal favorites including snacks, beverages, pantry staples, and limited-edition items.
          </p>
          
          {/* Dietary Filters */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Dietary preferences:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(dietaryFilters).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setDietaryFilters(prev => ({ ...prev, [key]: !value }))}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                    value 
                      ? 'bg-[#D32F2F] text-white border-[#D32F2F]' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#D32F2F]'
                  }`}
                >
                  {key === 'vegan' ? 'Vegan' : key === 'glutenFree' ? 'Gluten-free' : 'Nut-free'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              ✓ Equal-value swap available at pickup
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">How It Works</h3>
          <div className="space-y-3">
            {[
              { icon: ShoppingCart, title: 'Join lottery or pre-order', desc: 'Secure your surprise box' },
              { icon: MapPin, title: 'Pick store & timeslot', desc: 'Choose convenient pickup' },
              { icon: Gift, title: 'Pick up & reveal', desc: 'Discover your seasonal treats' },
              { icon: Share2, title: 'Share your unboxing', desc: 'Join the #UnboxTJ community' }
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#D32F2F] rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 mx-4 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            #UnboxTJ Community
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Share your unboxing experience and see what others discovered!
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" />
              Share Unboxing
            </button>
            <button className="px-4 py-2 border border-amber-200 rounded-lg text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors duration-200">
              View Gallery
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">FAQ & Policies</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Allergy or dietary needs?</p>
                <p className="text-gray-600">We'll swap with an equal-value item at pickup.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Refund policy</p>
                <p className="text-gray-600">Full refund available if not satisfied.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">21+ items included</p>
                <p className="text-gray-600">Valid ID required for pickup if box contains alcohol.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-lg font-bold text-gray-900">
                  ${(24.99 * quantity).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {currentState === 'lottery' ? 'Lottery entry fee' : 'Total price'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {currentState === 'lottery' ? '1 in 3 chance' : `${quantity} box${quantity > 1 ? 'es' : ''}`}
                </div>
                <div className="text-xs text-gray-500">
                  {currentState === 'lottery' ? 'Estimated odds' : 'Quantity selected'}
                </div>
              </div>
            </div>
            <button 
              onClick={currentState === 'lottery' ? handleEnterLottery : undefined}
              className={`w-full ${stateContent.ctaClass} text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center`}
            >
              {stateContent.ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}