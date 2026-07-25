// Simple filled glyphs for the 10 product categories, used in the navbar mega-menu
// and category selectors. "#F8FAFC" (slate-50) cutout details match the icon tile
// background so they read as punched-out highlights regardless of the fill color.
export function CategoryIcon({ id, className }: { id: string; className?: string }) {
  const props = { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": true };

  switch (id) {
    case "ai-dashcam":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden={true}>
          <rect x="3" y="8" width="18" height="11" rx="2" />
          <circle cx="12" cy="13.5" r="3.5" />
          <circle cx="12" cy="13.5" r="1.2" fill="currentColor" />
          <path d="M12 8V4m-4 0h8" />
          <rect x="5" y="10" width="2.5" height="2.5" rx="0.5" />
        </svg>
      );
    case "ai-mdvr":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden={true}>
          <rect x="3" y="6" width="18" height="12" rx="2.5" />
          <line x1="7" y1="10" x2="17" y2="10" />
          <line x1="7" y1="14" x2="13" y2="14" />
          <circle cx="16.5" cy="14" r="1" fill="currentColor" />
          <rect x="3" y="6" width="18" height="3" fill="currentColor" opacity="0.1" />
        </svg>
      );
    case "gps-tracker":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden={true}>
          <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7z" />
          <circle cx="12" cy="9" r="2.5" fill="currentColor" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden={true}>
          <circle cx="12" cy="11" r="7" />
          <circle cx="12" cy="11" r="3" />
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <path d="M12 18v3m-4 0h8" />
        </svg>
      );
    case "accessories":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden={true}>
          <path d="M12 3v12m0-12L9 8m3-5l3 5" />
          <path d="M8 15h8l-4 6-4-6z" />
          <path d="M6 10a8.5 8.5 0 0 1 12 0" />
          <path d="M4 7a13.5 13.5 0 0 1 16 0" />
        </svg>
      );
    case "pet-tracker":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden={true}>
          <path d="M12 18c2.5 0 4-1.5 4-4.5s-1-4.5-4-4.5-4 1.5-4 4.5 1.5 4.5 4 4.5z" />
          <path d="M6.5 9C5 9 4.5 7 5.5 5.5s3 .5 3.5 1.5L8 9" />
          <path d="M17.5 9c1.5 0 2-2 1-3.5s-3 .5-3.5 1.5l1 2" />
          <circle cx="10" cy="13" r="0.8" fill="currentColor" />
          <circle cx="14" cy="13" r="0.8" fill="currentColor" />
          <path d="M11.5 15h1l-.5.7-.5-.7z" fill="currentColor" />
          <path d="M9 19h6a1 1 0 0 1 1 1v1H8v-1a1 1 0 0 1 1-1z" fill="currentColor" opacity="0.2" />
        </svg>
      );
    case "smart-watch":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden={true}>
          <rect x="9" y="2" width="6" height="20" rx="1.5" />
          <rect x="6" y="7" width="12" height="10" rx="3" fill="#ffffff" />
          <rect x="6" y="7" width="12" height="10" rx="3" />
          <rect x="8" y="9" width="8" height="6" rx="1" />
          <circle cx="17.5" cy="12" r="0.8" fill="currentColor" />
        </svg>
      );
    case "certificate-generic":
      return (
        <svg {...props}>
          <circle cx="12" cy="9" r="6" />
          <path d="M9 14.5L7 21l5-3 5 3-2-6.5" />
          <path
            d="M9.3 9l1.8 1.8L15 7"
            stroke="#F8FAFC"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "connected-mobility":
      return (
        <svg {...props}>
          <rect x="3" y="15" width="3" height="6" rx="1" />
          <rect x="10.5" y="10" width="3" height="11" rx="1" />
          <rect x="18" y="4" width="3" height="17" rx="1" />
        </svg>
      );
    case "ai-vision-systems":
      return (
        <svg {...props}>
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          <circle cx="12" cy="12" r="2.2" fill="#F8FAFC" />
        </svg>
      );
    case "video-surveillance":
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="12" rx="2.5" />
          <rect x="8" y="4" width="8" height="3.5" rx="1" />
          <circle cx="12" cy="13" r="3.5" fill="#F8FAFC" />
        </svg>
      );
    case "fleet-intelligence":
      return (
        <svg {...props}>
          <rect x="3" y="13" width="4" height="8" rx="1" />
          <rect x="10" y="8" width="4" height="13" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      );
    case "fleet-management":
    case "vehicle-solutions":
      return (
        <svg {...props}>
          <rect x="2" y="9" width="11" height="8" rx="1.5" />
          <path d="M13 12h4.5l3 3.5V17H13z" />
          <circle cx="6.5" cy="19" r="2" />
          <circle cx="16.5" cy="19" r="2" />
        </svg>
      );
    case "vehicle-safety":
      return (
        <svg {...props}>
          <path d="M12 2l8 3v6c0 6-3.5 9.5-8 11-4.5-1.5-8-5-8-11V5l8-3z" />
          <path
            d="M8.5 12l2.5 2.5L16 9"
            stroke="#F8FAFC"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ev-power-electronics":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="15" height="12" rx="2" />
          <rect x="19" y="10" width="2" height="4" rx="0.5" />
          <path d="M11 9l-3 3h3l-1 3 3-3h-3l1-3z" fill="#F8FAFC" />
        </svg>
      );
    case "electric-mobility":
      return (
        <svg {...props}>
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
      );
    case "software-platforms":
      return (
        <svg {...props}>
          <rect x="2.5" y="4" width="19" height="13" rx="2" />
          <rect x="10.5" y="17" width="3" height="2.5" />
          <rect x="8" y="19" width="8" height="2" rx="1" />
        </svg>
      );
    case "compliance-solutions":
      return (
        <svg {...props}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 9h6M9 13h6" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.5" fill="#F8FAFC" />
        </svg>
      );
    case "vehicle-compliance":
      return (
        <svg {...props}>
          <path d="M6 3h8l4 4v14H6z" />
          <path
            d="M8.5 13l2.3 2.3L15.5 10.5"
            stroke="#F8FAFC"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "fleet-tracking":
    case "asset-tracking":
      return (
        <svg {...props}>
          <path d="M12 2a6.5 6.5 0 00-6.5 6.5c0 5 6.5 13.5 6.5 13.5s6.5-8.5 6.5-13.5A6.5 6.5 0 0012 2z" />
          <circle cx="12" cy="8.5" r="2.5" fill="#F8FAFC" />
        </svg>
      );
    case "smart-logistics":
      return (
        <svg {...props}>
          <path d="M12 2.5l8.5 4.5v10L12 21.5 3.5 17V7l8.5-4.5z" />
          <path
            d="M3.8 7.2L12 11.5l8.2-4.3M12 11.5V21.3"
            stroke="#F8FAFC"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "smart-analytics":
      return (
        <svg {...props}>
          <path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7z" />
          <circle cx="12" cy="12" r="3" fill="#F8FAFC" />
        </svg>
      );
    case "road-safety-products":
      return (
        <svg {...props}>
          <path d="M12 2L4 20h16L12 2z" />
          <rect x="3" y="20" width="18" height="2.5" rx="0.5" />
          <path d="M8.5 14h7l-1.5-3h-4z" fill="#F8FAFC" />
        </svg>
      );
    case "road-safety-solutions":
      return (
        <svg {...props}>
          <path d="M12 2.5l9.5 18.5h-19z" />
          <rect x="11" y="10" width="2" height="6" rx="1" fill="#F8FAFC" />
          <circle cx="12" cy="18" r="1.1" fill="#F8FAFC" />
        </svg>
      );
    case "manufacturing-solutions":
      return (
        <svg {...props}>
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
          <circle cx="12" cy="12" r="3" fill="#F8FAFC" />
        </svg>
      );
    case "intelligent-testing-systems":
      return (
        <svg {...props}>
          <path d="M12 3a9 9 0 00-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 00-9-9zm0 15a6 6 0 110-12 6 6 0 010 12z" />
          <path d="M12 8v4l3 2" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "automated-testing-solutions":
    case "automated-testing-lane":
    case "automated-driving-test-track":
      return (
        <svg {...props}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <rect x="9" y="2.3" width="6" height="3.4" rx="1" />
          <path
            d="M8.5 13l2.3 2.3L16 10"
            stroke="#F8FAFC"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "public-transport-solutions":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="12" rx="3" />
          <rect x="6" y="8" width="4" height="4" rx="0.5" fill="#F8FAFC" />
          <rect x="14" y="8" width="4" height="4" rx="0.5" fill="#F8FAFC" />
          <circle cx="7" cy="19" r="1.6" />
          <circle cx="17" cy="19" r="1.6" />
        </svg>
      );
    case "workplace-safety":
      return (
        <svg {...props}>
          <path d="M8 3h3l1 2 1-2h3l2 3v14a1 1 0 01-1 1h-3v-6h-4v6H7a1 1 0 01-1-1V6l2-3z" />
          <rect x="3.5" y="10" width="17" height="2" fill="#F8FAFC" />
        </svg>
      );
    case "printing-identification":
    case "printing-identification-solutions":
    case "high-security-registration-plate":
    case "industrial-label-printing":
    case "asset-identification":
    case "government-identification":
      return (
        <svg {...props}>
          <rect x="4" y="8" width="16" height="8" rx="1.5" />
          <rect x="7" y="3" width="10" height="6" rx="1" />
          <rect x="7" y="15" width="10" height="6" rx="1" fill="#F8FAFC" />
        </svg>
      );
    case "industrial-iot":
      return (
        <svg {...props}>
          <rect x="7" y="7" width="10" height="10" rx="1" />
          <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" fill="#F8FAFC" />
        </svg>
      );
    case "software-solutions":
      return (
        <svg {...props}>
          <rect x="2.5" y="4" width="19" height="13" rx="2" />
          <rect x="10.5" y="17" width="3" height="2.5" />
          <rect x="8" y="19" width="8" height="2" rx="1" />
          <path d="M7 8l-3 3 3 3M17 8l3 3-3 3M13 7l-2 8" stroke="#F8FAFC" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2.5" />
        </svg>
      );
  }
}
