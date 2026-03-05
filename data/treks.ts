export interface Trek {
    id: string;
    name: string;
    tagline: string;
    price: string;
    description: string;
    folderPath: string;
    heroVideo: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    milestone1: { title: string; subtitle: string };
    milestone2: { title: string; subtitle: string };
    milestone3: { title: string; subtitle: string };
    milestone4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    experienceSection: { title: string; description: string };
    bookNowSection: {
        price: string;
        duration: string;
        includedParams: string[];
        guidePromise: string;
        cancellationPolicy: string;
    };
}

export const treks: Trek[] = [
    {
        id: "emerald-canopy",
        name: "Emerald Canopy",
        tagline: "Deep into the monsoon shadows.",
        price: "₹4,500",
        description: "Dense foliage - Flowing streams - High humidity",
        folderPath: "/images/EmeraldCanopy",
        heroVideo: "/videos/en.mp4",
        themeColor: "#1B4332",
        gradient: "linear-gradient(135deg, #081C15 0%, #1B4332 100%)",
        features: ["Expert Local Guide", "Waterproof Gear", "Hot Trail Meals"],
        stats: [
            { label: "Distance", val: "12km" },
            { label: "Elevation", val: "850m" },
            { label: "Difficulty", val: "Moderate" },
        ],
        milestone1: {
            title: "Step into the wild.",
            subtitle:
                "Leave the concrete behind. The air shifts, growing thick with the scent of wet earth and ancient bark.",
        },
        milestone2: {
            title: "Follow the water.",
            subtitle:
                "Navigate alongside pristine, winding streams fed by the relentless, beautiful monsoon.",
        },
        milestone3: {
            title: "Beneath the giants.",
            subtitle:
                "Walk under ferns and towering dipterocarps that blot out the sun, plunging the trail into a lush, moody twilight.",
        },
        milestone4: { title: "Find your silence.", subtitle: "" },
        detailsSection: {
            title: "The Kerala Rainforest Experience",
            description:
                "The Emerald Canopy trail takes you through some of the most untouched, dark, and vibrant rainforests. This isn't a simple walk; it's a sensory immersion. Expect muddy boots, constant rainfall, and a symphony of wildlife hiding just out of sight in the dense, vibrating greenery.",
            imageAlt: "Dark rainforest canopy",
        },
        experienceSection: {
            title: "Leave No Trace",
            description:
                "We are guests in this ancient ecosystem. Our expeditions strictly follow zero-impact protocols. We move in small, silent groups to ensure the wildlife remains undisturbed and the trails remain pristine for generations to come.",
        },
        bookNowSection: {
            price: "₹4,500",
            duration: "2 Days / 1 Night",
            includedParams: ["Forest Permits", "Hammock Tents", "Trail Rations"],
            guidePromise:
                "Led by indigenous trackers with generations of knowledge about the local flora and fauna.",
            cancellationPolicy:
                "Full refund up to 7 days before the trek. Weather-dependent rescheduling available.",
        },
    },
    {
        id: "mystic-pines",
        name: "Mystic Ridge",
        tagline: "Above the fog line.",
        price: "₹5,200",
        description: "High altitude - Pine forests - Rolling mist",
        folderPath: "/images/MysticRidge",
        heroVideo: "/videos/my.mp4",
        themeColor: "#2F4F4F",
        gradient: "linear-gradient(135deg, #1A2421 0%, #2F4F4F 100%)",
        features: [
            "Altitude Acclimatization",
            "Thermal Sleeping Bags",
            "Summit Photography",
        ],
        stats: [
            { label: "Distance", val: "18km" },
            { label: "Elevation", val: "2200m" },
            { label: "Difficulty", val: "Hard" },
        ],
        milestone1: {
            title: "Into the clouds.",
            subtitle:
                "The air thins and cools as you ascend into a world wrapped in perpetual, shifting mist.",
        },
        milestone2: {
            title: "Silent sentinels.",
            subtitle:
                "Navigate through ancient pine groves where the sound of your footsteps is swallowed by the thick bed of needles.",
        },
        milestone3: {
            title: "The ridge reveal.",
            subtitle:
                "Watch the fog break momentarily to reveal staggering, endless valleys below.",
        },
        milestone4: { title: "Touch the sky.", subtitle: "" },
        detailsSection: {
            title: "Conquer the Chill",
            description:
                "A demanding trek designed for those who seek the isolation of high altitudes. The environment is stark, cold, and profoundly beautiful. The mist acts as a curtain, constantly hiding and revealing the dramatic landscape of the ridge.",
            imageAlt: "Foggy pine forest trail",
        },
        experienceSection: {
            title: "Safety at Altitude",
            description:
                "Altitude sickness is real. Our guides are trained in wilderness first aid and carry oxygen on all ridge climbs. We pace the trek perfectly to ensure your body adapts to the changing atmosphere.",
        },
        bookNowSection: {
            price: "₹5,200",
            duration: "3 Days / 2 Nights",
            includedParams: ["Basecamp Setup", "Thermal Wear", "Oxygen Kits"],
            guidePromise:
                "Certified mountaineers with extensive high-altitude rescue training.",
            cancellationPolicy:
                "Strict 14-day cancellation policy due to permit restrictions.",
        },
    },
];
