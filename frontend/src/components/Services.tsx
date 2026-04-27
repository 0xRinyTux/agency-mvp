import React from 'react';

const Services = ({ data }: { data: any }) => {
  return (
    <section id="services" className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">{data.services.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            {data.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.items.map((service: string, index: number) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-[1.5rem] p-8 transition-transform duration-300 hover:-translate-y-2 border border-slate-200"
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-slate-200 text-slate-700"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">
                {service}
              </h3>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-slate-900 text-white rounded-[2rem] p-10 md:p-14 shadow-2xl grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold mb-6 leading-tight">{data.about.title}</h2>
            <p className="text-lg text-slate-300 leading-relaxed font-medium">
              {data.about.description}
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
             <a 
                href={`tel:${data.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-xl transition-transform hover:scale-105 shadow-xl"
                style={{ backgroundColor: data.meta.primary_color, boxShadow: `0 10px 25px -5px ${data.meta.primary_color}80` }}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {data.about.cta}
              </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
