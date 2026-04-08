const fs = require('fs');
const path = 'C:/Users/jurij/.claude/ridedirect.eu/src/components/layout/header.tsx';
let c = fs.readFileSync(path, 'utf8');

// Use regex to handle both LF and CRLF
c = c.replace(
  /<Link\s+href="\/dashboard"\s+className="text-sm text-gray-500 hover:text-gray-800 transition-colors"\s*>\s*My Listings\s*<\/Link>/,
  `<Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-[#1B4FD8] text-white text-xs font-bold flex items-center justify-center hover:bg-[#1a45c0] transition-colors"
                title="My Dashboard"
              >
                {user.email?.slice(0, 2).toUpperCase()}
              </Link>`
);

fs.writeFileSync(path, c);
const changed = !c.includes('My Listings');
console.log(changed ? 'patched OK' : 'NOT patched');
