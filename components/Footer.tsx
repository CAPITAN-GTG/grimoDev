import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-amber-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/logo.jpeg"
            alt="Grimo Dev Logo"
            width={64}
            height={64}
            className="rounded-full"
            priority
          />
          <div className="text-xl">Grimo Dev</div>
          <div className="flex items-center justify-center space-x-2">
          </div>
          <div className="text-amber-200/80 max-w-md mx-auto mt-4">
            ready to help out any company in need!
          </div>
        </div>
        <div className="border-t border-amber-800 mt-8 pt-8 text-sm">
          <p>© {new Date().getFullYear()} Grimo Dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 