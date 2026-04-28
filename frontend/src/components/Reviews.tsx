import React from 'react';

const Reviews = ({ data }: { data: any }) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">{data.reviews.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            {data.reviews.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.reviews.items.map((review: any, index: number) => (
            <div 
              key={index} 
              className="bg-white rounded-[1.5rem] p-8 border border-slate-200 flex flex-col shadow-sm"
            >
              <div className="flex text-amber-400 mb-4">
                {[...Array(Math.floor(review.rating || 5))].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 italic flex-grow mb-6 text-lg font-medium">
                "{review.text}"
              </p>
              <div className="flex items-center mt-auto">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-3 bg-slate-800 text-white"
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{review.name}</h3>
                  <span className="text-sm text-slate-500 font-medium">Recensione verificata</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
