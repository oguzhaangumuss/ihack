import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg1.jpeg"
          alt="NFT Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* İleride buraya içerik ekleyeceğiz */}
      </div>
    </main>
  );
}
