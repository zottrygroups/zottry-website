export const lotteryCatalog = [
  {
    id: "z-spark",
    title: "Z-Spark",
    price: "$1",
    priceValue: 1,
    frequency: "Daily draw",
    cadence: "daily",
    prize: "$1,000",
    prizeValue: 1000,
    badge: "Daily",
    nextDraw: "Tonight · 21:30 GMT",
    description: "Lightning-fast daily draws ideal for building winning streaks.",
    tags: ["daily", "beginner", "streak"]
  },
  {
    id: "z-pulse",
    title: "Z-Pulse",
    price: "$2",
    priceValue: 2,
    frequency: "Every 48 hours",
    cadence: "alternate-days",
    prize: "$25,000",
    prizeValue: 25000,
    badge: "Fast Track",
    nextDraw: "Tomorrow · 11:00 GMT",
    description: "Shorter odds with pulse-racing draws every other day.",
    tags: ["daily", "value", "fast"]
  },
  {
    id: "z-blaze",
    title: "Z-Blaze",
    price: "$2.50",
    priceValue: 2.5,
    frequency: "Every 5 days",
    cadence: "twice-weekly",
    prize: "$100,000",
    prizeValue: 100000,
    badge: "Hot Pick",
    nextDraw: "Apr 8 · 18:00 GMT",
    description: "Our players' favourite with boosted jackpots every Friday.",
    tags: ["popular", "jackpot", "mid-tier"]
  },
  {
    id: "z-cosmo",
    title: "Z-Cosmo",
    price: "$3",
    priceValue: 3,
    frequency: "Weekly on Wednesdays",
    cadence: "weekly",
    prize: "$250,000",
    prizeValue: 250000,
    badge: "New",
    nextDraw: "Apr 9 · 19:00 GMT",
    description: "A global draw with syndicated pools and constellation bonuses.",
    tags: ["global", "syndicate", "weekly"]
  },
  {
    id: "z-legend",
    title: "Z-Legend",
    price: "$5",
    priceValue: 5,
    frequency: "Twice a month",
    cadence: "monthly",
    prize: "$600,000",
    prizeValue: 600000,
    badge: "Mega Pot",
    nextDraw: "Apr 15 · 20:00 GMT",
    description: "High-stakes legends are made here with life-changing prizes.",
    tags: ["premium", "syndicate", "jackpot"]
  }
];

export const landingBanners = [
  {
    id: "banner-spark",
    lotteryId: "z-spark",
    kicker: "Z-Spark Daily Rush",
    headline: "Ignite your streak tonight",
    description: "Lightning-fast $1 tickets with instant results delivered to your inbox every evening.",
    ctaLabel: "Play Z-Spark",
    ticketText: "$1 ticket",
    prizeText: "Top prize $1,000",
    frequencyText: "Draws nightly · 21:30 GMT",
    backgroundImage:
      "linear-gradient(120deg, rgba(239, 22, 77, 0.82), rgba(48, 79, 162, 0.85)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80')"
  },
  {
    id: "banner-pulse",
    lotteryId: "z-pulse",
    kicker: "Z-Pulse Flash Pot",
    headline: "Feel the energy every 48 hours",
    description: "Great value tickets and rapid-fire results keep the excitement pulsing all week long.",
    ctaLabel: "Play Z-Pulse",
    ticketText: "$2 ticket",
    prizeText: "Top prize $25,000",
    frequencyText: "Draws every 48 hours",
    backgroundImage:
      "linear-gradient(120deg, rgba(48, 79, 162, 0.85), rgba(15, 31, 65, 0.85)), url('https://images.unsplash.com/photo-1518544889280-38e0058f3c86?auto=format&fit=crop&w=1600&q=80')"
  },
  {
    id: "banner-blaze",
    lotteryId: "z-blaze",
    kicker: "Z-Blaze Jackpot",
    headline: "Turn up the heat for six figures",
    description: "Our fan favourite with boosted pots every Friday and blazing $100k jackpots.",
    ctaLabel: "Play Z-Blaze",
    ticketText: "$2.50 ticket",
    prizeText: "Top prize $100,000",
    frequencyText: "Draws every 5 days",
    backgroundImage:
      "linear-gradient(120deg, rgba(255, 112, 67, 0.82), rgba(199, 15, 61, 0.82)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')"
  },
  {
    id: "banner-cosmo",
    lotteryId: "z-cosmo",
    kicker: "Z-Cosmo Global Syndicate",
    headline: "Shoot for the stars mid-week",
    description: "Join players worldwide for Wednesday mega pools and constellation bonuses.",
    ctaLabel: "Play Z-Cosmo",
    ticketText: "$3 ticket",
    prizeText: "Top prize $250,000",
    frequencyText: "Weekly draw · Wednesday",
    backgroundImage:
      "linear-gradient(120deg, rgba(52, 170, 224, 0.8), rgba(48, 79, 162, 0.85)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')"
  },
  {
    id: "banner-legend",
    lotteryId: "z-legend",
    kicker: "Z-Legend Mega Series",
    headline: "Make your legendary move",
    description: "High-stakes draws twice a month with life-changing jackpots and VIP perks.",
    ctaLabel: "Play Z-Legend",
    ticketText: "$5 ticket",
    prizeText: "Top prize $600,000",
    frequencyText: "Twice monthly",
    backgroundImage:
      "linear-gradient(120deg, rgba(55, 0, 179, 0.8), rgba(15, 31, 65, 0.85)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80')"
  }
];

export const featuredDraws = lotteryCatalog.filter((lottery) =>
  ["z-spark", "z-blaze", "z-legend"].includes(lottery.id)
);

export const featuredWinners = [
  {
    name: "Maria P.",
    draw: "Z-Spark",
    amount: "$1,000",
    location: "Austin, USA",
    numbers: ["04", "12", "19", "22", "34"],
    wonAt: "2025-04-04T21:40:00Z"
  },
  {
    name: "Samuel K.",
    draw: "Z-Blaze",
    amount: "$25,000",
    location: "Toronto, CA",
    numbers: ["03", "08", "17", "25", "40", "48"],
    wonAt: "2025-04-02T18:15:00Z"
  },
  {
    name: "Amina R.",
    draw: "Z-Legend",
    amount: "$250,000",
    location: "Dubai, UAE",
    numbers: ["07", "15", "21", "32", "38", "42", "49"],
    wonAt: "2025-03-16T20:05:00Z"
  },
  {
    name: "Jonas W.",
    draw: "Z-Cosmo",
    amount: "$75,000",
    location: "Berlin, DE",
    numbers: ["05", "11", "18", "23", "31", "44"],
    wonAt: "2025-03-12T19:25:00Z"
  }
];

export const latestResults = [
  {
    id: "spark-0404",
    title: "Z-Spark",
    drawDate: "Apr 4, 2025",
    drawDateISO: "2025-04-04",
    winningNumbers: ["04", "12", "19", "22", "34"],
    jackpot: "$1,000",
    jackpotValue: 1000,
    winners: "322 winners"
  },
  {
    id: "blaze-0402",
    title: "Z-Blaze",
    drawDate: "Apr 2, 2025",
    drawDateISO: "2025-04-02",
    winningNumbers: ["03", "08", "17", "25", "40", "48"],
    jackpot: "$100,000",
    jackpotValue: 100000,
    winners: "4 jackpot shares"
  },
  {
    id: "legend-0316",
    title: "Z-Legend",
    drawDate: "Mar 16, 2025",
    drawDateISO: "2025-03-16",
    winningNumbers: ["07", "15", "21", "32", "38", "42", "49"],
    jackpot: "$600,000",
    jackpotValue: 600000,
    winners: "1 grand winner"
  },
  {
    id: "cosmo-0312",
    title: "Z-Cosmo",
    drawDate: "Mar 12, 2025",
    drawDateISO: "2025-03-12",
    winningNumbers: ["05", "11", "18", "23", "31", "44"],
    jackpot: "$250,000",
    jackpotValue: 250000,
    winners: "2 jackpot shares"
  }
];

export const archivedResults = [
  {
    id: "spark-0224",
    title: "Z-Spark",
    drawDate: "Feb 24, 2025",
    drawDateISO: "2025-02-24",
    winningNumbers: ["01", "14", "21", "33", "35"],
    jackpot: "$1,000",
    jackpotValue: 1000,
    winners: "297 winners"
  },
  {
    id: "legend-0210",
    title: "Z-Legend",
    drawDate: "Feb 10, 2025",
    drawDateISO: "2025-02-10",
    winningNumbers: ["09", "12", "18", "29", "37", "41", "46"],
    jackpot: "$550,000",
    jackpotValue: 550000,
    winners: "No jackpot winner"
  },
  {
    id: "blaze-0218",
    title: "Z-Blaze",
    drawDate: "Feb 18, 2025",
    drawDateISO: "2025-02-18",
    winningNumbers: ["02", "07", "26", "34", "39", "45"],
    jackpot: "$90,000",
    jackpotValue: 90000,
    winners: "6 jackpot shares"
  }
];

export const accountOffers = [
  {
    id: "welcome-pack",
    title: "Welcome bundle: 3 draws for the price of 2",
    description: "Grab an instant bonus when you play Spark, Blaze, and Legend in the same week.",
    expires: "Apr 12 2025",
    status: "Active",
    tag: "Starter",
    ctaLabel: "Activate bundle",
    ctaVariant: "primary"
  },
  {
    id: "legend-upgrade",
    title: "Legend upgrade",
    description: "Unlock a complimentary Legend ticket when you spend $25 on Blaze bundles.",
    expires: "Apr 18 2025",
    status: "Expiring soon",
    tag: "VIP",
    ctaLabel: "View details"
  },
  {
    id: "cashback",
    title: "Weekly cashback",
    description: "Get 10% cashback on all tickets if none of your numbers hit this week.",
    expires: "Apr 28 2025",
    status: "Used",
    tag: "Reward",
    ctaLabel: "Track cashback"
  },
  {
    id: "friends-bonus",
    title: "Friends bonus",
    description: "Earn $5 credit for every friend that buys their first Spark ticket.",
    expires: "May 02 2025",
    status: "New",
    tag: "Referral",
    ctaLabel: "Invite now"
  }
];

export const seasonalPromotions = [
  {
    id: "spring-superdraw",
    title: "Spring Superdraw",
    description: "Every Sunday in April we add $50,000 to the Blaze jackpot pot.",
    expires: "Apr 28 2025",
    status: "Live",
    tag: "Jackpot boost",
    ctaLabel: "Read details",
    category: "jackpot"
  },
  {
    id: "refer-friends",
    title: "Refer & win",
    description: "Invite friends to Zottry and both of you receive a $5 play credit when they buy a ticket.",
    expires: "Apr 30 2025",
    status: "Live",
    tag: "Community",
    ctaLabel: "Share invite",
    ctaVariant: "primary",
    category: "referral"
  },
  {
    id: "mobile-app",
    title: "Play on the go",
    description: "Download the Zottry app and enable push alerts for exclusive mobile-only flash draws.",
    expires: "Ongoing",
    status: "Upcoming",
    tag: "Mobile",
    ctaLabel: "Get the app",
    category: "mobile"
  },
  {
    id: "vip-weekend",
    title: "VIP Weekend streak",
    description: "Get a 2x multiplier on loyalty points when you play Z-Legend Friday to Sunday.",
    expires: "May 05 2025",
    status: "Upcoming",
    tag: "VIP",
    ctaLabel: "Preview offer",
    category: "loyalty"
  }
];
