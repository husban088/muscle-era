export default function Hero() {
  return (
    <div className="relative w-full h-full">
      <img
        src="/images/heroimg.png"
        alt="Gym Banner Desktop"
        className="w-full h-full object-cover md:block hidden"
      />
      <img
        src="/images/herotwo.png"
        alt="Gym Banner Mobile"
        className="w-full h-full object-cover md:hidden block"
      />
    </div>
  );
}
