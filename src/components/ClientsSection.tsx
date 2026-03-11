"use client";
import wilsonLogo from "@/assets/clients/wilson.png";
import instarunwayLogo from "@/assets/clients/instarunway.png";
import salomonLogo from "@/assets/clients/salomon.png";
import isroLogo from "@/assets/clients/isro.png";
import moherLogo from "@/assets/clients/moher.png";
import motoavenueLogo from "@/assets/clients/motoavenue.png";
import mrStartLogo from "@/assets/clients/mr-start.png";
import telnysLogo from "@/assets/clients/telnys.png";
import riadLogo from "@/assets/clients/riad.png";
import judithLeiberLogo from "@/assets/clients/judith-leiber.png";
import Image from "next/image";

const clients = [
  { name: "Salomon", logo: salomonLogo },
  { name: "Wilson", logo: wilsonLogo },
  { name: "InstaRunway", logo: instarunwayLogo },
  { name: "ISRO", logo: isroLogo },
  { name: "Moher", logo: moherLogo },
  { name: "Moto Avenue", logo: motoavenueLogo },
  { name: "MR START", logo: mrStartLogo },
  { name: "Telnys", logo: telnysLogo },
  { name: "Ri-Ad", logo: riadLogo },
  { name: "Judith Leiber", logo: judithLeiberLogo },
];

const ClientsSection = () => {
  return (
    <section className="py-14 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-base font-bold tracking-widest uppercase text-muted-foreground">
          Trusted by Leading Brands Worldwide
        </p>
      </div>
      {/* Mobile: static grid */}
      <div className="grid grid-cols-3 gap-4 place-items-center px-4 md:hidden">
        {clients.filter(c => c.name !== "InstaRunway").map((client) => (
          <Image
            key={client.name}
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            className="h-12 w-auto object-contain grayscale opacity-70"
            style={{ background: 'transparent', mixBlendMode: 'multiply' }}
          />
        ))}
      </div>
      {/* Desktop: marquee */}
      <div className="relative hidden md:block">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex">
          <div className="flex shrink-0 animate-marquee gap-20 items-center pr-20">
            {clients.map((client) => (
              <Image
                key={client.name}
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className="h-20 w-auto object-contain shrink-0"
                style={{ background: 'transparent', mixBlendMode: 'multiply' }}
              />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee gap-20 items-center pr-20">
            {clients.map((client) => (
              <Image
                key={`${client.name}-dup`}
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className="h-20 w-auto object-contain shrink-0"
                style={{ background: 'transparent', mixBlendMode: 'multiply' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
