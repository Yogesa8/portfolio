import { useState, useRef, useEffect, useMemo } from "react";
import { Home, Briefcase, Calendar, Shield, Settings } from "lucide-react";

const defaultItems = [
  { label: "home", icon: Home },
  { label: "strategy", icon: Briefcase },
  { label: "period", icon: Calendar },
  { label: "security", icon: Shield },
  { label: "settings", icon: Settings },
];

const defaultAccentColor = "var(--component-active-color-default)";

const InteractiveMenu = ({ items, accentColor, onItemSelect }) => {
  const finalItems = useMemo(() => {
    const isValid =
      items && Array.isArray(items) && items.length >= 2 && items.length <= 5;

    if (!isValid) {
      console.warn(
        "InteractiveMenu: 'items' prop is invalid or missing. Using default items.",
        items,
      );
      return defaultItems;
    }

    return items;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = activeIndex < finalItems.length ? activeIndex : 0;

  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemElement = itemRefs.current[safeActiveIndex];
      const activeTextElement = textRefs.current[safeActiveIndex];

      if (activeItemElement && activeTextElement) {
        const textWidth = activeTextElement.offsetWidth;
        activeItemElement.style.setProperty("--lineWidth", `${textWidth}px`);
      }
    };

    setLineWidth();

    window.addEventListener("resize", setLineWidth);
    return () => {
      window.removeEventListener("resize", setLineWidth);
    };
  }, [safeActiveIndex, finalItems]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    onItemSelect?.(finalItems[index], index);
  };

  const navStyle = useMemo(() => {
    const activeColor = accentColor || defaultAccentColor;
    return { "--component-active-color": activeColor };
  }, [accentColor]);

  return (
    <nav className="menu" role="navigation" style={navStyle}>
      {finalItems.map((item, index) => {
        const isActive = index === safeActiveIndex;
        const isTextActive = isActive;
        const IconComponent = item.icon;

        return (
          <button
            key={item.label}
            className={`menu__item ${isActive ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            style={{ "--lineWidth": "0px" }}
            type="button"
            aria-label={`Go to ${item.label}`}
          >
            <div className="menu__icon">
              <IconComponent className="icon" />
            </div>
            <strong
              className={`menu__text ${isTextActive ? "active" : ""}`}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
            >
              {item.label}
            </strong>
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };
