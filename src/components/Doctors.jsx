import React from 'react';

const Doctors = () => {
  const doctors = [
    {
      name: "Beatrice Cox",
      role: "Dentist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Austin Camacho",
      role: "Surgeon",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Fletcher Morse",
      role: "Dentist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Aysha Hayes",
      role: "Orthodontist",
      image: "https://images.unsplash.com/photo-1594824432258-00626b9a8966?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="doctors" className="px-8 py-16 bg-lume-white max-w-[1600px] mx-auto rounded-[3rem]">
      {/* Top Header */}
      <div className="mb-12">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold tracking-wide uppercase text-lume-black/60 mb-6">
          Our Doctors
        </div>
        <h2 className="text-[3.5rem] leading-tight font-display font-semibold text-lume-black tracking-tight mb-8">
          Dental Experts<br />You Can Trust
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-2.5 rounded-full bg-[#c84b16] text-white font-semibold text-sm transition-colors">
            All Experts
          </button>
          <button className="px-6 py-2.5 rounded-full bg-lume-gray text-lume-black font-semibold text-sm hover:bg-[#c84b16] hover:text-white transition-colors">
            Dentists
          </button>
          <button className="px-6 py-2.5 rounded-full bg-lume-gray text-lume-black font-semibold text-sm hover:bg-[#c84b16] hover:text-white transition-colors">
            Surgeons
          </button>
          <button className="px-6 py-2.5 rounded-full bg-lume-gray text-lume-black font-semibold text-sm hover:bg-[#c84b16] hover:text-white transition-colors">
            Orthodontists
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doc, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="rounded-[2rem] overflow-hidden bg-lume-gray h-[360px] mb-6">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">{doc.name}</h3>
            <p className="text-lume-black/60 font-medium text-sm">{doc.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Doctors;
