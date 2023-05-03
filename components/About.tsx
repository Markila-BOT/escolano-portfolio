import React from "react";

const About = () => {
  return (
    <section className="relative w-full h-full">
      <div className="flex flex-col prose">
        <>
          <h1 className="text-left text-gray-500 max-w-prose d:text-gray-400">
            a
            <strong className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Full-Stack Engineer
            </strong>
            with a strong focus on frontend technologies.
          </h1>
          <span className="mb-3 text-4xl text-left text-gray-500 max-w-prose d:text-gray-400">
            A passion for crafting intuitive and visually appealing user
            experiences, utilizing technologies such as React, Angular, or
            Svelte.
          </span>
          <span className="mb-3 text-2xl text-left text-gray-500 max-w-prose d:text-gray-400">
            When not coding, I can find myself nose buried in a good book,
            indulging in my love for reading.
          </span>
          <span className="mb-3 text-2xl text-left text-gray-500 max-w-prose d:text-gray-400">
            Dedicated to producing high-quality software and continuously
            striving to improve skills and knowledge. Most important is
            understanding the importance of writing clean, maintainable code and
            taking pride in my work.
          </span>
        </>
      </div>
    </section>
  );
};

export default About;
