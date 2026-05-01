import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link href="/" className="font-bold text-xl tracking-tight text-foreground">
            S S KIRAN
          </Link>
          <p className="text-muted-foreground text-sm mt-2">
            Assistant Professor, Department of ECE
          </p>
        </div>
        
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="https://www.youtube.com/channel/UCtzuJLOveI88Oq3hwj7iRyg" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            YouTube
          </a>
          <a href="https://www.blogger.com/profile/12691857914051068566" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Profile
          </a>
          <Link href="/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} S S Kiran. All rights reserved.
      </div>
    </footer>
  );
}
