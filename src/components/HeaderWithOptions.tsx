import { Search, Gift } from 'lucide-react';
import { Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8 } from './LogoOptions';

export function HeaderWithOptions() {
  return (
    <div className="space-y-4 p-4 bg-gray-50">
      <h2 className="text-xl font-bold text-center mb-6">Trader Joe's Logo Options</h2>
      
      {/* Option 1: Nautical/Maritime */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 1: Nautical/Maritime Style</h3>
          <p className="text-sm text-gray-500">Hawaiian shirt vibes with anchor icon</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo1 />
        </div>
      </div>

      {/* Option 2: Retro Script */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 2: Retro Script with Decorative Dots</h3>
          <p className="text-sm text-gray-500">Playful dots with elegant script styling</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo2 />
        </div>
      </div>

      {/* Option 3: Tropical/Tiki */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 3: Tropical/Tiki Style</h3>
          <p className="text-sm text-gray-500">Wave icon with warm amber accents</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo3 />
        </div>
      </div>

      {/* Option 4: Modern Single Line */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 4: Modern Single Line</h3>
          <p className="text-sm text-gray-500">Clean baseline alignment with accent dot</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo4 />
        </div>
      </div>

      {/* Option 5: Grocery Theme */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 5: Grocery/Food Theme</h3>
          <p className="text-sm text-gray-500">Shopping basket icon with accent dot</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo5 />
        </div>
      </div>

      {/* Option 6: Vintage Badge */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 6: Vintage Badge Style</h3>
          <p className="text-sm text-gray-500">Classic badge with gradient background</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo6 />
        </div>
      </div>

      {/* Option 7: Handwritten */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 7: Handwritten Style</h3>
          <p className="text-sm text-gray-500">Playful rotation with underline accent</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo7 />
        </div>
      </div>

      {/* Option 8: Minimalist */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Option 8: Minimalist "TJ's"</h3>
          <p className="text-sm text-gray-500">Coffee bean icon with abbreviated name</p>
        </div>
        <div className="p-4 flex justify-center">
          <Logo8 />
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 pt-4">
        Each option captures Trader Joe's personality while fitting the mobile app header space
      </div>
    </div>
  );
}