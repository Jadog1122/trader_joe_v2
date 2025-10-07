import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Check, ShoppingCart, Plus, Info } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { useCart } from './CartContext';
import { toast } from "sonner@2.0.3";

interface PostData {
  id: string;
  username: string;
  verified: boolean;
  timestamp: string;
  image: string;
  likes: number;
  caption: string;
  productTags: string[];
  comments: number;
  products?: {
    name: string;
    price: string;
    description: string;
  }[];
}

interface PostProps {
  post: PostData;
}

export function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const heartButtonRef = useRef<HTMLButtonElement>(null);
  const { addItem } = useCart();
  
  // Swipe gesture states
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [swipeAction, setSwipeAction] = useState<'like' | 'cart' | null>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleAddAllToCart = () => {
    try {
      let itemsAdded = 0;
      
      if (post.products && post.products.length > 0) {
        post.products.forEach(product => {
          addItem({
            id: `${post.id}-${product.name.replace(/\s+/g, '-').toLowerCase()}`,
            name: product.name,
            price: parseFloat(product.price.replace('$', '')),
            image: post.image,
            category: 'Food',
            inStock: true,
          });
          itemsAdded++;
        });
      } else if (post.productTags.length > 0) {
        // If no specific products, add items based on product tags
        post.productTags.forEach((tag, index) => {
          addItem({
            id: `${post.id}-${tag.replace(/\s+/g, '-').toLowerCase()}`,
            name: tag,
            price: Math.floor(Math.random() * 10) + 3.99,
            image: post.image,
            category: 'Food',
            inStock: true,
          });
          itemsAdded++;
        });
      }
      
      // Show success toast
      if (itemsAdded > 0) {
        toast.success(`Added ${itemsAdded} item${itemsAdded > 1 ? 's' : ''} to cart! 🛒`, {
          description: `From ${post.username}'s post`,
          duration: 2000,
        });
      } else {
        toast.info('No products found to add to cart');
      }
    } catch (error) {
      console.error('Error adding items to cart:', error);
      toast.error('Failed to add items to cart. Please try again.');
    }
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
    isSwipingRef.current = false;
    setIsSwipeActive(false);
    setSwipeAction(null);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!startX.current) return;
    
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    const absDeltaX = Math.abs(deltaX);
    
    // Start swiping when movement is significant
    if (absDeltaX > 10 && !isSwipingRef.current) {
      isSwipingRef.current = true;
      setIsSwipeActive(true);
      e.preventDefault();
    }
    
    if (isSwipingRef.current) {
      e.preventDefault();
      
      // Limit swipe distance and add resistance
      const maxSwipe = 120;
      const resistanceFactor = 0.7;
      let limitedDelta = deltaX;
      
      if (Math.abs(deltaX) > maxSwipe) {
        limitedDelta = deltaX > 0 ? maxSwipe : -maxSwipe;
        limitedDelta = limitedDelta * resistanceFactor;
      }
      
      setSwipeOffset(limitedDelta);
      
      // Determine swipe action based on direction and distance
      if (Math.abs(limitedDelta) > 60) {
        if (limitedDelta > 0) {
          setSwipeAction('like');
        } else {
          setSwipeAction('cart');
        }
      } else {
        setSwipeAction(null);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    
    const deltaX = currentX.current - startX.current;
    const absDeltaX = Math.abs(deltaX);
    
    // Execute action if swipe was significant enough
    if (absDeltaX > 80) {
      if (deltaX > 0) {
        // Swipe right - Like
        handleLike();
      } else {
        // Swipe left - Add to cart
        handleAddAllToCart();
      }
    }
    
    // Reset swipe state
    setSwipeOffset(0);
    setIsSwipeActive(false);
    setSwipeAction(null);
    isSwipingRef.current = false;
    startX.current = 0;
    currentX.current = 0;
  };

  // Add touch event listeners
  useEffect(() => {
    const element = postRef.current;
    if (!element) return;
    
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={postRef}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 transition-all duration-300 hover:shadow-md relative overflow-hidden"
      style={{
        transform: isSwipeActive ? `translateX(${swipeOffset}px)` : 'translateX(0)',
        transition: isSwipeActive ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Swipe Action Indicators */}
      {isSwipeActive && (
        <>
          {/* Like Action (Right Swipe) */}
          <div 
            className={`absolute top-0 left-0 h-full w-32 flex items-center justify-center transition-opacity duration-200 z-0 ${
              swipeAction === 'like' ? 'opacity-100' : 'opacity-40'
            }`}
            style={{ backgroundColor: 'rgba(211, 47, 47, 0.1)' }}
          >
            <div className={`rounded-full p-3 transition-all duration-200 ${
              swipeAction === 'like' ? 'bg-[#D32F2F] scale-110' : 'bg-[#D32F2F]/70'
            }`}>
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
          
          {/* Cart Action (Left Swipe) */}
          <div 
            className={`absolute top-0 right-0 h-full w-32 flex items-center justify-center transition-opacity duration-200 z-0 ${
              swipeAction === 'cart' ? 'opacity-100' : 'opacity-40'
            }`}
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
          >
            <div className={`rounded-full p-3 transition-all duration-200 ${
              swipeAction === 'cart' ? 'bg-[#f59e0b] scale-110' : 'bg-[#f59e0b]/70'
            }`}>
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </>
      )}

      {/* Post Header */}
      <div className="flex items-center justify-between p-4 relative z-10">
        <div className="flex items-center gap-3">
          <UserAvatar 
            userName={post.username} 
            size="md" 
            showOnlineStatus={false}
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-900">{post.username}</span>
              {post.verified && (
                <div className="bg-[#D32F2F] rounded-full p-0.5">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">{post.timestamp}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full transition-all duration-200 haptic-feedback">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Post Image */}
      <div className="aspect-square overflow-hidden relative z-10">
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              ref={heartButtonRef}
              onClick={handleLike}
              className="group transition-all duration-200 haptic-feedback hover:scale-105"
            >
              <Heart 
                className={`w-6 h-6 transition-all duration-300 ${
                  isLiked 
                    ? 'text-[#D32F2F] fill-[#D32F2F]' 
                    : 'text-gray-700 hover:text-[#D32F2F]'
                }`}
              />
            </button>
            <button className="transition-all duration-200 haptic-feedback hover:scale-105">
              <MessageCircle className="w-6 h-6 text-gray-700 hover:text-[#D32F2F] transition-all duration-200" />
            </button>
            <button className="transition-all duration-200 haptic-feedback hover:scale-105">
              <Send className="w-6 h-6 text-gray-700 hover:text-[#D32F2F] transition-all duration-200" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* Product Info Button */}
            {(post.products || post.productTags.length > 0) && (
              <button 
                onClick={() => setShowProductInfo(!showProductInfo)}
                className="transition-all duration-200 haptic-feedback hover:scale-105"
              >
                <Info className="w-6 h-6 text-gray-700 hover:text-[#D32F2F] transition-all duration-200" />
              </button>
            )}
            <button 
              onClick={handleSave}
              className="transition-all duration-200 haptic-feedback hover:scale-105"
            >
              <Bookmark 
                className={`w-6 h-6 transition-all duration-300 ${
                  isSaved 
                    ? 'text-[#D32F2F] fill-[#D32F2F]' 
                    : 'text-gray-700 hover:text-[#D32F2F]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Like Count */}
        <div className="mb-2">
          <span className="font-bold text-gray-900">
            {likeCount.toLocaleString()} likes
          </span>
        </div>

        {/* Caption */}
        <div className="mb-3">
          <span className="font-medium text-gray-900 mr-2">{post.username}</span>
          <span className="text-gray-700">{post.caption}</span>
        </div>

        {/* Product Tags */}
        {post.productTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.productTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-full text-xs font-medium text-[#B22222]"
              >
                🏷️ {tag}
              </span>
            ))}
          </div>
        )}

        {/* Product Information Panel */}
        {showProductInfo && (post.products || post.productTags.length > 0) && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Featured Products</h4>
              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#D32F2F] text-white rounded-lg text-xs font-medium hover:bg-[#B22222] transition-colors duration-200 haptic-feedback"
              >
                <ShoppingCart className="w-3 h-3" />
                Add All to Cart
              </button>
            </div>
            
            {post.products ? (
              <div className="space-y-2">
                {post.products.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-600">{product.description}</div>
                    </div>
                    <div className="text-sm font-medium text-[#D32F2F]">{product.price}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {post.productTags.map((tag, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{tag}</div>
                      <div className="text-xs text-gray-600">As featured in this post</div>
                    </div>
                    <div className="text-sm font-medium text-[#D32F2F]">
                      ${(Math.floor(Math.random() * 10) + 3.99).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200">
            View all {post.comments} comments
          </button>
        )}
      </div>

      {/* Swipe Instructions (Only show for first few posts) */}
      {!isSwipeActive && post.id === '1' && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-3 py-1 rounded-full animate-pulse">
          ← Swipe for cart • Swipe for like →
        </div>
      )}
    </div>
  );
}