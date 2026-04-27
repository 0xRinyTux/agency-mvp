import React from 'react';

const Contact = ({ data }: { data: any }) => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight text-slate-900">{data.contact.title}</h2>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mr-5 shrink-0 text-white shadow-lg"
                  style={{ backgroundColor: data.meta.primary_color }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-slate-900">{data.contact.phone_label}</h3>
                  <p className="text-slate-600 font-medium">{data.contact.phone_sublabel}</p>
                  <a href={`tel:${data.contact.phone.replace(/\s+/g, '')}`} className="text-3xl font-extrabold mt-2 block hover:opacity-80 transition-opacity" style={{ color: data.meta.primary_color }}>
                    {data.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mr-5 shrink-0 border border-slate-200">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-slate-900">{data.contact.address_label}</h3>
                  <p className="text-slate-600 font-medium text-lg">{data.contact.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[1.5rem] p-8 border border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center text-slate-900">
                <svg className="w-6 h-6 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {data.contact.hours_title}
              </h3>
              <ul className="space-y-4">
                {Object.entries(data.contact.opening_hours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between items-center border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                    <span className="text-slate-600 font-medium text-lg">{day}</span>
                    <span className="font-bold text-slate-900 text-lg">{hours as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden shadow-xl h-[400px] lg:h-auto relative border border-slate-200">
            <iframe 
              src={data.contact.google_maps_embed_url} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Google Maps Location"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
