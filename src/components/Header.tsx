type Props = {
  text: string;
};

export function Header({ text }: Readonly<Props>) {
  return (
    <header className="relative mb-4 inline-flex items-center">
      <span className="absolute top-2 -left-[50px] h-[1.5px] w-[40px] bg-red-600"></span>
      <span className="absolute top-[15.5px] -left-[60px] h-[1.5px] w-[40px] bg-red-600"></span>
      <span className="absolute bottom-2 -left-[55px] h-[1.5px] w-[40px] bg-red-600"></span>

      <h2 className="-skew-x-6 text-2xl font-semibold text-white">{text}</h2>
    </header>
  );
}
