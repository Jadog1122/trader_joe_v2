import { useState } from 'react';
import { 
  ArrowLeft,
  Settings,
  TrendingUp,
  ShoppingCart,
  Calendar,
  Star,
  Gift,
  DollarSign,
  Package,
  Clock,
  ChevronRight,
  Badge,
  Award,
  Heart,
  Share2,
  Edit
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'favorites'>('overview');

  // Mock user data
  const userData = {
    name: 'Sarah Chen',
    memberSince: 'March 2023',
    level: 'Gold Member',
    points: 2847,
    nextLevelPoints: 3000,
    monthlySpending: 287.45,
    totalSpending: 2847.20,
    monthlyBudget: 350,
    averageTrip: 42.30,
    tripsThisMonth: 7,
    totalTrips: 68
  };

  const frequentProducts = [
    {
      id: 1,
      name: 'Everything But The Bagel Seasoning',
      image: 'https://images.unsplash.com/photo-1560096142-792fc2baab4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwcHJvZHVjdHMlMjB0cmFkZXIlMjBqb2VzJTIwaXRlbXN8ZW58MXx8fHwxNzU5MTkxODgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      purchases: 12,
      lastBought: '3 days ago',
      price: '$3.99'
    },
    {
      id: 2,
      name: 'Cauliflower Gnocchi',
      image: 'https://images.unsplash.com/photo-1560096142-792fc2baab4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwcHJvZHVjdHMlMjB0cmFkZXIlMjBqb2VzJTIwaXRlbXN8ZW58MXx8fHwxNzU5MTkxODgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      purchases: 8,
      lastBought: '1 week ago',
      price: '$2.69'
    },
    {
      id: 3,
      name: 'Unexpected Cheddar Cheese',
      image: 'https://images.unsplash.com/photo-1560096142-792fc2baab4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwcHJvZHVjdHMlMjB0cmFkZXIlMjBqb2VzJTIwaXRlbXN8ZW58MXx8fHwxNzU5MTkxODgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      purchases: 6,
      lastBought: '2 weeks ago',
      price: '$4.49'
    }
  ];

  const recentPurchases = [
    {
      id: 1,
      date: 'Dec 28, 2024',
      store: 'TJ\'s Downtown',
      total: 67.83,
      items: 14,
      receipt: 'https://images.unsplash.com/photo-1693505628207-dbeb3d882c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc2hvcHBpbmclMjByZWNlaXB0JTIwaXRlbXN8ZW58MXx8fHwxNzU5MTkxODg1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      date: 'Dec 24, 2024',
      store: 'TJ\'s Westside',
      total: 43.29,
      items: 9,
      receipt: 'https://images.unsplash.com/photo-1693505628207-dbeb3d882c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc2hvcHBpbmclMjByZWNlaXB0JTIwaXRlbXN8ZW58MXx8fHwxNzU5MTkxODg1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      date: 'Dec 20, 2024',
      store: 'TJ\'s Downtown',
      total: 31.47,
      items: 7,
      receipt: 'https://images.unsplash.com/photo-1693505628207-dbeb3d882c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc2hvcHBpbmclMjByZWNlaXB0JTIwaXRlbXN8ZW58MXx8fHwxNzU5MTkxODg1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const monthlySpendingData = [
    { month: 'Jul', amount: 234 },
    { month: 'Aug', amount: 298 },
    { month: 'Sep', amount: 267 },
    { month: 'Oct', amount: 324 },
    { month: 'Nov', amount: 289 },
    { month: 'Dec', amount: 287 }
  ];

  const budgetProgress = (userData.monthlySpending / userData.monthlyBudget) * 100;
  const levelProgress = (userData.points / userData.nextLevelPoints) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-white">
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">Profile</h1>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200">
              <Settings className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </header>

        {/* Profile Header */}
        <div className="px-4 py-6 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <UserAvatar 
                name={userData.name}
                size="lg"
                showBadge={false}
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#D32F2F] rounded-full flex items-center justify-center shadow-lg hover:bg-[#B22222] transition-colors duration-200">
                <Edit className="w-3 h-3 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-600">Member since {userData.memberSince}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                  <Award className="w-3 h-3" />
                  {userData.level}
                </div>
                <div className="inline-flex items-center gap-1 bg-[#D32F2F] text-white px-2 py-1 rounded-full text-xs font-medium">
                  <Star className="w-3 h-3" />
                  {userData.points} pts
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress to Platinum</span>
              <span className="text-sm text-gray-600">{userData.points}/{userData.nextLevelPoints}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#D32F2F] to-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">This Month</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">${userData.monthlySpending}</div>
              <div className="text-xs text-gray-600">of ${userData.monthlyBudget} budget</div>
              <div className="w-full bg-green-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Total Spent</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">${userData.totalSpending}</div>
              <div className="text-xs text-gray-600">{userData.totalTrips} trips total</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Avg. Trip</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">${userData.averageTrip}</div>
              <div className="text-xs text-gray-600">{userData.tripsThisMonth} trips this month</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Rewards</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">$23</div>
              <div className="text-xs text-gray-600">Available to redeem</div>
            </div>
          </div>
        </div>

        {/* Monthly Spending Chart */}
        <div className="px-4 pb-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#D32F2F]" />
              Monthly Spending
            </h3>
            <div className="flex items-end justify-between gap-2 h-24">
              {monthlySpendingData.map((data, index) => {
                const height = (data.amount / 350) * 100; // Max height based on budget
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full flex items-end justify-center mb-1" style={{ height: '64px' }}>
                      <div 
                        className="w-6 bg-gradient-to-t from-[#D32F2F] to-orange-400 rounded-t transition-all duration-300 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'history', label: 'History', icon: Clock },
              { id: 'favorites', label: 'Favorites', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#D32F2F] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 pb-24">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Frequently Bought Products */}
              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#D32F2F]" />
                  Frequently Bought
                </h3>
                <div className="space-y-3">
                  {frequentProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-600">
                          Bought {product.purchases} times • Last: {product.lastBought}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{product.price}</div>
                        <button className="text-xs text-[#D32F2F] hover:text-[#B22222] transition-colors duration-200">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 py-2 text-sm text-[#D32F2F] hover:text-[#B22222] transition-colors duration-200 flex items-center justify-center gap-1">
                  View All Products
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* Recent Purchases */}
              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#D32F2F]" />
                  Recent Purchases
                </h3>
                <div className="space-y-3">
                  {recentPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <ImageWithFallback
                        src={purchase.receipt}
                        alt="Receipt"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{purchase.store}</h4>
                        <p className="text-xs text-gray-600">
                          {purchase.date} • {purchase.items} items
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">${purchase.total}</div>
                        <button className="text-xs text-[#D32F2F] hover:text-[#B22222] transition-colors duration-200 flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 py-2 text-sm text-[#D32F2F] hover:text-[#B22222] transition-colors duration-200 flex items-center justify-center gap-1">
                  View All History
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {/* Favorite Products */}
              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#D32F2F]" />
                  Saved Items
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {frequentProducts.map((product) => (
                    <div key={product.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-20 rounded-lg object-cover mb-2"
                      />
                      <h4 className="font-medium text-gray-900 text-xs mb-1">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{product.price}</span>
                        <button className="p-1 text-[#D32F2F] hover:text-[#B22222] transition-colors duration-200">
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 py-2 text-sm text-[#D32F2F] hover:text-[#B22222] transition-colors duration-200 flex items-center justify-center gap-1">
                  View All Favorites
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}