'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl tracking-tight text-foreground">
            S S KIRAN
          </Link>
          <div className="hidden md:flex gap-4">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/category/journals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Journals
            </Link>
            <Link href="/category/conferences" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Conferences
            </Link>
            <Link href="/category/patents" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Patents
            </Link>
            <Link href="/category/books" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Books
            </Link>
            <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button className="md:hidden p-2 text-foreground">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
