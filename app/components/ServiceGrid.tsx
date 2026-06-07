'use client';
import Image from 'next/image';

type Service = {
  title: string;
  focus: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function ServiceGrid({ services }: { services: Service[] }) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tX = ((y - rect.height / 2) / (rect.height / 2)) * -7;
    const tY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    card.style.transform = `perspective(900px) rotateX(${tX}deg) rotateY(${tY}deg) translateZ(8px)`;
    card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
    card.style.setProperty('--glow-show', '1');
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.setProperty('--glow-show', '0');
  };

  return (
    <div className="service-grid">
      {services.map((service) => (
        <article
          key={service.title}
          className="service-card"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <figure className="service-image">
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              width={1200}
              height={760}
              className="service-photo"
            />
          </figure>
          <span className="service-focus">{service.focus}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </article>
      ))}
    </div>
  );
}
