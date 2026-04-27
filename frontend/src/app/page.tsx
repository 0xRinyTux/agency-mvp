import Image from "next/image";

const mockData = {
"company_name": "R.R Idraulica",
"hero_title": "Emergenza Idraulica? Siamo da Te in 15 Minuti.",
"hero_subtitle": "Pronto intervento H24 a Milano: interveniamo in 15 minuti, ogni giorno dell'anno, con prezzi trasparenti e senza sorprese.",
"services": [
"Pronto Intervento H24",
"Riparazione Tubi Scoppiati",
"Sblocco Scarichi e Fognature",
"Sostituzione Caldaie e Boiler"
],
"about_us": "Riccardo e Federico sono due idraulici giovani, competenti e sempre reperibili, anche di notte e nei festivi. Operano in tutta Milano centro con un approccio onesto, lavori puliti e soluzioni rapide. Per ogni emergenza idraulica, sono la scelta giusta.",
"contact_phone": "324 806 4800",
"address": "Via Meravigli, 20121 Milano MI",
"google_maps_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d449278.7375341314!2d9.06353296905437!3d45.44472950995973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c146394bc381%3A0xe111af2ff63b7a7b!2sR.R%20idraulica!5e1!3m2!1sit!2sit!4v1777294181826!5m2!1sit!2sit",
"opening_hours": {
"Lunedì": "Aperto 24 ore su 24",
"Martedì": "Aperto 24 ore su 24",
"Mercoledì": "Aperto 24 ore su 24",
"Giovedì": "Aperto 24 ore su 24",
"Venerdì": "Aperto 24 ore su 24",
"Sabato": "Aperto 24 ore su 24",
"Domenica": "Aperto 24 ore su 24"
},
"reviews": [
{ "name": "Gemma Moreau", "text": "Riccardo è arrivato lo stesso giorno della chiamata. Ha risolto rapidamente due piccoli problemi. Molto professionale e onesto.", "rating": 5 },
{ "name": "Luciano Verdetti", "text": "Idraulico giovane e molto professionale. Mi è scoppiato un tubo, in 15 minuti era a casa mia e ha risolto il problema in un attimo. Consigliatissimo!", "rating": 5 },
{ "name": "Laura Zanutti", "text": "Federico e Riccardo, li consiglio senza il minimo dubbio. Onesti, rapidissimi, competenti ed educati. Ho salvato il loro numero in rubrica.", "rating": 5 }
]
};

export default function Home() {
  const data = mockData;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Header */}
      <header className={`bg-white shadow-sm border-t-4 border-blue-600`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className={`text-2xl font-bold text-blue-600`}>
            {data.company_name}
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
        <div className={`bg-blue-600 text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
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
                href={`https://wa.me/${data.contact_phone.replace(/[^0-9]/g, '')}?text=Salve,%20ho%20bisogno%20di%20un%20intervento.`} 
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
              {data.services.map((service, index) => (
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

        <section id="mappa" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Orari e Mappa</h2>
                  <p className="text-lg text-slate-900">
                    <span className="text-blue-600 font-semibold">Indirizzo:</span> {data.address}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-slate-900">Orari di apertura</h3>
                  </div>
                  <div className="px-6 py-4">
                    <table className="w-full text-left">
                      <tbody>
                        {Object.entries(data.opening_hours).map(([day, hours]) => (
                          <tr key={day} className="border-b last:border-b-0 border-gray-100">
                            <td className="py-2 pr-4 font-medium text-slate-900">{day}</td>
                            <td className={`py-2 ${hours === "Chiuso" ? "text-slate-500" : "text-slate-900"}`}>{hours}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="h-full">
                <iframe
                  src={data.google_maps_embed_url}
                  title={`Mappa ${data.company_name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[400px] rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Cosa dicono i nostri clienti</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {data.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="text-yellow-400 text-xl mb-2">{"★".repeat(review.rating)}</div>
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
         © {new Date().getFullYear()} {data.company_name}. Tutti i diritti riservati.
      </footer>
    </div>
  );
}
