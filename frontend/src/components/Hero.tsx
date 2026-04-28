import React from 'react';
import Image from 'next/image';

const Hero = ({ data }: { data: any }) => {
  return (
    <section className="relative bg-slate-50 text-slate-900 py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start">
            {data.hero.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-6 font-bold tracking-wider text-sm uppercase border border-red-200">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-600"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                {data.hero.badge}
              </div>
            )}
            
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
              {data.hero?.title || data.meta?.company_name || "La tua attività"}
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl font-medium">
              {data.hero?.subtitle}
            </p>

            {data.reviews?.best_review && (
              <div className="w-full bg-white border border-amber-200 rounded-2xl p-5 mb-10 shadow-sm shadow-amber-100/50">
                <div className="flex text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-700 font-medium italic mb-2">"{data.reviews.best_review.text}"</p>
                <p className="text-sm font-bold text-slate-900">- {data.reviews.best_review.name}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {data.contact?.phone && (
                <a 
                  href={data.hero?.cta_primary?.toLowerCase().includes('whatsapp') 
                    ? `https://wa.me/${data.contact.phone.replace(/\+/g, '').replace(/\s+/g, '')}`
                    : `tel:${data.contact.phone.replace(/\s+/g, '')}`}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-xl overflow-hidden shadow-xl transition-all hover:opacity-90 focus:ring-4"
                  style={{ backgroundColor: data.meta?.primary_color || '#e11d48', boxShadow: `0 10px 20px -5px ${data.meta?.primary_color || '#e11d48'}60` }}
                >
                  {data.hero?.cta_primary?.toLowerCase().includes('whatsapp') ? (
                    <svg className="w-6 h-6 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  ) : (
                    <svg className="w-6 h-6 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  {data.hero?.cta_primary || "Contattaci"}
                </a>
              )}
              
              <a 
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl transition-all hover:bg-slate-50 hover:border-slate-300"
              >
                {data.hero?.cta_secondary || "Scopri di più"}
              </a>
            </div>
          </div>

          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
            {data.hero.image_url ? (
              <Image 
                src={data.hero.image_url} 
                alt={data.hero.image_alt || "Immagine attività"}
                fill
                priority={true}
                className="object-cover w-full h-full"
                onError={(e) => {
                  // Fallback se l'immagine Unsplash fallisce
                  console.log("Image load failed");
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
