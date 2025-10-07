import { Anchor, Waves, Coffee, ShoppingBasket } from 'lucide-react';

// Option 1: Nautical/Maritime Style (Trader Joe's Hawaiian shirt vibe)
export function Logo1() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Anchor className="w-6 h-6 text-[#D32F2F]" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[#D32F2F] font-serif italic text-lg font-bold">TRADER</span>
        <span className="text-[#B22222] font-serif italic text-sm -mt-1">Joe's</span>
      </div>
    </div>
  );
}

// Option 2: Retro Script with Decorative Elements
export function Logo2() {
  return (
    <div className="relative">
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-400 rounded-full"></div>
      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#D32F2F] rounded-full"></div>
      <div className="flex flex-col leading-none px-2">
        <span className="text-[#D32F2F] font-serif italic text-lg font-bold tracking-wide">Trader</span>
        <span className="text-[#B22222] font-serif italic text-lg font-bold -mt-2 text-right">Joe's</span>
      </div>
    </div>
  );
}

// Option 3: Tropical/Tiki Style with Wave
export function Logo3() {
  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <Waves className="w-5 h-5 text-amber-500" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[#D32F2F] font-serif italic text-base font-bold">TRADER</span>
        <span className="text-amber-600 font-serif italic text-sm -mt-1 font-bold">Joe's</span>
      </div>
    </div>
  );
}

// Option 4: Modern Single Line with Emphasis
export function Logo4() {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[#D32F2F] font-serif italic text-xl font-bold">Trader</span>
      <span className="text-amber-600 font-serif italic text-lg font-bold">Joe's</span>
      <div className="w-1 h-1 bg-[#D32F2F] rounded-full mb-1"></div>
    </div>
  );
}

// Option 5: Grocery/Food Theme
export function Logo5() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <ShoppingBasket className="w-5 h-5 text-[#D32F2F]" />
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[#D32F2F] font-serif italic text-base font-bold">TRADER</span>
        <span className="text-[#B22222] font-serif italic text-sm -mt-1">Joe's</span>
      </div>
    </div>
  );
}

// Option 6: Vintage Badge Style
export function Logo6() {
  return (
    <div className="relative bg-gradient-to-br from-[#D32F2F] to-[#B22222] rounded-lg px-3 py-2 shadow-sm">
      <div className="flex flex-col leading-none text-center">
        <span className="text-white font-serif italic text-sm font-bold">TRADER</span>
        <span className="text-amber-200 font-serif italic text-xs -mt-0.5">Joe's</span>
      </div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full"></div>
    </div>
  );
}

// Option 7: Handwritten Style with Underline
export function Logo7() {
  return (
    <div className="relative">
      <div className="flex flex-col leading-none">
        <span className="text-[#D32F2F] font-serif italic text-lg font-bold transform -rotate-1">Trader</span>
        <span className="text-[#B22222] font-serif italic text-lg font-bold -mt-2 transform rotate-1">Joe's</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
    </div>
  );
}

// Option 8: Minimalist with Coffee Bean
export function Logo8() {
  return (
    <div className="flex items-center gap-2">
      <Coffee className="w-5 h-5 text-[#8B4513]" />
      <div className="flex items-baseline gap-0.5">
        <span className="text-[#D32F2F] font-serif italic text-lg font-bold">TJ's</span>
      </div>
    </div>
  );
}