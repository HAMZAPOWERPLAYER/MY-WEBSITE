import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  
  const mouse = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      const dx = mouse.current.x - outerPos.current.x;
      const dy = mouse.current.y - outerPos.current.y;
      
      outerPos.current.x += dx * 0.12;
      outerPos.current.y += dy * 0.12;
      
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(2)' : 'scale(1)'}`;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a') || target.classList.contains('interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile, isHovering]);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={outerRef}
        className={`fixed top-0 left-0 w-6 h-6 rounded-full border-2 pointer-events-none z-[10000] transition-colors duration-300 ${isHovering ? 'border-[#f5c518]' : 'border-[#00f0ff]'}`}
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={innerRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] transition-colors duration-300 ${isHovering ? 'bg-[#f5c518]' : 'bg-[#00f0ff]'}`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
