// src/components/common/LuxuryIcon.tsx

import React from 'react';
import {
  Home,
  PenTool,
  Ruler,
  Paintbrush,
  Palette,
  Sparkles,
  PanelsTopLeft,
  Lamp,
  Hammer,
  Wrench,
  HardHat,
  Images,
  ClipboardList,
  MapPinned,
  Activity,
  LayoutDashboard,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  CalendarCheck,
  Layers,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  User,
  Settings,
  Briefcase
} from 'lucide-react';

export type IconName =
  | 'Home' | 'PenTool' | 'Ruler'
  | 'Paintbrush' | 'Palette'
  | 'Sparkles' | 'PanelsTopLeft' | 'Lamp'
  | 'Hammer' | 'Wrench' | 'HardHat'
  | 'Images' | 'ClipboardList' | 'MapPinned' | 'Activity'
  | 'LayoutDashboard' | 'Phone' | 'MessageCircle' | 'Mail'
  | 'MapPin' | 'Clock' | 'ShieldCheck' | 'CheckCircle' | 'CalendarCheck'
  | 'Layers' | 'ArrowRight' | 'ArrowUpRight' | 'ChevronRight' | 'User' | 'Settings' | 'Briefcase';

const iconMap: Record<IconName, React.ComponentType<any>> = {
  Home,
  PenTool,
  Ruler,
  Paintbrush,
  Palette,
  Sparkles,
  PanelsTopLeft,
  Lamp,
  Hammer,
  Wrench,
  HardHat,
  Images,
  ClipboardList,
  MapPinned,
  Activity,
  LayoutDashboard,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  CalendarCheck,
  Layers,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  User,
  Settings,
  Briefcase
};

interface LuxuryIconProps {
  icon: IconName | React.ComponentType<any>;
  size?: number;
  variant?: 'gold' | 'outline' | 'glow' | 'simple';
  className?: string;
  ariaLabel?: string;
}

export const LuxuryIcon: React.FC<LuxuryIconProps> = ({
  icon,
  size = 20,
  variant = 'gold',
  className = '',
  ariaLabel
}) => {
  // Resolve component
  const IconComponent = typeof icon === 'string'
    ? (iconMap[icon as IconName] || Sparkles)
    : icon;

  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return 'bg-neutral-950 border border-luxury-gold text-luxury-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all';
      case 'glow':
        return 'bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]';
      case 'outline':
        return 'bg-transparent border border-white/10 text-luxury-muted hover:border-luxury-gold/30 hover:text-luxury-gold transition-all';
      case 'simple':
      default:
        return 'text-luxury-gold bg-transparent p-0 border-0';
    }
  };

  const containerClasses = variant !== 'simple'
    ? `inline-flex items-center justify-center rounded-sm p-2.5 ${getVariantStyles()}`
    : 'inline-flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`} aria-label={ariaLabel}>
      <IconComponent size={size} className="stroke-[1.75]" />
    </div>
  );
};

export default LuxuryIcon;
