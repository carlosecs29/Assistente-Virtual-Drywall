
import React from 'react';
import { BotIcon } from './IconComponents';

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-sky-100 p-5 rounded-full">
            <BotIcon className="h-16 w-16 text-sky-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
          Seu Especialista Virtual em
          <br />
          <span className="text-sky-600">Drywall e Steel Frame</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Tire suas dúvidas técnicas, de instalação a materiais, com respostas rápidas e precisas. Otimize seu projeto com a ajuda da inteligência artificial.
        </p>
        <a
          href="#chat"
          className="bg-sky-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-sky-700 transition-transform duration-300 hover:scale-105 inline-block"
        >
          Comece a Conversar Gratuitamente
        </a>
      </div>
    </section>
  );
};

export default Hero;
