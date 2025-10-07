import { useState, useEffect } from 'react';
import { ChefHat, ShoppingCart, Heart, Sparkles, Coffee, Star, X, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const hotPostsData = [
  { icon: ChefHat, title: "Recipe Hacks", gradient: "from-tj-amber-400 to-tj-red-500" },
  { icon: ShoppingCart, title: "Haul Reviews", gradient: "from-[#B22222] to-[#8B1538]" },
  { icon: Heart, title: "Staff Picks", gradient: "from-[#D32F2F] to-[#C62828]" },
  { icon: Sparkles, title: "New Products", gradient: "from-amber-600 to-[#D32F2F]" },
  { icon: Coffee, title: "Quick Bites", gradient: "from-[#8B4513] to-[#A0522D]" },
  { icon: Star, title: "Top Rated", gradient: "from-[#1B365D] to-[#2E4A6B]" },
];

const outOfStockItems = [
  {
    id: 1,
    name: "Everything But The Bagel Seasoning",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
    price: "$3.99",
    popularity: 98,
    expectedRestock: "Jan 5"
  },
  {
    id: 2,
    name: "Mandarin Orange Chicken",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
    price: "$5.99",
    popularity: 95,
    expectedRestock: "Jan 3"
  },
  {
    id: 3,
    name: "Cookie Butter",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    price: "$3.49",
    popularity: 92,
    expectedRestock: "Jan 8"
  },
  {
    id: 4,
    name: "Cauliflower Gnocchi",
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400",
    price: "$2.69",
    popularity: 89,
    expectedRestock: "Jan 4"
  },
  {
    id: 5,
    name: "Unexpected Cheddar",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400",
    price: "$4.49",
    popularity: 87,
    expectedRestock: "Jan 6"
  }
];

interface HotPostsProps {
  onRecipeHacksClick: () => void;
}

export function HotPosts({ onRecipeHacksClick }: HotPostsProps) {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState<{ [key: number]: number }>({});

  // Auto-progress stories
  useEffect(() => {
    if (activeStory !== null) {
      const interval = setInterval(() => {
        setStoryProgress(prev => {
          const current = prev[activeStory] || 0;
          if (current >= 100) {
            setActiveStory(null);
            return prev;
          }
          return { ...prev, [activeStory]: current + 2 };
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [activeStory]);

  const handleStoryClick = (index: number, post: any) => {
    if (post.title === "Recipe Hacks") {
      onRecipeHacksClick();
    } else {
      setActiveStory(index);
      setStoryProgress({ [index]: 0 });
    }
  };

  return (
    <div className="px-4 py-4 space-y-6">
      <div className="max-w-md mx-auto">
        {/* Hot Posts Section */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {hotPostsData.map((post, index) => {
            const IconComponent = post.icon;
            const isActive = activeStory === index;
            const progress = storyProgress[index] || 0;
            
            return (
              <button
                key={index}
                className="flex-shrink-0 flex flex-col items-center gap-2 group relative haptic-feedback"
                onClick={() => handleStoryClick(index, post)}
              >
                {/* Story Progress Ring */}
                <div className="relative">
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#D32F2F] bg-transparent opacity-80"></div>
                  )}
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${post.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-102 group-active:scale-98 transition-all duration-200 ${
                    isActive ? 'ring-2 ring-[#D32F2F] ring-offset-2' : ''
                  }`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <span className={`text-xs font-medium text-center max-w-[64px] transition-colors duration-200 ${
                  isActive ? 'text-[#D32F2F]' : 'text-gray-600'
                }`}>
                  {post.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Out of Stock Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D32F2F] rounded-full"></div>
              <h3 className="text-sm font-medium text-gray-900">Popular Items - Out of Stock</h3>
            </div>
            <button className="text-xs text-[#D32F2F] hover:text-[#B22222] transition-colors duration-200">
              View All
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {outOfStockItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-24 group cursor-pointer haptic-feedback"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 mb-2 relative transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Out of Stock Overlay */}
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="bg-gray-800/90 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                        <X className="w-3 h-3" />
                        Out
                      </div>
                    </div>
                    
                    {/* Popularity Badge */}
                    <div className="absolute top-1 right-1 bg-[#D32F2F] text-white px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      {item.popularity}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-gray-900 leading-tight line-clamp-2 h-8 group-hover:text-[#D32F2F] transition-colors duration-200">
                      {item.name}
                    </h4>
                    <div className="text-xs text-gray-600">{item.price}</div>
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">{item.expectedRestock}</span>
                    </div>
                  </div>
                  
                  {/* Notify Me Button */}
                  <button className="w-full mt-2 bg-gray-100 hover:bg-[#D32F2F] hover:text-white text-gray-700 text-xs py-1.5 px-2 rounded-lg transition-all duration-200 font-medium haptic-feedback">
                    Notify Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}