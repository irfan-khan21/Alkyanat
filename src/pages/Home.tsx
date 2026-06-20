import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  ArrowRight,
  Shield, 
  Settings, 
  Wrench, 
  Truck, 
  CheckCircle2, 
  Play, 
  Star,
  Calendar,
  User,
  ArrowUpRight
} from 'lucide-react';
import homeData from '../data/homeData.json';
import blogData from '../data/blogData.json';

interface HomeProps {
  currentLang: 'EN' | 'AR';
  onLangChange: (lang: 'EN' | 'AR') => void;
  onPageChange?: (page: 'home' | 'about' | 'services' | 'blog' | 'contact') => void;
}

export const Home: React.FC<HomeProps> = ({ currentLang, onLangChange, onPageChange }) => {
  const langKey = currentLang.toLowerCase() as 'en' | 'ar';
  const data = homeData[langKey];
  const isRtl = currentLang === 'AR';

  // Hero Image Slider State
  const heroImages = [
    '/images/road_sweeper_riyadh.png',
    '/images/boom_truck_crane.png',
    '/images/heavy_forklift_ksa.png'
  ];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    const pageName = href.replace('#/', '') as 'home' | 'about' | 'services' | 'blog' | 'contact';
    if (onPageChange && ['home', 'about', 'services', 'blog', 'contact'].includes(pageName)) {
      e.preventDefault();
      onPageChange(pageName);
    }
  };

  // Local translations to match HADI's exact UI design copy while preserving site context
  const copy = {
    en: {
      heroTag: "Your Building, Our Care",
      heroTitlePart1: "Heavy Duty",
      heroTitlePart2: "Industrial",
      heroTitlePart3: "Sweeper",
      heroDesc: "High performance road sweeping and logistics fleet supporting municipal roads, factories, and construction compounds across Saudi Arabia.",
      heroBtn1: "Discover More",
      heroBtn2: "Our Services",
      
      card1Title: "Sales & Rental",
      card1Desc: "Various Brands, Models and Types availability.",
      card2Title: "SLA Contracts",
      card2Desc: "Annual maintenance contracts to keep your machinery running.",
      card3Title: "Maintenance",
      card3Desc: "Expert technical services for optimal fleet performance.",
      card4Title: "Spare Parts",
      card4Desc: "Genuine spare parts for all sweepers and lift vehicles.",

      aboutTag: "ABOUT US",
      aboutTitle: "Electric Cleaning Solutions",
      aboutDesc: "Al Kayanat KSA supports industrial, municipal, and commercial clients by providing reliable, safe, and cost-efficient vehicle and machinery rental. We maintain public roads and gardens with exceptional precision.",
      
      servicesTag: "OUR SERVICES",
      servicesTitle: "The Application We Provide For Our Customer",
      service1Badge: "Corporation and Factories",
      service1Desc: "Businesses and factories often have large factory, workshop and storage areas.",
      service2Badge: "School and Hospital",
      service2Desc: "Fine cleaning: schools and hospitals require a high standard of hygiene.",
      service3Badge: "Municipal Sanitation",
      service3Desc: "Large-scale operation: sanitation work involves a wide range of municipal roads.",

      whyTag: "WHY CHOOSE US",
      whyTitle: "Choose Excellence, Choose Al Kayanat",
      whyDesc: "We provide innovative and sustainable cleaning and lifting solutions that meet the highest standards. Our focus is on safety, performance, and efficiency.",
      whyBullet1: "Seamless Logistics",
      whyBullet1Desc: "Tailored operations based on specific project needs.",
      whyBullet2: "Efficient Execution",
      whyBullet2Desc: "100x improvement in facility operational workflow.",
      whyBullet3: "Flexible Packages",
      whyBullet3Desc: "Achieving cost efficiency compared to traditional services.",
      whyBullet4: "Reliable & Safe Fleet",
      whyBullet4Desc: "Transparent compliance ensuring you get exactly what you need.",
      whyStats: "100K+",
      whyStatsLabel: "Project Finished",

      brandHeading: "Trusted by over 90k+ companies worldwide",
      
      testTag: "TESTIMONIALS",
      testTitle: "Feedback About Their Experience With Us",
      
      blogTag: "BLOG & NEWS",
      blogTitle: "Company News",
      readMore: "Read More"
    },
    ar: {
      heroTag: "رعايتنا لمبانيكم، هي مهمتنا",
      heroTitlePart1: "كناسات شوارع",
      heroTitlePart2: "صناعية",
      heroTitlePart3: "ثقيلة",
      heroDesc: "أسطول كنس طرق وخدمات لوجستية ذو أداء عالٍ لدعم الشوارع البلدية، والمصانع، والمجمعات الإنشائية بالمملكة.",
      heroBtn1: "اكتشف المزيد",
      heroBtn2: "خدماتنا",

      card1Title: "البيع والتأجير",
      card1Desc: "توفر مختلف العلامات التجارية والموديلات والأنواع.",
      card2Title: "عقود الصيانة",
      card2Desc: "عقود صيانة سنوية للحفاظ على كفاءة آلياتكم باستمرار.",
      card3Title: "الصيانة الفنية",
      card3Desc: "خدمات صيانة متخصصة للأداء اللوجستي الأمثل للأسطول.",
      card4Title: "قطع الغيار",
      card4Desc: "قطع غيار أصلية لكافة شاحنات الكنس ومعدات الرفع.",

      aboutTag: "من نحن",
      aboutTitle: "حلول التنظيف الكهربائية والبلدية",
      aboutDesc: "تدعم مجموعة الكيانات عملاءها في القطاعات الصناعية والبلدية والتجارية عبر توفير حلول تأجير معدات آمنة وموفرة للتكلفة. نقوم بتنظيف الطرق والحدائق بدقة متناهية.",
      
      servicesTag: "خدماتنا",
      servicesTitle: "التطبيقات والحلول التي نوفرها لعملائنا",
      service1Badge: "الشركات والمصانع",
      service1Desc: "تحتوي المصانع والشركات غالبًا على ورش عمل ومساحات تخزين كبيرة تتطلب تنظيفًا دوريًا.",
      service2Badge: "المدارس والمستشفيات",
      service2Desc: "تنظيف دقيق ومستويات تعقيم عالية تناسب المنشآت الطبية والتعليمية.",
      service3Badge: "النظافة البلدية",
      service3Desc: "عمليات واسعة النطاق تشمل نظافة وتطهير الطرق والشوارع الرئيسية.",

      whyTag: "لماذا تختارنا",
      whyTitle: "اختر التميز والريادة، اختر الكيانات",
      whyDesc: "نحن نقدم حلول تنظيف ورفع مبتكرة ومستدامة تلبي أعلى المعايير التشغيلية والبيئية مع التركيز على الأمان والكفاءة.",
      whyBullet1: "عمليات سلسة",
      whyBullet1Desc: "تنفيذ مخصص بناءً على متطلبات وجداول مشاريعكم الخاصة.",
      whyBullet2: "كفاءة تشغيلية",
      whyBullet2Desc: "تحسينات ضخمة لتدفق العمليات اللوجستية والبلدية.",
      whyBullet3: "باقات مرنة",
      whyBullet3Desc: "توفير ملموس في التكلفة مقارنة بالحلول التقليدية الأخرى.",
      whyBullet4: "أسطول آمن وموثوق",
      whyBullet4Desc: "التزام كامل بمعايير السلامة لضمان تنفيذ آمن وخالٍ من الحوادث.",
      whyStats: "+١٠٠ ألف",
      whyStatsLabel: "مشروع مكتمل",

      brandHeading: "موضع ثقة أكثر من ٩٠ ألف شركة حول العالم",

      testTag: "آراء العملاء",
      testTitle: "التقييمات والآراء حول تجربتهم الفنية معنا",

      blogTag: "المدونة والأخبار",
      blogTitle: "أخبار وتحديثات الشركة",
      readMore: "اقرأ المزيد"
    }
  }[langKey];

  return (
    <div className={`min-h-screen bg-white text-slate-700 flex flex-col justify-between font-sans overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <Header currentLang={currentLang} onLangChange={onLangChange} activePage="home" onPageChange={onPageChange} />

      {/* Main Content */}
      <main className="flex-grow pt-[88px] lg:pt-[112px] relative">
        
        {/* Section 1: Hero Banner (Full width background image with visual blue overlay) */}
        <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden py-20">
          {/* Backdrop Images Slider */}
          <div className="absolute inset-0 z-0">
            {heroImages.map((img, idx) => (
              <img 
                key={img}
                src={img} 
                alt="Al Kayanat Heavy Fleet" 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
                  idx === activeImage 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              />
            ))}
            {/* Blueish-Navy tint overlay */}
            <div className="absolute inset-0 bg-[#0F172A]/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A13]/90 via-[#0F172A]/50 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Left side */}
              <div className="lg:col-span-8 flex flex-col space-y-6">
                <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="h-0.5 w-10 bg-brand-yellow" />
                  <span className="text-xs font-black uppercase tracking-widest text-brand-yellow">
                    {copy.heroTag}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7.5xl font-black text-white leading-tight font-display tracking-tight uppercase">
                  {copy.heroTitlePart1} <br />
                  {copy.heroTitlePart2} <br />
                  <span className="relative inline-block text-white">
                    {copy.heroTitlePart3}
                    {/* Golden oval sketch border around Sweeper text */}
                    <svg className="absolute -bottom-2.5 left-0 w-full h-4 text-brand-yellow overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,9 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>

                <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-xl font-medium">
                  {copy.heroDesc}
                </p>

                {/* Double rounded buttons */}
                <div className={`flex flex-wrap items-center gap-4 pt-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={(e) => handleLinkClick(e, '#/contact')}
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full text-slate-900 bg-brand-yellow hover:bg-brand-yellow-hover shadow-lg shadow-brand-yellow/15 transition-all cursor-pointer font-display"
                  >
                    <span>{copy.heroBtn1}</span>
                  </button>

                  <button
                    onClick={(e) => handleLinkClick(e, '#/services')}
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest rounded-full text-slate-900 bg-brand-yellow hover:bg-brand-yellow-hover shadow-lg shadow-brand-yellow/15 transition-all cursor-pointer font-display"
                  >
                    <span>{copy.heroBtn2}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Four Feature Cards (Overlapping hero visually) */}
        <section className="relative z-25 -mt-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Sales */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-full text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 mb-5">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">01</span>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-display">
                {copy.card1Title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-3.5 leading-relaxed">
                {copy.card1Desc}
              </p>
            </div>

            {/* Card 2: SLA */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-full text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 mb-5">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">02</span>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-display">
                {copy.card2Title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-3.5 leading-relaxed">
                {copy.card2Desc}
              </p>
            </div>

            {/* Card 3: Maintenance */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-full text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 mb-5">
                <Wrench className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">03</span>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-display">
                {copy.card3Title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-3.5 leading-relaxed">
                {copy.card3Desc}
              </p>
            </div>

            {/* Card 4: Spare Parts */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-full text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 mb-5">
                <Settings className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">04</span>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-display">
                {copy.card4Title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-3.5 leading-relaxed">
                {copy.card4Desc}
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: About Holding Section (Split grid) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Left Column Collage */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="grid grid-cols-12 gap-4 w-full max-w-[480px]">
                  {/* Top Left Main Image */}
                  <div className="col-span-8 rounded-3xl overflow-hidden shadow-md aspect-[4/3] border border-slate-100">
                    <img src="/images/road_sweeper_riyadh.png" alt="Sweeper operations" className="w-full h-full object-cover" />
                  </div>
                  {/* Floating Play Video style box */}
                  <div className="col-span-4 self-end relative rounded-2xl overflow-hidden aspect-square border border-slate-100 bg-[#0F172A] flex items-center justify-center group cursor-pointer shadow-lg">
                    <img src="/images/boom_truck_crane.png" alt="Play media" className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-all duration-350" />
                    <div className="relative z-10 w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-slate-900 shadow-md">
                      <Play className="h-4.5 w-4.5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {/* Bottom Right Secondary Image */}
                  <div className="col-span-8 col-start-3 rounded-3xl overflow-hidden shadow-md aspect-[4/3] border border-slate-100 relative">
                    <img src="/images/realestate_banner.png" alt="Holding works" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Red "15 Years Of" Badge overlay */}
                <div className={`absolute -bottom-6 ${isRtl ? 'left-6' : 'right-6'} bg-[#A31D1D] rounded-3xl p-5 shadow-2xl flex items-center gap-3 select-none text-white border border-[#b92c2c]`}>
                  <span className="text-5xl font-black font-display leading-none">15</span>
                  <div className="flex flex-col text-[10px] font-black uppercase tracking-wider leading-none">
                    <span className="text-brand-yellow">Years</span>
                    <span className="mt-1">Of</span>
                    <span className="mt-1">Excellence</span>
                  </div>
                </div>
              </div>

              {/* Right Column Text */}
              <div className="lg:col-span-6 space-y-6">
                <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="h-0.5 w-8 bg-brand-red" />
                  <span className="text-xs font-black uppercase tracking-widest text-brand-red font-display">
                    {copy.aboutTag}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight leading-tight font-display">
                  {copy.aboutTitle}
                </h2>

                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                  {copy.aboutDesc}
                </p>

                <button
                  onClick={(e) => handleLinkClick(e, '#/about')}
                  className="inline-flex items-center justify-center px-7 py-4 text-xs font-black uppercase tracking-widest rounded-full text-slate-900 bg-brand-yellow hover:bg-brand-yellow-hover shadow-lg transition-all cursor-pointer font-display"
                >
                  <span>{isRtl ? 'اكتشف المزيد' : 'Discover More'}</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Our Services (Centered display) */}
        <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="h-0.5 w-6 bg-brand-red" />
                <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                  {copy.servicesTag}
                </span>
                <span className="h-0.5 w-6 bg-brand-red" />
              </div>
              <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight font-display">
                {copy.servicesTitle}
              </h2>
            </div>

            {/* 3 cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                <div className="relative">
                  {/* Top Badge */}
                  <div className={`absolute top-4 left-4 right-4 flex items-center justify-between z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 bg-brand-yellow px-3.5 py-1.5 rounded-full shadow">
                      {isRtl ? 'الشركات والمصانع' : 'Corporation and Factories'}
                    </span>
                    <button 
                      onClick={(e) => handleLinkClick(e, '#/services')}
                      className="h-8 w-8 rounded-full bg-brand-red text-white hover:bg-brand-red-dark flex items-center justify-center shadow-md transition-colors cursor-pointer"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Card Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src="/images/road_sweeper_riyadh.png" alt="Corporation" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  </div>
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 font-display">
                    {isRtl ? 'شاحنات كنس للشركات والمصانع' : 'Corporation and Factories Sweepers'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {copy.service1Desc}
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                <div className="relative">
                  {/* Top Badge */}
                  <div className={`absolute top-4 left-4 right-4 flex items-center justify-between z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 bg-brand-yellow px-3.5 py-1.5 rounded-full shadow">
                      {isRtl ? 'المدارس والمستشفيات' : 'School and Hospital'}
                    </span>
                    <button 
                      onClick={(e) => handleLinkClick(e, '#/services')}
                      className="h-8 w-8 rounded-full bg-brand-red text-white hover:bg-brand-red-dark flex items-center justify-center shadow-md transition-colors cursor-pointer"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Card Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src="/images/boom_truck_crane.png" alt="School" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  </div>
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 font-display">
                    {isRtl ? 'المنشآت التعليمية والطبية' : 'School and Hospital Cleaning'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {copy.service2Desc}
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                <div className="relative">
                  {/* Top Badge */}
                  <div className={`absolute top-4 left-4 right-4 flex items-center justify-between z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 bg-brand-yellow px-3.5 py-1.5 rounded-full shadow">
                      {isRtl ? 'النظافة البلدية والطرق' : 'Municipal Sanitation'}
                    </span>
                    <button 
                      onClick={(e) => handleLinkClick(e, '#/services')}
                      className="h-8 w-8 rounded-full bg-brand-red text-white hover:bg-brand-red-dark flex items-center justify-center shadow-md transition-colors cursor-pointer"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Card Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src="/images/heavy_forklift_ksa.png" alt="Municipal" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  </div>
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 font-display">
                    {isRtl ? 'خدمات الكنس ونظافة البلديات' : 'Municipal & Highway Sweeping'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {copy.service3Desc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Why Choose Us (Checklist and Stats badge) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Left Column Video Pre-view */}
              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full max-w-[480px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-black group border border-slate-100">
                  <img src="/images/realestate_banner.png" alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-102 transition-all duration-500" />
                  {/* Big play overlay button */}
                  <button className="absolute inset-0 flex items-center justify-center cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-[#A31D1D] text-white flex items-center justify-center shadow-2xl group-hover:bg-brand-yellow group-hover:text-slate-950 transition-all duration-300">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                  </button>
                </div>

                {/* Floating "100K+ Project Finished" badge on right side */}
                <div className={`absolute -top-6 ${isRtl ? 'left-6' : 'right-6'} bg-[#121212] border border-[#2c2c2c] rounded-2xl p-5 shadow-2xl text-center flex flex-col items-center justify-center text-white min-w-[130px]`}>
                  <span className="text-2xl font-black text-brand-yellow font-display leading-none">
                    {copy.whyStats}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black mt-2 leading-none">
                    {copy.whyStatsLabel}
                  </span>
                </div>
              </div>

              {/* Right Column bullet list */}
              <div className="lg:col-span-6 space-y-6">
                <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="h-0.5 w-8 bg-brand-red" />
                  <span className="text-xs font-black uppercase tracking-widest text-brand-red font-display">
                    {copy.whyTag}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight leading-tight font-display">
                  {copy.whyTitle}
                </h2>
                
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                  {copy.whyDesc}
                </p>

                {/* 4 bullet columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1 bg-[#A31D1D] text-white rounded-lg mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 font-display">{copy.whyBullet1}</h4>
                      <p className="text-[10.5px] text-slate-500 leading-relaxed mt-0.5">{copy.whyBullet1Desc}</p>
                    </div>
                  </div>

                  <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1 bg-[#A31D1D] text-white rounded-lg mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 font-display">{copy.whyBullet2}</h4>
                      <p className="text-[10.5px] text-slate-500 leading-relaxed mt-0.5">{copy.whyBullet2Desc}</p>
                    </div>
                  </div>

                  <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1 bg-[#A31D1D] text-white rounded-lg mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 font-display">{copy.whyBullet3}</h4>
                      <p className="text-[10.5px] text-slate-500 leading-relaxed mt-0.5">{copy.whyBullet3Desc}</p>
                    </div>
                  </div>

                  <div className={`flex gap-3 items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1 bg-[#A31D1D] text-white rounded-lg mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 font-display">{copy.whyBullet4}</h4>
                      <p className="text-[10.5px] text-slate-500 leading-relaxed mt-0.5">{copy.whyBullet4Desc}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 6: Trusted Slider Banner (Vibrant Yellow background) */}
        <section className="bg-brand-yellow py-10 select-none">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 font-display">
              {copy.brandHeading}
            </h3>
            {/* Logo Slots */}
            <div className={`flex flex-wrap items-center justify-center gap-10 lg:gap-16 opacity-80 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-black text-slate-950 uppercase tracking-widest font-display">ELGIN</span>
              <span className="text-sm font-black text-slate-950 uppercase tracking-widest font-display">JOHNSTON</span>
              <span className="text-sm font-black text-slate-950 uppercase tracking-widest font-display">SCARAB</span>
              <span className="text-sm font-black text-slate-950 uppercase tracking-widest font-display">SAUDI ARAMCO</span>
              <span className="text-sm font-black text-slate-950 uppercase tracking-widest font-display">VISION 2030</span>
            </div>
          </div>
        </section>

        {/* Section 7: Testimonials Feed (Side image & cards stack) */}
        <section className="py-24 bg-slate-50/30 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Left Column Transparent Vehicle Frame */}
              <div className="lg:col-span-5 hidden lg:flex justify-center relative">
                <div className="w-full max-w-[380px] aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/50 bg-white p-3 shadow-md">
                  <img src="/images/road_sweeper_riyadh.png" alt="Sweeper Truck" className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>

              {/* Right Column Testimonials Slider */}
              <div className="lg:col-span-7 space-y-6">
                <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="h-0.5 w-8 bg-brand-red" />
                  <span className="text-xs font-black uppercase tracking-widest text-brand-red font-display">
                    {copy.testTag}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight leading-tight font-display">
                  {copy.testTitle}
                </h2>

                {/* Testimonial List Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {data.testimonials.items.map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow relative space-y-4">
                      {/* Rating stars */}
                      <div className={`flex items-center gap-1 text-brand-yellow ${isRtl ? 'flex-row-reverse' : ''}`}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 font-medium italic leading-relaxed">
                        "{item.quote}"
                      </p>
                      <div className={`border-t border-slate-50 pt-4 flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                          <User className="h-4.5 w-4.5 text-slate-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-950 font-display leading-none">
                            {item.author}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 8: Blog News (Standard Card Grid) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="h-0.5 w-6 bg-brand-red" />
                <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                  {copy.blogTag}
                </span>
                <span className="h-0.5 w-6 bg-brand-red" />
              </div>
              <h2 className="text-3xl lg:text-4.5xl font-black text-slate-900 tracking-tight font-display">
                {copy.blogTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogData[langKey].posts.slice(0, 3).map((item, idx) => {
                const imagesList = [
                  '/images/road_sweeper_riyadh.png',
                  '/images/boom_truck_crane.png',
                  '/images/heavy_forklift_ksa.png'
                ];
                const cardImage = imagesList[idx] || imagesList[0];

                return (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Image cover */}
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                        <img src={cardImage} alt="News cover" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                        <span className="absolute bottom-4 left-4 text-[9px] font-black uppercase tracking-wider text-slate-900 bg-brand-yellow px-3 py-1 rounded shadow">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Details */}
                      <div className="p-7 space-y-4">
                        <div className={`flex items-center gap-3 text-[10px] text-slate-400 font-bold ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-brand-red" />
                            <span>{item.date}</span>
                          </div>
                          <span className="text-slate-200">|</span>
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-brand-red" />
                            <span>{isRtl ? 'الإدارة' : 'Admin'}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-black text-slate-900 group-hover:text-brand-red transition-colors duration-200 font-display leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-7 pb-7">
                      <button
                        onClick={(e) => handleLinkClick(e, '#/blog')}
                        className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-800 hover:text-brand-red transition-colors cursor-pointer font-display ${
                          isRtl ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <span>{copy.readMore}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} onPageChange={onPageChange} />

    </div>
  );
};

export default Home;
