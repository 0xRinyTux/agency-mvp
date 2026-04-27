import React from "react";
import type { Metadata } from 'next';
import data from "../mockData.json";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: `${data.meta.main_service} a ${data.meta.city} | ${data.meta.company_name}`,
  description: data.hero.subtitle,
}

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.meta.company_name,
    "telephone": data.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.contact.address,
      "addressLocality": data.meta.city
    },
    "openingHours": Object.entries(data.contact.opening_hours).map(([day, hours]) => `${day} ${hours}`)
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <style dangerouslySetInnerHTML={{__html: `
        ::selection {
          background-color: ${data.meta.primary_color}40;
        }
      `}} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center">
            <div 
              className="w-10 h-10 rounded-xl text-white flex items-center justify-center mr-3 shadow-lg shrink-0"
              style={{ backgroundColor: data.meta.primary_color }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="truncate">{data.meta.company_name}</span>
          </div>
          <div className="hidden md:block">
            <a 
              href={`tel:${data.contact.phone.replace(/\s+/g, '')}`} 
              className="inline-flex items-center px-6 py-2.5 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              style={{ backgroundColor: data.meta.primary_color }}
            >
              <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Chiama Ora
            </a>
          </div>
        </div>
      </header>

      <main>
        <Hero data={data} />
        <Services data={data} />
        <Reviews data={data} />
        <Contact data={data} />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-2xl font-extrabold text-white mb-6 flex items-center justify-center">
            {data.meta.company_name}
          </div>
          <p className="mb-4">
            {data.footer.description}
          </p>
          <p className="text-sm">
             © {new Date().getFullYear()} {data.meta.company_name}. Tutti i diritti riservati.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] z-50">
        <a 
          href={`tel:${data.contact.phone.replace(/\s+/g, '')}`} 
          className="w-full flex items-center justify-center px-6 py-4 text-white text-lg font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
          style={{ backgroundColor: data.meta.primary_color }}
        >
          <svg className="w-6 h-6 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Chiama Ora
        </a>
      </div>
    </div>
  );
}
