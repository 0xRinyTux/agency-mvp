import { supabase } from '@/utils/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: lead, error } = await supabase
    .from('leads')
    .select('website_data, company_name')
    .eq('id', id)
    .single();

  if (error || !lead) {
    notFound();
  }

  const data = lead.website_data;

  // Renderizziamo il Master Template
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Header */}
      <header className={`bg-white shadow-sm border-t-4 border-blue-600`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className={`text-2xl font-bold text-blue-600`}>
            {lead.company_name}
          </div>
          <div>
            <a href={`tel:${data.contact_phone}`} className={`font-semibold text-blue-600`}>
              {data.contact_phone}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className={`bg-blue-600 text-white relative overflow-hidden`}>
          {/* Sfondo fisso stock / professionale ma neutrale */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop" 
              alt="Professional Business" 
              className="w-full h-full object-cover opacity-20" 
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              {data.hero_title}
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mb-10 opacity-90">
              {data.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${data.contact_phone}`} className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
                Chiama Ora {data.contact_phone}
              </a>
              <a 
                href={`https://wa.me/${data.contact_phone?.replace(/[^0-9]/g, '')}?text=Salve,%20ho%20bisogno%20di%20un%20intervento.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-600 transition shadow-lg inline-block"
              >
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Chi Siamo</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.about_us}
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">I Nostri Servizi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.services?.map((service: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Cosa dicono i nostri clienti</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {data.reviews?.map((review: any, index: number) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="text-yellow-400 text-xl mb-2">{"★".repeat(review.rating || 5)}</div>
                  <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                  <div className="font-semibold text-gray-900">- {review.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div id="contatti" className="bg-blue-600 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Hai un'emergenza o vuoi un preventivo?</h2>
            <p className="text-xl mb-8 opacity-90">Contattaci subito per un intervento rapido e professionale.</p>
            <a href={`tel:${data.contact_phone}`} className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-xl inline-block">
              Chiama {data.contact_phone}
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
         © {new Date().getFullYear()} {lead.company_name}. Tutti i diritti riservati.
      </footer>
    </div>
  );
}