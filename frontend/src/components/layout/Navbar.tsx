import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-primary text-white shadow-md">
      <div className="mx-auto max-w-[1200px] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-christmas-red flex items-center justify-center text-white font-bold">DA</div>
          <div className="hidden sm:block">
            <div className="font-semibold">Debate Arena</div>
            <div className="text-xs text-primary/20">Realtime debates</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/create-room" className="hidden md:inline-flex items-center gap-2 bg-primary/70 hover:bg-primary/90 text-white px-3 py-1 rounded">Create Room</Link>
          <Link to="/join-room" className="px-3 py-1 rounded border border-white/10">Join</Link>
          <Link to="/profile" className="px-3 py-1 rounded border border-white/10">Profile</Link>
          <div className="ml-2 text-2xl">❄️</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
