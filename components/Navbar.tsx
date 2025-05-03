import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-stone-900 text-amber-100 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="text-2xl hover:text-amber-400 transition-colors">
            ⚔️ Grimo Dev
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 