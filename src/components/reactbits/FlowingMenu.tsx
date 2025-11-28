import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // Import motion for the active indicator

interface FlowingMenuItem {
  href: string;
  label: string;
  accent?: string;
}

interface FlowingMenuProps {
  items: FlowingMenuItem[];
  activeHref?: string;
  onItemClick?: (item: FlowingMenuItem) => void; // Changed type to pass the item
  className?: string;
  menuLabel?: string;
  itemRole?: React.AriaRole;
  authAction?: {
    label: string;
    onClick: () => void;
  };
}

const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: "expo" };

const findClosestEdge = (
  mouseX: number,
  mouseY: number,
  width: number,
  height: number,
): "top" | "bottom" => {
  const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
  const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
  return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
};

interface MenuItemProps extends FlowingMenuItem {
  isActive: boolean;
  reduceMotion: boolean;
  onItemClick?: (item: FlowingMenuItem) => void;
  role?: React.AriaRole;
}

const defaultAccent = "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)";

const MenuItem: React.FC<MenuItemProps> = ({ href, label, accent, isActive, reduceMotion, onItemClick, role }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const handleEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" });
  };

  const accentStyle = React.useMemo(() => {
    if (!accent) {
      return { background: defaultAccent };
    }

    if (accent.startsWith("url(")) {
      return { backgroundImage: accent };
    }

    if (accent.startsWith("linear") || accent.startsWith("radial") || accent.startsWith("conic")) {
      return { background: accent };
    }

    return { background: accent };
  }, [accent]);

  const repeatedMarqueeContent = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={`${label}-${idx}`}>
          <span className="text-[color:var(--flowing-menu-text)] uppercase font-medium text-[4vh] leading-[1.2] px-[1vw]">{label}</span>
          <div
            className="min-w-[120px] h-[6vh] my-[1.5vh] mx-[1vw] rounded-[999px] bg-cover bg-center"
            style={accentStyle}
          />
        </React.Fragment>
      )),
    [accentStyle, label],
  );

  return (
    <div
      ref={itemRef}
      className={cn(
        "group relative flex-1 overflow-hidden bg-surface-0 text-center shadow-inset transition-colors",
        // Removed isActive styling from here, will use motion.span inside Link
      )}
    >
      <Link
        to={href}
        className={cn(
          "relative flex h-full min-h-[64px] w-full items-center justify-center px-6 py-4 text-lg font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isActive ? "text-primary" : "text-foreground/80 hover:text-foreground", // Ensure text is primary when active
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => onItemClick?.({ href, label, accent })} // Pass the entire item
        aria-current={isActive ? "page" : undefined}
        role={role}
        data-menu-item
      >
        {label}
        {isActive && (
          <motion.span
            layoutId="gooey-active-mobile" // Use a different layoutId for mobile to avoid conflicts
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 blur-xl"
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          />
        )}
      </Link>
      <div
        ref={marqueeRef}
        className="pointer-events-none absolute inset-0 translate-y-[101%] bg-white text-foreground transition-transform duration-500 ease-out"
      >
        <div ref={marqueeInnerRef} className="flex h-full w-[200%]">
          <div className="flex h-full w-[200%] items-center animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FlowingMenu = React.forwardRef<HTMLDivElement, FlowingMenuProps>(
  ({ items, activeHref, onItemClick, className, menuLabel = "Mobile navigation", itemRole = "menuitem", authAction }, ref) => {
  const reduceMotion = useReducedMotion();

  const handleAuthClick = () => {
    if (authAction?.onClick) {
      authAction.onClick();
      onItemClick?.({ href: "#", label: authAction.label }); // Pass a dummy item for auth action
    }
  };

  return (
    <div ref={ref} className={cn("w-full overflow-hidden", className)}>
      <nav
        className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-surface-1/95 backdrop-blur-xl"
        aria-label={menuLabel}
        role="menu"
        aria-orientation="vertical"
      >
        {items.map((item) => (
          <MenuItem
            key={item.href}
            {...item}
            isActive={activeHref === item.href}
            reduceMotion={reduceMotion}
            onItemClick={onItemClick}
            role={itemRole}
          />
        ))}
        {authAction && (
          <div className="group relative flex-1 overflow-hidden bg-surface-0 text-center shadow-inset transition-colors border-t border-border/60">
            <button
              onClick={handleAuthClick}
              className="flex h-full min-h-[64px] w-full items-center justify-center px-6 py-4 text-lg font-semibold uppercase transition-colors text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              role={itemRole}
            >
              {authAction.label}
            </button>
          </div>
        )}
      </nav>
    </div>
  );
  },
);

FlowingMenu.displayName = "FlowingMenu";