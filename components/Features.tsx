
import React from 'react';
import { BoltIcon, BookOpenIcon, WrenchScrewdriverIcon } from './IconComponents';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center h-16 w-16 bg-sky-100 rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600">{children}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Tudo que você precisa saber sobre Construção a Seco
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Nosso assistente foi treinado para fornecer informações detalhadas sobre os aspectos mais importantes do drywall e steel frame.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BoltIcon className="h-8 w-8 text-sky-600" />}
            title="Respostas Instantâneas"
          >
            Chega de esperar ou procurar em manuais complexos. Obtenha respostas claras e diretas para suas perguntas em segundos.
          </FeatureCard>
          <FeatureCard
            icon={<WrenchScrewdriverIcon className="h-8 w-8 text-sky-600" />}
            title="Guias de Instalação"
          >
            Pergunte sobre o passo a passo de montagem, ferramentas necessárias, e melhores práticas para uma instalação perfeita.
          </FeatureCard>
          <FeatureCard
            icon={<BookOpenIcon className="h-8 w-8 text-sky-600" />}
            title="Informações de Materiais"
          >
            Conheça os tipos de placas, perfis, parafusos e isolamentos. Saiba qual material é o mais adequado para cada situação.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
