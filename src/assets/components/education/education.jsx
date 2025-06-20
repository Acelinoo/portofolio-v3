import React from "react";

const Education = () => {
  const data = [
    {
      title: "SMK Yadika Soreang",
      year: "2021 - 2024",
      description:
       "Pursuing a degree in Informatics to deepen my expertise in web development."
    },
    {
      title: "Universitas Komputer Indonesia",
      year: "2024 - Sekarang",
      description:
       "Majored in Software Engineering, where I began learning coding and web development."
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-white" id="education">
      <h2 className="text-2xl font-bold mb-12 text-center">Education</h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Garis Tengah */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gray-300 z-0" />

        <ol className="relative z-10">
          {data.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <li
                key={idx}
                className={`mb-14 flex flex-col md:flex-row items-center justify-between ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Konten */}
                <div
                  className={`bg-white border border-gray-200 rounded-lg shadow-md p-6 w-full md:w-[45%] ${
                    isLeft ? "md:ml-8 text-left" : "md:mr-8 text-right"
                  }`}
                >
                  <time className="block mb-2 text-sm font-semibold text-gray-500">
                    {item.year}
                  </time>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>

                {/* Titik Tengah */}
                <div className="w-4 h-4 bg-black rounded-full z-10 border-4 border-white md:mx-4 my-4 md:my-0" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Education;
