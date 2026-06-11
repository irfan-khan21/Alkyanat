export interface NavLink {
  label: string;
  href: string;
}

export interface HeroSection {
  title: string;
  highlight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface Entity {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export interface GroupStat {
  value: string;
  label: string;
  description: string;
}

export interface CoreValue {
  title: string;
  description: string;
  iconName: string;
}

export interface HomeData {
  navLinks: NavLink[];
  hero: HeroSection;
  entities: Entity[];
  stats: GroupStat[];
  values: CoreValue[];
  footer: {
    aboutText: string;
    contactInfo: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
    socials: { platform: string; url: string; icon: string }[];
  };
}

export const homeData: HomeData = {
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Our Entities", href: "#entities" },
    { label: "Group Performance", href: "#stats" },
    { label: "Our Pillars", href: "#pillars" },
    { label: "Contact Us", href: "#contact" }
  ],
  hero: {
    title: "Building the Future of Industries Across",
    highlight: "The Kingdom & Beyond",
    subtitle: "Al Kayanat Group coordinates and supports a diverse ecosystem of industry-leading entities specializing in heavy machinery, smart logistics, premium real estate development, and breakthrough technology ventures.",
    primaryCta: "Explore Our Entities",
    secondaryCta: "Get in Touch"
  },
  entities: [
    {
      id: "machinery",
      name: "Al Kayanat Heavy Equipment",
      category: "Industrial & Infrastructure Support",
      description: "A premier fleet of well-maintained excavators, mobile cranes, loaders, and compactors, powering Saudi Arabia's major infrastructure, municipal, and commercial developments.",
      iconName: "Truck",
      metrics: [
        { label: "Fleet size", value: "450+ Units" },
        { label: "Support coverage", value: "24/7 KSA Wide" }
      ],
      accentColor: "from-amber-500 to-yellow-600"
    },
    {
      id: "logistics",
      name: "Al Kayanat Logistics & Supply",
      category: "Smart Freight & Transportation",
      description: "End-to-end heavy haulage, specialized cargo distribution, and site set-up logistics, connecting major industrial cities with remote project sites seamlessly.",
      iconName: "TrendingUp",
      metrics: [
        { label: "Cargo delivered", value: "2.5M+ Tons" },
        { label: "On-time rate", value: "99.4%" }
      ],
      accentColor: "from-blue-500 to-indigo-600"
    },
    {
      id: "development",
      name: "Al Kayanat Real Estate & Dev",
      category: "Premium Commercial & Residential",
      description: "Crafting architectural landmarks and master-planned commercial zones that combine futuristic sustainability with luxury aesthetics and commercial utility.",
      iconName: "Home",
      metrics: [
        { label: "Developed Area", value: "12M+ sq. ft." },
        { label: "Project Value", value: "SAR 1.8B+" }
      ],
      accentColor: "from-emerald-500 to-teal-600"
    },
    {
      id: "ventures",
      name: "Al Kayanat Tech Ventures",
      category: "Digital Transformation & Investments",
      description: "Investing in and incubating AI-driven prop-tech, supply-chain automation, and smart logistics platforms to future-proof our core operational entities.",
      iconName: "Cpu",
      metrics: [
        { label: "Incubated Startups", value: "8 Companies" },
        { label: "Active Patents", value: "14 Registered" }
      ],
      accentColor: "from-purple-500 to-violet-600"
    }
  ],
  stats: [
    {
      value: "15+",
      label: "Years of Excellence",
      description: "A solid track record of powering municipal infrastructure and commercial projects."
    },
    {
      value: "600+",
      label: "Active Projects",
      description: "Equipping construction, distribution, and infrastructure tasks daily."
    },
    {
      value: "1.2K+",
      label: "Dedicated Professionals",
      description: "Certified operators, engineers, logisticians, and support staff."
    },
    {
      value: "100%",
      label: "KSA Coverage",
      description: "Strategic operating bases in Riyadh, Jeddah, Dammam, and NEOM."
    }
  ],
  values: [
    {
      title: "Uncompromising Safety",
      description: "Rigorous maintenance schedules, strict safety policies, and continuous training programs to ensure zero-harm work environments.",
      iconName: "Shield"
    },
    {
      title: "Operational Precision",
      description: "Applying data-driven route optimization, real-time fleet telematics, and agile project management to guarantee on-time execution.",
      iconName: "Activity"
    },
    {
      title: "Sustainable Innovation",
      description: "Introducing eco-efficient machinery, reducing fuel footprints through smart routing, and prioritizing green building materials.",
      iconName: "Leaf"
    }
  ],
  footer: {
    aboutText: "Al Kayanat is a forward-looking Saudi conglomerate, unified in driving industrial modernization, operational efficiency, and sustainable progress in line with Vision 2030.",
    contactInfo: {
      address: "King Fahd Rd, Al Rahmaniyah, Riyadh 12341, Kingdom of Saudi Arabia",
      phone: "+966 11 456 7890",
      email: "info@alkyanat.com",
      hours: "Sunday - Thursday: 8:00 AM - 5:00 PM"
    },
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
      { platform: "Twitter / X", url: "https://x.com", icon: "Twitter" },
      { platform: "Instagram", url: "https://instagram.com", icon: "Instagram" }
    ]
  }
};
