import { Home, Menu, Gift, User, Camera, Plus } from 'lucide-react';

const leftNavItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Menu, label: 'Menu', active: false },
];

interface BottomNavProps {
  onSurpriseClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
}

export function BottomNav({ onSurpriseClick, onProfileClick, onMenuClick }: BottomNavProps) {
  const leftNavItemsWithHandlers = [
    { icon: Home, label: 'Home', active: true, onClick: undefined },
    { icon: Menu, label: 'Menu', active: false, onClick: onMenuClick },
  ];

  const rightNavItems = [
    { icon: Gift, label: 'Surprise', active: false, notification: true, onClick: onSurpriseClick },
    { icon: User, label: 'Profile', active: false, onClick: onProfileClick },
  ];
  const allNavItems = [
    ...leftNavItemsWithHandlers,
    { icon: null, label: null, active: false, isCamera: true }, // Camera placeholder
    ...rightNavItems
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/90 border-t border-gray-100">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="grid grid-cols-5 gap-0">
          {allNavItems.map((item, index) => {
            if (item.isCamera) {
              // Center Camera Button
              return (
                <div key="camera" className="flex justify-center">
                  <button className="group relative flex flex-col items-center py-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#D32F2F] to-[#B22222] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 group-active:scale-95 transition-all duration-200">
                      <div className="relative">
                        <Camera className="w-7 h-7 text-white" />
                        <Plus className="w-3 h-3 text-white absolute -top-1 -right-1" />
                      </div>
                    </div>
                  </button>
                </div>
              );
            }

            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-1 py-2 px-2 hover:opacity-80 transition-opacity duration-200 relative"
              >
                {item.notification && (
                  <div className="absolute top-1 right-2 w-2 h-2 bg-[#D32F2F] rounded-full"></div>
                )}
                <IconComponent 
                  className={`w-6 h-6 transition-colors duration-200 ${
                    item.active 
                      ? 'text-[#D32F2F] fill-[#D32F2F]' 
                      : 'text-gray-500'
                  }`}
                />
                <span 
                  className={`text-xs font-medium transition-colors duration-200 text-center leading-tight whitespace-nowrap ${
                    item.active 
                      ? 'text-[#D32F2F]' 
                      : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}