import { useGeneralSettings, usePageSettings } from "../hooks/useSettings";

export default function FooterPromotionsBanner() {
  const { settings: pageSettings } = usePageSettings();
  return (
    <div className="bg-primary/90 backdrop-blur-sm py-4 border-b border-white/20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/90 text-sm">
              {pageSettings?.footer?.social?.joinMessage || "Присоединяйтесь к нашему сообществу"}
            </span>
            <span className="text-secondary text-lg">☕</span>
          </div>
          
          <a 
            href={pageSettings?.footer?.social?.telegramUrl || "https://t.me/+o6dcETGoWoVjYWZi"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-white/20 hover:border-white/40"
          >
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="font-semibold">{pageSettings?.footer?.social?.telegramLabel || "Telegram"}</span>
          </a>
        </div>
        
        <p className="text-white/70 text-xs mt-2">
          {pageSettings?.footer?.social?.description || "Новости, акции и общение с кофеманами"}
        </p>
      </div>
    </div>
  )
}