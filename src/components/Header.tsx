type Props = {
  text: string;
};

export function Header({ text }: Readonly<Props>) {
  return (
    <header className="slide-in relative mx-auto mt-8 mb-4 flex max-w-fit items-center">
      <span className="speed-line slide-in absolute top-1.5 -left-12 delay-1 md:top-2"></span>
      <span className="speed-line slide-in absolute top-3 -left-16 delay-2 md:top-3.5"></span>
      <span className="speed-line slide-in absolute bottom-2.5 -left-14 delay-3"></span>

      <h2 className="-skew-x-6 text-lg font-semibold text-white md:text-2xl">
        {text}
      </h2>
    </header>
  );
}
