import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Jeremy Curry",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
      text: "I've always been anxious about visiting the dentist, but when I walked into Lume Dental, I felt at ease. The staff was incredibly welcoming, and Dr. Beatrice Cox took the time to explain everything in detail. The treatment was completely pain-free!"
    },
    {
      name: "Helena Erickson",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      text: "I had been putting off my dental check-up for years due to bad past experiences. A friend recommended Lume Dental, and I'm so glad they did! Dr. Fletcher Morse was kind, patient, and extremely gentle. I needed a filling, and it was done smoothly."
    },
    {
      name: "Mark T.",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "After years of feeling self-conscious about my smile, I decided to look into veneers at Lume Dental. They guided me through every step in a natural and highly professional way."
    }
  ];

  return (
    <section className="px-8 py-16 bg-lume-white max-w-[1600px] mx-auto rounded-[3rem]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold tracking-wide uppercase text-lume-black/60 mb-6">
            Testimonials
          </div>
          <h2 className="text-[3.5rem] leading-tight font-display font-semibold text-lume-black tracking-tight max-w-[500px]">
            What Our<br />Patients Say
          </h2>
        </div>
        <div className="max-w-[400px]">
          <h3 className="text-xl font-semibold mb-2">Smiles That Speak for Themselves</h3>
          <p className="text-lume-black/70 font-medium text-sm">
            Here's what our happy patients have to say about their experience with us.
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-lume-gray rounded-[2rem] p-8 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <div className="flex items-center gap-1 text-[#f59e0b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-current' : 'fill-transparent opacity-30'}`} />
                  ))}
                  <span className="text-lume-black font-semibold ml-2 text-sm">{review.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <p className="text-lume-black/80 font-medium text-[15px] leading-relaxed flex-1">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
