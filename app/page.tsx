import Image from "next/image";
import ServiceGrid from "./components/ServiceGrid";
import MetricsStrip from "./components/MetricsStrip";

type Service = {
  title: string;
  focus: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type Step = {
  title: string;
  description: string;
};

const city = "Curitiba";
const siteUrl = "https://www.fisioterapiacwb.com.br";
const whatsappNumber = "+5541987178565";
const whatsappMessage =
  "Olá! Gostaria de agendar minha avaliação de fisioterapia.";

const phoneDigits = whatsappNumber.replace(/\D/g, "");
const whatsappLink = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
  whatsappMessage
)}`;
const telLink = `tel:+${phoneDigits}`;

const services: Service[] = [
  {
    title: "Reabilitação pós-cirurgia e internação",
    focus: "Recuperação funcional segura",
    description:
      "Acompanhamento especializado após cirurgias ortopédicas e internações, com plano terapêutico progressivo para retomada da mobilidade.",
    imageSrc: "/images/service-ortho.jpg",
    imageAlt: "Fisioterapeuta auxiliando exercício de reabilitação em idoso"
  },
  {
    title: "Prevenção de quedas e equilíbrio",
    focus: "Segurança e independência",
    description:
      "Treinos seguros de equilíbrio e força muscular para reduzir o risco de quedas e preservar a autonomia na vida diária.",
    imageSrc: "/images/service-elderly.jpg",
    imageAlt: "Idosa praticando exercício de equilíbrio com supervisão"
  },
  {
    title: "Dores articulares e condições crônicas",
    focus: "Alívio da dor e funcionalidade",
    description:
      "Tratamento para artrose, artrite, osteoporose, fibromialgia e doenças reumáticas com abordagem individualizada e baseada em evidência.",
    imageSrc: "/images/service-spine.jpg",
    imageAlt: "Fisioterapeuta realizando mobilização articular em idoso"
  },
  {
    title: "Mobilidade e autonomia no dia a dia",
    focus: "Qualidade de vida e independência",
    description:
      "Exercícios funcionais e orientações para recuperar movimentos, melhorar a força e manter a independência nas atividades cotidianas.",
    imageSrc: "/images/service-sport.jpg",
    imageAlt: "Idosa realizando exercício funcional com supervisão profissional"
  }
];

const metrics = [
  { value: "+10 anos", label: "de experiência clínica" },
  { value: "100%", label: "atendimento individualizado" },
  { value: "60 min", label: "por sessão de atendimento" },
];

const steps: Step[] = [
  {
    title: "Avaliação inicial detalhada",
    description:
      "Cada atendimento começa com uma análise cuidadosa da condição clínica e funcional, além das principais dificuldades do paciente."
  },
  {
    title: "Plano de tratamento individualizado",
    description:
      "A partir da avaliação, é elaborado um plano terapêutico personalizado, de acordo com as necessidades e objetivos de cada caso."
  },
  {
    title: "Sessões com duração de uma hora",
    description:
      "Os atendimentos são realizados com tempo adequado para um acompanhamento completo, seguro e de qualidade."
  },
  {
    title: "Orientações e exercícios para continuidade",
    description:
      "Quando indicado, são prescritos exercícios e orientações para dar continuidade ao tratamento no dia a dia."
  },
  {
    title: "Acompanhamento da evolução",
    description:
      "A evolução do paciente é monitorada continuamente, com ajustes no plano terapêutico sempre que necessário."
  }
];

const testimonialImages = [
  {
    src: "/images/depoimentos/comentario1.png",
    alt: "Avaliação Google 5 estrelas: sofri um acidente, fiquei 60 dias em uma cama, a Dra Adrielly me colocou em pé novamente"
  },
  {
    src: "/images/depoimentos/comentario2.png",
    alt: "Avaliação Google 5 estrelas: meu marido já não usa andador nem bengala, graças à Dra Adrielly Costa"
  },
  {
    src: "/images/depoimentos/comentario3.png",
    alt: "Avaliação Google 5 estrelas: muito atenciosa, paciente e cuidadosa para atender minha mãe"
  }
];

const conditions = [
  "Dificuldade para caminhar ou se movimentar",
  "Perda de força muscular",
  "Alterações de equilíbrio",
  "Risco ou histórico de quedas",
  "Reabilitação após cirurgia",
  "Recuperação após internação",
  "Dores musculares e articulares",
  "Redução da autonomia nas atividades diárias",
  "Artrose, artrite, osteoporose, fibromialgia e doenças reumáticas"
];

const faqs = [
  {
    question: "Vocês atendem por convênio?",
    answer:
      "Apenas atendimento particular."
  },
  {
    question: "A primeira consulta já inclui tratamento?",
    answer:
      "A primeira sessão é focada em avaliação completa."
  },
  {
    question: "Quais regiões de Curitiba são atendidas?",
    answer:
      "Campo Comprido, Vila Izabel, Santa Quitéria, Portão, Fazendinha, Bigorrilho, Água Verde, Mercês, Orleans, São Braz e Seminário. Outras regiões sob consulta."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Fisioterapia CWB",
      url: siteUrl,
      inLanguage: "pt-BR",
      description:
        "Fisioterapia domiciliar para idosos em Curitiba, com foco em recuperação funcional, prevenção de quedas, reabilitação e mobilidade."
    },
    {
      "@type": "MedicalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Adrielly Costa Pontarolo - Fisioterapia Domiciliar",
      url: siteUrl,
      telephone: whatsappNumber,
      image: `${siteUrl}/images/adrielly-perfil.jpg`,
      priceRange: "$$",
      medicalSpecialty: [
        "Fisioterapia domiciliar",
        "Fisioterapia geriátrica",
        "Reabilitação funcional",
        "Fisioterapia ortopédica"
      ],
      identifier: {
        "@type": "PropertyValue",
        name: "CREFITO",
        value: "203589-F"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: "PR",
        addressCountry: "BR"
      },
      areaServed: [
        "Curitiba",
        "Campo Comprido",
        "Vila Izabel",
        "Santa Quitéria",
        "Portão",
        "Fazendinha",
        "Bigorrilho",
        "Água Verde",
        "Mercês",
        "Orleans",
        "São Braz",
        "Seminário"
      ],
      description:
        "Atendimento de fisioterapia domiciliar em Curitiba para idosos, recuperação pós-cirurgia, prevenção de quedas, mobilidade, fortalecimento e autonomia."
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Fisioterapia domiciliar para idosos em Curitiba",
      provider: {
        "@id": `${siteUrl}/#business`
      },
      areaServed: {
        "@type": "City",
        name: city
      },
      serviceType: [
        "Fisioterapia domiciliar",
        "Reabilitação de idosos",
        "Recuperação funcional",
        "Prevenção de quedas",
        "Fisioterapia pós-cirurgia",
        "Fisioterapia para mobilidade e autonomia"
      ],
      description:
        "Plano terapêutico individualizado para idosos no conforto do lar, com foco em segurança, mobilidade, alívio de dores e qualidade de vida."
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* WhatsApp flutuante */}
      <a
        className="floating-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar no WhatsApp"
      >
        WhatsApp
      </a>

      {/* ── Header full-width ─────────────────────────────────────── */}
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-dot" aria-hidden="true" />
            Adrielly Costa – Fisioterapia para Idosos
          </div>
          <nav className="site-nav">
            <a className="nav-link" href="#servicos">Serviços</a>
            <a className="nav-link" href="#sobre">Sobre</a>
            <a className="nav-link" href="#processo">Como funciona</a>
            <a className="nav-link" href="#depoimentos">Depoimentos</a>
            <a className="nav-link" href="#contato">Contato</a>
          </nav>
          <a className="button button-primary button-small" href={whatsappLink}>
            Agendar avaliação
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero – fundo full-width com overlay ──────────────── */}
        <section className="hero" id="inicio">
          <div className="section-inner">
            <div className="hero-copy">
              <span className="kicker kicker-light">
                Fisioterapia domiciliar para idosos em {city}
              </span>
              <h1>
                Atendimento humanizado no{" "}
                <span className="gradient-text">conforto do lar</span>, com foco
                em reabilitação, prevenção de quedas, alívio da dor, ganho de mobilidade e manutenção de autonomia.
              </h1>
              <p>
              Cuidar da saúde na terceira idade é também preservar independência, segurança e qualidade de vida.
              Por isso, o atendimento domiciliar é realizado de forma individualizada, respeitando as necessidades, limitações e objetivos de cada paciente.
              </p>
              <div className="cta-row">
                <a className="button button-primary" href={whatsappLink}>
                  Falar no WhatsApp
                </a>
              </div>
              <ul className="hero-checks">
                <li>Atendimento domiciliar em Curitiba</li>
                <li>Plano terapêutico personalizado</li>
                <li>Acompanhamento contínuo da evolução</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Metrics – fundo verde escuro, full-width ──────────── */}
        <div className="metrics-band">
          <MetricsStrip metrics={metrics} />
        </div>

        {/* ── Serviços – fundo branco ───────────────────────────── */}
        <section className="section-block section-white" id="servicos" data-reveal>
          <div className="section-inner">
            <div className="section-head">
              <h2>Cuidado especializado para diferentes necessidades do idoso</h2>
            </div>
            <ServiceGrid services={services} />
          </div>
        </section>

        {/* ── Visual Band – fundo cinza ─────────────────────────── */}
        <section className="section-block section-gray" data-reveal data-delay="1">
          <div className="section-inner">
            <div className="section-head">
              <span className="kicker">Atendimento domiciliar</span>
              <h2>Cuidado na prática, a cada sessão</h2>
            </div>
          </div>
        </section>

        {/* ── Sobre a profissional – fundo branco ──────────────── */}
        <section className="section-block section-white" id="sobre" data-reveal>
          <div className="section-inner">
            <div className="section-head">
              <span className="kicker">Sobre a profissional</span>
              <h2>Adrielly Costa Pontarolo – Fisioterapeuta</h2>
            </div>
            <div className="about-card">
              <figure className="about-photo">
                <Image
                  src="/images/adrielly-perfil.jpg"
                  alt="Adrielly Costa Pontarolo – Fisioterapeuta"
                  width={440}
                  height={440}
                  className="about-photo-img"
                />
              </figure>
              <div className="about-text">
                <p>
                  Fisioterapeuta desde 2014, com pós-graduação em Traumatologia e
                  Ortopedia Funcional, com atuação voltada à reabilitação de
                  idosos no atendimento domiciliar.
                </p>
                <p>
                  Meu trabalho é direcionado à recuperação da mobilidade,
                  fortalecimento muscular, prevenção de quedas e reabilitação após
                  cirurgias ou internações, sempre respeitando o ritmo e as
                  particularidades de cada paciente.
                </p>
                <p>
                  Acredito que a fisioterapia vai além da recuperação física. Ela
                  contribui para devolver segurança, autonomia e qualidade de
                  vida, além de trazer mais tranquilidade para toda a família.
                </p>
                <span className="about-crefito">CREFITO 203589-F</span>
              </div>
              <div className="about-highlights">
                <div className="about-highlight-item">
                  <strong>+10 anos</strong>
                  <span>de experiência clínica</span>
                </div>
                <div className="about-highlight-item">
                  <strong>Pós-graduada</strong>
                  <span>Traumatologia e Ortopedia Funcional</span>
                </div>
                <div className="about-highlight-item">
                  <strong>Experiência</strong>
                  <span>Reabilitação de idosos domiciliar</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Como funciona – fundo verde claro ────────────────── */}
        <section className="section-block section-green" id="processo" data-reveal>
          <div className="section-inner">
            <div className="section-head">
              <span className="kicker">Como funciona o atendimento</span>
              <h2>Jornada estruturada para evolução clínica consistente</h2>
            </div>
            <div className="process-layout">
              <div className="process-grid">
                {steps.map((step, index) => (
                  <article className="step-card" key={step.title}>
                    <span className="step-index">0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
              <aside className="process-sidecard">
                <h3>Primeiro atendimento com mapa de evolução</h3>
                <p>
                  Você já sai da avaliação com objetivos definidos e próximos
                  passos claros para o seu caso.
                </p>
                <a className="button button-primary" href={whatsappLink}>
                  Quero agendar agora
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Depoimentos – fundo branco ───────────────────────── */}
        <section className="section-block section-white" id="depoimentos" data-reveal>
          <div className="section-inner">
            <div className="section-head">
              <span className="kicker">Avaliações de pacientes e familiares</span>
              <h2>Resultados percebidos no dia a dia</h2>
              <p>
                Veja o que pacientes e familiares dizem sobre o atendimento e os
                resultados alcançados com a fisioterapia domiciliar.
              </p>
            </div>
            <div className="testimonial-grid">
              {testimonialImages.map((item) => (
                <article className="testimonial-screenshot" key={item.alt}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={220}
                    style={{ width: "100%", height: "auto" }}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>


        {/* ── Quando buscar – fundo verde claro ────────────────── */}
        <section className="section-block section-green" id="indicacoes" data-reveal>
          <div className="section-inner">
            <div className="section-head">
              <span className="kicker">Quando buscar atendimento</span>
              <h2>Em quais situações a fisioterapia domiciliar pode ajudar?</h2>
              <p className="section-head-desc">
                O atendimento pode ser indicado para idosos que apresentam:
              </p>
            </div>
            <ul className="conditions-list">
              {conditions.map((cond) => (
                <li key={cond}>{cond}</li>
              ))}
            </ul>
            <a className="button button-primary conditions-cta" href={whatsappLink}>
              Falar no WhatsApp para avaliar meu caso
            </a>
          </div>
        </section>

        {/* ── FAQ – fundo branco ────────────────────────────────── */}
        <section className="section-block section-white" id="faq" data-reveal>
          <div className="section-inner">
            <div className="section-head">
              <span className="kicker">Dúvidas frequentes</span>
              <h2>Informações rápidas antes do seu agendamento</h2>
            </div>
            <div className="faq-grid">
              {faqs.map((item) => (
                <article className="faq-card" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Final – fundo escuro ──────────────────────────── */}
        <section className="section-block section-dark" id="contato" data-reveal>
          <div className="section-inner final-cta-inner">
            <div className="final-cta-text">
              <span className="kicker kicker-light">Agende sua avaliação</span>
              <h2>
                Mais mobilidade, segurança e qualidade de vida no conforto de
                casa
              </h2>
              <p>
                A fisioterapia domiciliar pode ajudar o idoso a recuperar
                movimentos, prevenir quedas e manter sua independência com mais
                segurança. Atendimento em {city}.
              </p>
            </div>
            <div className="cta-row">
              <a className="button button-primary" href={whatsappLink}>
                Falar no WhatsApp
              </a>
              <a className="button button-ghost-light" href={telLink}>
                Ligar para o atendimento
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer full-width ─────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span>Adrielly Costa Pontarolo – Fisioterapeuta</span>
          <span>{city} · Atendimento domiciliar · CREFITO 203589-F</span>
        </div>
      </footer>
    </>
  );
}
