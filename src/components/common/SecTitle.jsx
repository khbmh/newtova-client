function SecTitle({ title, description }) {
  return (
    <div className="mt-[15vh] mb-[3vh] space-y-6">
      <h1 className="heading mt-12 text-4xl lg:text-5xl font-sans font-black tracking-tight">
        {title}
      </h1>
      <p className="paragraph px-2 text-xs lg:max-w-[500px] mx-auto lg:text-sm text-white/60">
        {description}
      </p>
    </div>
  );
}

export default SecTitle;
