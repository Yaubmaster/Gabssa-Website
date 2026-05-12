// icons.jsx — minimal Lucide-style icons inline
const Icon = ({ children, size = 22, stroke = 1.6, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke}
       strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
);

const IconHeadphones = (p) => <Icon {...p}><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14v3a2 2 0 0 1-2 2h-2v-7h4z"/><path d="M3 14v3a2 2 0 0 0 2 2h2v-7H3z"/></Icon>;
const IconWallet     = (p) => <Icon {...p}><path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v10a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-3"/><path d="M14 13h7v-3h-7a1.5 1.5 0 0 0 0 3z"/></Icon>;
const IconDatabase   = (p) => <Icon {...p}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></Icon>;
const IconShield     = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></Icon>;
const IconUsers      = (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const IconServer     = (p) => <Icon {...p}><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/></Icon>;
const IconMegaphone  = (p) => <Icon {...p}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a5 5 0 0 1 0 8"/><path d="M19 5a9 9 0 0 1 0 14"/></Icon>;
const IconAward      = (p) => <Icon {...p}><circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/></Icon>;
const IconPhone      = (p) => <Icon {...p}><path d="M22 16.92v2.92a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h2.92a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;
const IconTarget     = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>;
const IconTrending   = (p) => <Icon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Icon>;
const IconArrow      = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></Icon>;
const IconCheck      = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
const IconGlobe      = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></Icon>;
const IconMenu       = (p) => <Icon {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>;
const IconClose      = (p) => <Icon {...p}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></Icon>;
const IconBank       = (p) => <Icon {...p}><path d="M3 9 12 4l9 5"/><path d="M5 9v10h14V9"/><path d="M8 14v3M12 14v3M16 14v3"/><path d="M3 21h18"/></Icon>;
const IconCar        = (p) => <Icon {...p}><path d="M5 17h14"/><path d="m3 13 2-6h14l2 6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></Icon>;
const IconCart       = (p) => <Icon {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></Icon>;
const IconUmbrella   = (p) => <Icon {...p}><path d="M12 2v2"/><path d="M2 11a10 10 0 0 1 20 0"/><path d="M12 11v8a2 2 0 0 1-4 0"/></Icon>;
const IconSignal     = (p) => <Icon {...p}><path d="M2 20h2v-4H2zM7 20h2v-9H7zM12 20h2V8h-2zM17 20h2V4h-2z"/></Icon>;
const IconUtensils   = (p) => <Icon {...p}><path d="M3 2v7a3 3 0 0 0 3 3v10"/><path d="M6 2v10"/><path d="M9 2v7"/><path d="M18 14V2c-2.21 0-4 3.58-4 8s1.79 4 4 4z"/><path d="M18 14v8"/></Icon>;
const IconBuilding   = (p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/></Icon>;
const IconCap        = (p) => <Icon {...p}><path d="M2 10 12 5l10 5-10 5z"/><path d="M6 12v5c0 1 3 2 6 2s6-1 6-2v-5"/></Icon>;
const IconChevron    = (p) => <Icon {...p}><polyline points="9 18 15 12 9 6"/></Icon>;
const IconSparkle    = (p) => <Icon {...p}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M6.3 6.3 4.2 4.2M19.8 19.8l-2.1-2.1M6.3 17.7 4.2 19.8M19.8 4.2l-2.1 2.1"/><circle cx="12" cy="12" r="3"/></Icon>;
const IconBolt       = (p) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
const IconLayers     = (p) => <Icon {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></Icon>;
const IconWhatsapp   = (p) => <Icon {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></Icon>;
const IconCalendar   = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const IconMail       = (p) => <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></Icon>;
const IconPin        = (p) => <Icon {...p}><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></Icon>;
const IconInstagram  = (p) => <Icon {...p}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></Icon>;
const IconLinkedin   = (p) => <Icon {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Icon>;
const IconFacebook   = (p) => <Icon {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></Icon>;
const IconStar       = (p) => <Icon {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>;

const ICONS = {
  headphones: IconHeadphones, wallet: IconWallet, database: IconDatabase,
  shield: IconShield, users: IconUsers, server: IconServer,
  megaphone: IconMegaphone, award: IconAward,
  phone: IconPhone, target: IconTarget, trending: IconTrending,
  bank: IconBank, car: IconCar, cart: IconCart, umbrella: IconUmbrella,
  signal: IconSignal, utensils: IconUtensils, building: IconBuilding, cap: IconCap,
  arrow: IconArrow, check: IconCheck, globe: IconGlobe, menu: IconMenu, close: IconClose,
  chevron: IconChevron, sparkle: IconSparkle, bolt: IconBolt, layers: IconLayers,
  whatsapp: IconWhatsapp, calendar: IconCalendar, mail: IconMail, pin: IconPin,
  instagram: IconInstagram, linkedin: IconLinkedin, facebook: IconFacebook, star: IconStar,
};

window.ICONS = ICONS;
window.Icon = Icon;
