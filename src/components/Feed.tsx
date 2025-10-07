import { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Post } from './PostEnhanced';
import { SkeletonFeed } from './SkeletonPost';

const mockPosts = [
  {
    id: '1',
    username: 'foodie_sarah',
    verified: true,
    timestamp: '2h',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800',
    likes: 2847,
    caption: 'Best avocado toast hack using TJ\'s everything bagel seasoning! 🥑✨ Game changer!',
    productTags: ['Everything Bagel Seasoning', 'Organic Bread', 'Avocados'],
    comments: 156,
    products: [
      { name: 'Everything But The Bagel Seasoning', price: '$3.99', description: 'Perfect blend of sesame seeds, garlic, and onion' },
      { name: 'Organic Sourdough Bread', price: '$4.49', description: 'Fresh baked daily with organic ingredients' },
      { name: 'Organic Avocados (2 pack)', price: '$2.99', description: 'Perfectly ripe, creamy avocados' }
    ]
  },
  {
    id: '2',
    username: 'tj_explorer',
    verified: false,
    timestamp: '4h',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    likes: 1203,
    caption: 'Today\'s haul was AMAZING! So many new seasonal items to try 🛒',
    productTags: ['Fall Harvest Soup', 'Pumpkin Spice Cookies', 'Apple Cider'],
    comments: 89,
    products: [
      { name: 'Fall Harvest Soup', price: '$3.49', description: 'Warm blend of seasonal vegetables and spices' },
      { name: 'Pumpkin Spice Cookies', price: '$4.99', description: 'Soft-baked cookies with real pumpkin and warm spices' },
      { name: 'Organic Apple Cider', price: '$2.99', description: 'Fresh pressed apples, no added sugar' }
    ]
  },
  {
    id: '3',
    username: 'chef_marcus',
    verified: true,
    timestamp: '6h',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
    likes: 3654,
    caption: 'Made this incredible pasta using TJ\'s truffle sauce. 15 minutes to pure bliss! 🍝',
    productTags: ['Truffle Pasta Sauce', 'Fresh Pasta', 'Parmesan'],
    comments: 234,
    products: [
      { name: 'Truffle Pasta Sauce', price: '$7.99', description: 'Rich, creamy sauce with real truffle pieces' },
      { name: 'Fresh Fettuccine', price: '$2.49', description: 'Made fresh daily in our kitchen' },
      { name: 'Parmigiano Reggiano', price: '$9.99', description: 'Aged 24 months, imported from Italy' }
    ]
  },
  {
    id: '4',
    username: 'healthy_hannah',
    verified: false,
    timestamp: '8h',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    likes: 892,
    caption: 'Prepped my week with these gorgeous organic veggies from TJ\'s! 🌈🥕',
    productTags: ['Organic Rainbow Carrots', 'Brussels Sprouts', 'Sweet Potatoes'],
    comments: 67,
    products: [
      { name: 'Organic Rainbow Carrots', price: '$2.99', description: 'Colorful heirloom carrots, sweet and crunchy' },
      { name: 'Brussels Sprouts', price: '$2.49', description: 'Fresh, tender sprouts perfect for roasting' },
      { name: 'Organic Sweet Potatoes', price: '$1.99', description: 'Naturally sweet and nutritious' }
    ]
  },
  {
    id: '5',
    username: 'smoothie_queen',
    verified: false,
    timestamp: '1d',
    image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=800',
    likes: 1456,
    caption: 'Morning fuel! This acai bowl with TJ\'s frozen fruit blend is perfection 💜',
    productTags: ['Frozen Acai Packets', 'Organic Berries', 'Granola'],
    comments: 78,
    products: [
      { name: 'Frozen Acai Packets', price: '$4.99', description: 'Pure acai superfruit, no added sugar' },
      { name: 'Organic Berry Medley', price: '$5.99', description: 'Strawberries, blueberries, and raspberries' },
      { name: 'Vanilla Almond Granola', price: '$3.99', description: 'Crunchy clusters with real vanilla and almonds' }
    ]
  }
];

export function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(0);
  const [posts, setPosts] = useState(mockPosts);
  const feedRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const pullDistance = useRef<number>(0);

  // Initial loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (window.scrollY === 0 && startY.current > 0) {
      const currentY = e.touches[0].clientY;
      pullDistance.current = Math.max(0, currentY - startY.current);
      
      if (pullDistance.current > 0) {
        e.preventDefault();
        const progress = Math.min(pullDistance.current / 100, 1);
        setRefreshProgress(progress);
        
        if (feedRef.current) {
          feedRef.current.style.transform = `translateY(${Math.min(pullDistance.current * 0.5, 50)}px)`;
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance.current > 80 && !isRefreshing) {
      triggerRefresh();
    } else {
      resetPull();
    }
    startY.current = 0;
    pullDistance.current = 0;
  };

  const triggerRefresh = async () => {
    setIsRefreshing(true);
    setRefreshProgress(1);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add a new post to the beginning
    const newPost = {
      id: `new-${Date.now()}`,
      username: 'fresh_content',
      verified: true,
      timestamp: 'now',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
      likes: Math.floor(Math.random() * 2000) + 500,
      caption: 'Just refreshed the feed! Here\'s something delicious to brighten your day! 🌟',
      productTags: ['Fresh Discovery', 'New Arrival'],
      comments: Math.floor(Math.random() * 100) + 20
    };
    
    setPosts(prev => [newPost, ...prev]);
    resetPull();
    setIsRefreshing(false);
  };

  const resetPull = () => {
    setRefreshProgress(0);
    if (feedRef.current) {
      feedRef.current.style.transform = 'translateY(0)';
      feedRef.current.style.transition = 'transform 0.3s ease';
      setTimeout(() => {
        if (feedRef.current) {
          feedRef.current.style.transition = '';
        }
      }, 300);
    }
  };

  useEffect(() => {
    const element = feedRef.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd);

      return () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  if (isLoading) {
    return <SkeletonFeed />;
  }

  return (
    <div ref={feedRef} className="px-4 pb-20 relative">
      {/* Pull to Refresh Indicator */}
      {refreshProgress > 0 && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="bg-white rounded-full p-3 shadow-lg border border-gray-100">
            <RefreshCw 
              className={`w-5 h-5 text-[#D32F2F] transition-transform duration-200 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              style={{ 
                transform: `rotate(${refreshProgress * 180}deg)` 
              }}
            />
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="opacity-100"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              animation: 'fadeIn 0.3s ease-out forwards'
            }}
          >
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}