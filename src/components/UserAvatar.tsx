import { User } from 'lucide-react';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  userName?: string;
  showOnlineStatus?: boolean;
}

export function UserAvatar({ 
  size = 'md', 
  userName = 'You',
  showOnlineStatus = false 
}: UserAvatarProps) {
  // Generate a consistent color based on userName
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-[#D32F2F] to-[#B22222]', // Trader Joe's red
      'from-amber-500 to-orange-600', // Warm amber
      'from-orange-500 to-red-500',   // Orange-red
      'from-amber-600 to-yellow-600', // Golden
      'from-red-500 to-pink-500',     // Red-pink
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const gradientClass = getAvatarColor(userName);
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="relative">
      <button className="group relative overflow-hidden">
        <div className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${gradientClass}
          rounded-full flex items-center justify-center 
          shadow-md hover:shadow-lg
          transform hover:scale-105 active:scale-95 
          transition-all duration-200
          border-2 border-white
        `}>
          {/* Initials or User Icon */}
          {initials.length > 0 ? (
            <span className="text-white font-bold">
              {initials}
            </span>
          ) : (
            <User className={`${iconSizes[size]} text-white`} />
          )}
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>

        {/* Online Status Indicator */}
        {showOnlineStatus && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Tooltip on hover (optional) */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {userName}
      </div>
    </div>
  );
}