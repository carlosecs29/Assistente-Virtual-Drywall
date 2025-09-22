import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-400">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} ConstructoBot. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">
            Desenvolvido como uma demonstração da API Gemini.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
