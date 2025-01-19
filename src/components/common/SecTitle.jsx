function SecTitle({ title, description }) {
  return (
    <div className="mt-[15vh] mb-[3vh] space-y-6 pointer-events-none">
      <h1 className="heading mt-12 text-4xl lg:text-5xl font-sans font-black tracking-tight">
        {title}
      </h1>
      <p className="paragraph px-4 text-xs max-w-[650px] mx-auto lg:text-sm text-white/60">
        {description}
      </p>
    </div>
  );
}

export default SecTitle;
