const PetFriendlyBlock = () => {
  return (
    <div className="bg-amber-50/80 border border-amber-200/50 rounded-2xl p-5 text-center shadow-sm">
      <span className="text-3xl block mb-2">🐶</span>
      <p className="font-serif text-lg text-amber-900 mb-1">¡Pet friendly!</p>
      <p className="text-amber-800/80 text-sm leading-relaxed">
        Tu mascota también es bienvenida.
      </p>
      <p className="text-amber-700/70 text-xs mt-2">
        Se aceptan mascotas bajo solicitud previa y con suplemento por estancia.
      </p>
    </div>
  );
};

export default PetFriendlyBlock;
