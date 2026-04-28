import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import type { Metadata } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 0; 

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from('leads')
    .select('website_data')
    .eq('id', id)
    .single();

  if (!data || !data.website_data) return { title: 'Anteprima Sito' };
  
  const mockData = data.website_data;
  return {
    title: `${mockData?.meta?.main_service || 'Sito'} a ${mockData?.meta?.city || 'Italia'} | ${mockData?.meta?.company_name || 'Business'}`,
    description: mockData?.hero?.subtitle || '',
  };
}

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('leads')
    .select('website_data')
    .eq('id', id)
    .single();

  if (error || !data || !data.website_data) {
    notFound(); 
  }

  const mockData = data.website_data;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": mockData?.meta?.company_name || "La tua attività",
    "telephone": mockData?.contact?.phone || ""
  };

  const primaryColor = mockData?.meta?.primary_color || '#e11d48';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <style dangerouslySetInnerHTML={{__html: `
        ::selection {
          background-color: ${primaryColor}40;
        }
      `}} />
      
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center">
            <div 
              className="w-10 h-10 rounded-xl text-white flex items-center justify-center mr-3 shadow-lg shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="truncate">{mockData?.meta?.company_name || "Anteprima"}</span>
          </div>
          {mockData?.contact?.phone && (
            <div className="hidden md:block">
              <a 
                href={`tel:${mockData.contact.phone.replace(/\s+/g, '')}`} 
                className="inline-flex items-center px-6 py-2.5 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                Chiama Ora
              </a>
            </div>
          )}
        </div>
      </header>

      <main>
        {mockData?.hero && <Hero data={mockData} />}
        {mockData?.services && <Services data={mockData} />}
        {mockData?.reviews && <Reviews data={mockData} />}
        {mockData?.contact && <Contact data={mockData} />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-2xl font-extrabold text-white mb-6">
            {mockData?.meta?.company_name}
          </div>
          <p className="mb-4">
            {mockData?.footer?.description || `Servizi professionali a ${mockData?.meta?.city || 'Bari'}`}
          </p>
          <p className="text-sm">
             © 2026 {mockData?.meta?.company_name}. Tutti i diritti riservati.
          </p>
        </div>
      </footer>

      {mockData?.contact?.phone && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-50">
          <a 
            href={`tel:${mockData.contact.phone.replace(/\s+/g, '')}`} 
            className="w-full flex items-center justify-center px-6 py-4 text-white text-lg font-bold rounded-xl shadow-lg"
            style={{ backgroundColor: primaryColor }}
          >
            Chiama Ora
          </a>
        </div>
      )}
    </div>
  );
}