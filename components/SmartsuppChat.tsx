"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SmartsuppChat() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't load on admin pages
    if (pathname?.startsWith("/admin")) return;

    if (typeof window === "undefined") return;
    if ((window as any)._smartsupp) return; // already loaded

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
var _smartsupp = _smartsupp || {};
_smartsupp.key = '65e59a709f86cb62e874d3eee7df9e13d7c949e8';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
`;
    document.head.appendChild(script);

    // noscript fallback
    const noscript = document.createElement("noscript");
    noscript.innerHTML = 'Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a>';
    document.head.appendChild(noscript);
  }, [pathname]);

  return null;
}