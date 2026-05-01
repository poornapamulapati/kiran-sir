'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ProseWrapper({ htmlContent }: { htmlContent: string }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        if (link.hostname !== window.location.hostname && link.href.startsWith('http')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });

      // Add fallback links for iframes (like Google Drive PDFs)
      const iframes = contentRef.current.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (iframe.src && iframe.src.includes('drive.google.com')) {
          // Check if we already added a fallback link
          if (!iframe.nextElementSibling?.classList.contains('iframe-fallback')) {
            const fallbackLink = document.createElement('a');
            fallbackLink.href = iframe.src;
            fallbackLink.target = '_blank';
            fallbackLink.rel = 'noopener noreferrer';
            fallbackLink.className = 'iframe-fallback block mt-2 mb-8 text-center text-sm font-medium text-primary hover:underline bg-primary/10 py-2 rounded-lg';
            fallbackLink.innerHTML = '📄 Click here to open the document directly if it does not load above';
            iframe.parentNode?.insertBefore(fallbackLink, iframe.nextSibling);
            
            // Fix iframe styling to ensure it displays well
            iframe.classList.add('w-full', 'rounded-xl', 'border', 'border-border', 'shadow-sm');
            if (!iframe.style.height || iframe.style.height === '100%') {
              iframe.style.minHeight = '600px';
            }
          }
        }
      });
    }
  }, [htmlContent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      ref={contentRef}
      className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:shadow-md prose-headings:font-bold prose-a:text-primary mx-auto"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
