import './globals.css';

export const metadata = {
  title: 'OpenAble',
  description: "Check a food package's opening against easy-open guidelines and get three ways to fix it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <svg width="0" height="0" style={{position:'absolute'}} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="lg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#1F5BFF"/><stop offset="1" stopColor="#22E4FF"/></linearGradient>
            <symbol id="mark" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="6" fill="url(#lg)"/>
              <g transform="translate(1.5 0)" fill="#F4F7FB" stroke="#F4F7FB" strokeLinecap="round">
                <rect x="7.5" y="11" width="9.5" height="8.5" rx="3.5" stroke="none"/>
                <path fill="none" strokeWidth="1.9" d="M8.5 13V7.5M11 13V5.5M13.5 13V6M16 13V8"/>
                <path fill="none" strokeWidth="2.2" d="M8.6 16.2L5.3 12.8"/>
              </g>
            </symbol>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
