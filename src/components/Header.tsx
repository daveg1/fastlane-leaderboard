type Props = {
  text: string;
};

export function Header({ text }: Readonly<Props>) {
  return (
    <header className="relative mb-4 inline-flex items-center">
      <span className="speed-line absolute top-1.5 -left-12 md:top-2"></span>
      <span className="speed-line absolute top-3 -left-16 md:top-3.5"></span>
      <span className="speed-line absolute bottom-2.5 -left-14"></span>

      <h2 className="-skew-x-6 text-lg font-semibold text-white md:text-2xl">
        {text}
      </h2>
    </header>
  );
}
