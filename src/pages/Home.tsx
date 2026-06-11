import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { homeData } from '../data/homeData';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { EntityCard } from '../components/EntityCard';
import { StatCard } from '../components/StatCard';

export const Home: React.FC = () => {
  const { navLinks, hero, entities, stats, values } = homeData;

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    entity: 'machinery',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        entity: 'machinery',
        message: ''
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[35%] h-[50%] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[150px]" />
      </div>

      {/* Header */}
      <Header links={navLinks} />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 sm:pb-24 lg:pt-40 lg:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Banner/Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-8 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-medium tracking-wide uppercase">Vision 2030 Aligned Operations</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
              {hero.title}{' '}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600">
                {hero.highlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto mb-10 font-light">
              {hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#entities"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-sm font-semibold rounded-xl text-zinc-950 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {hero.primaryCta}
                <Icons.ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-zinc-800 text-sm font-semibold rounded-xl text-white bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>

        {/* Diagonal border accent at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </section>

      {/* Entities Section */}
      <section id="entities" className="relative py-20 sm:py-28 bg-zinc-950 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
              Corporate Portfolio
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              The Entities of Al Kayanat
            </p>
            <p className="text-base text-zinc-500 leading-relaxed font-light">
              Through strategic coordination, we provide each subsidiary with robust corporate guidance, financial stability, and shared technological assets to execute high-impact regional projects.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {entities.map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements / Stats Section */}
      <section id="stats" className="relative py-20 bg-zinc-950/40 border-y border-zinc-900 z-10">
        <div className="absolute inset-0 bg-radial-gradient from-zinc-900/50 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
              Group Performance
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Operational Statistics at a Glance
            </p>
            <p className="text-base text-zinc-500 leading-relaxed font-light">
              Demonstrated scale and delivery reliability across private, industrial, and government sectors.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="relative py-20 sm:py-28 bg-zinc-950 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
                Our Foundation
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Pillars That Shape Our Actions
              </p>
              <p className="text-base text-zinc-400 leading-relaxed font-light">
                Our business model is built on standard industry safety protocols, data-backed operational systems, and future-forward ecological goals.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Learn more about our standards
                  <Icons.ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Pillars Cards */}
            <div className="lg:col-span-2 space-y-6">
              {values.map((val, idx) => {
                const ValIcon = (Icons as any)[val.iconName] || Icons.CheckCircle;
                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 transition-colors duration-300"
                  >
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-500 shrink-0">
                      <ValIcon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 tracking-wide">
                        {val.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-light">
                        {val.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 sm:py-28 bg-zinc-950 border-t border-zinc-900 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
                  Connect With Us
                </h2>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
                  Initiate a Collaboration
                </p>
                <p className="text-base text-zinc-400 leading-relaxed font-light">
                  Have a question about heavy machinery rental, logistics dispatch, real estate leases, or corporate investment? Fill out the inquiry form, and our regional operations desks will respond within 24 hours.
                </p>
              </div>

              {/* Quick Contact Info Block */}
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 space-y-4">
                <div className="flex items-center space-x-3 text-zinc-400">
                  <Icons.Phone className="h-5 w-5 text-amber-500 shrink-0" />
                  <span className="text-sm font-medium">{homeData.footer.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-zinc-400">
                  <Icons.Mail className="h-5 w-5 text-amber-500 shrink-0" />
                  <span className="text-sm font-medium">{homeData.footer.contactInfo.email}</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-400">
                  <Icons.MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-relaxed">
                    {homeData.footer.contactInfo.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm shadow-2xl relative">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="inline-flex p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-2">
                      <Icons.CheckCircle className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                    <p className="text-zinc-400 text-sm max-w-sm mx-auto font-light leading-relaxed">
                      Thank you for contacting Al Kayanat Group. Your inquiry has been forwarded to the appropriate desk, and we will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 inline-flex text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 focus:outline-none"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                          placeholder="Abdullah bin Fahd"
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Company input */}
                      <div>
                        <label htmlFor="company" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                          placeholder="Company Ltd."
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                          placeholder="+966 50 000 0000"
                        />
                      </div>
                    </div>

                    {/* Associated Entity */}
                    <div>
                      <label htmlFor="entity" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Portfolio Entity of Interest
                      </label>
                      <select
                        name="entity"
                        id="entity"
                        value={formData.entity}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="machinery">Al Kayanat Heavy Equipment</option>
                        <option value="logistics">Al Kayanat Logistics & Supply</option>
                        <option value="development">Al Kayanat Real Estate & Development</option>
                        <option value="ventures">Al Kayanat Tech Ventures</option>
                        <option value="general">General Group Inquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Message details
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-zinc-800/80 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm resize-none"
                        placeholder="Please describe your requirements..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-sm font-semibold rounded-xl text-zinc-950 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      Send Message Inquiry
                      <Icons.Send className="ml-2 h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Home;
