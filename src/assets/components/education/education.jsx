import React from "react";

const Education = () => {
  const data = [
    {
      link:"https://smkyadikasoreang.sch.id/Home",
      title: "SMK Yadika Soreang",
      year: "2021 - 2024",
      description:
       "Pursuing a degree in Informatics to deepen my expertise in web development."
    },
    {
      link:"https://unikom.ac.id/",
      title: "Universitas Komputer Indonesia",
      year: "2024 - Present",
      description:
       "Majored in Software Engineering, where I began learning coding and web development."
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-white dark:bg-transparent transition-colors duration-300 w-full" id="education">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-12 text-center tracking-wide text-gray-900 dark:text-white">Education</h2>

      <div className="relative max-w-3xl mx-auto px-4 md:px-0">
        {/* Garis Kiri */}
        <div className="absolute top-0 left-6 md:left-8 w-[2px] h-full bg-gray-200 dark:bg-gray-700 z-0" />

        <ol className="relative z-10">
          {data.map((item, idx) => (
            <li key={idx} className="mb-10 ml-10 md:ml-16 relative group cursor-pointer">
              {/* Titik */}
              <div className="absolute -left-[31px] md:-left-[39px] mt-1.5 w-4 h-4 bg-black dark:bg-white rounded-full z-10 border-4 border-white dark:border-[#0B192C] group-hover:scale-125 transition-transform duration-300" />
              
              {/* Konten */}
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-8 hover:-translate-y-1">
                <time className="block mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                  {item.year}
                </time>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;
