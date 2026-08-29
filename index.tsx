import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';

// --- CONFIGURACIÓN DE COLORES Y DATOS ---
const COLORS = {
  red: '#df0139',
  black: '#000000',
  white: '#FFFFFF',
  grey: '#a5acaf',
  lightBg: '#f8f8fa'
};

const PHONE_NUMBER = "51917998121";

// --- COMPONENTES AUXILIARES ---

// Inyector de estilos y fuentes
const StyleInjector = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&display=swap');
    
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background-color: ${COLORS.white}; color: ${COLORS.black}; overflow-x: hidden; }
    h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
    
    .text-red-brand { color: ${COLORS.red}; }
    .bg-red-brand { background-color: ${COLORS.red}; }
    .border-red-brand { border-color: ${COLORS.red}; }
    
    .text-grey-brand { color: ${COLORS.grey}; }
    .bg-grey-brand { background-color: ${COLORS.grey}; }
    
    /* Animaciones personalizadas */
    .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
    .reveal.active { opacity: 1; transform: translateY(0); }
    
    /* Input styles */
    .input-editorial {
      width: 100%; border: none; border-bottom: 1px solid ${COLORS.grey}; padding: 1rem 0; 
      background: transparent; outline: none; transition: border-color 0.3s;
      font-size: 1rem; color: ${COLORS.black};
    }
    .input-editorial:focus { border-bottom-color: ${COLORS.red}; }
    .input-editorial::placeholder { color: ${COLORS.grey}; }
    
    /* Ocultar scrollbar en elementos con scroll horizontal si los hubiera */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}} />
);

// Componente para animar elementos al hacer scroll
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('active'); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Placeholder Estilizado
const Placeholder = ({ text, className = "", height = "h-96" }) => (
  <div className={`w-full bg-[#f0f0f0] border border-[${COLORS.grey}] border-opacity-30 flex items-center justify-center p-8 text-center relative overflow-hidden group ${height} ${className}`}>
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 to-transparent mix-blend-multiply"></div>
    <span className="font-mono text-sm tracking-widest text-gray-500 z-10 relative group-hover:scale-105 transition-transform duration-500">
      [ {text} ]
    </span>
  </div>
);

// Componente Botón
const Button = ({ children, href, variant = 'primary', className = "", onClick, type="button" }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: `bg-black text-white hover:bg-[${COLORS.red}] hover:text-white`,
    secondary: `bg-transparent border-2 border-black text-black hover:bg-black hover:text-white`,
    red: `bg-[${COLORS.red}] text-white hover:bg-black hover:text-white`,
    white: `bg-white text-black hover:bg-black hover:text-white`
  };

  const Component = href ? 'a' : 'button';
  const targetObj = href && (href.startsWith('http') || href.startsWith('mailto')) ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component 
      href={href} 
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...targetObj}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {href && href.startsWith('http') && <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
      </span>
    </Component>
  );
};

// --- COMPONENTES PRINCIPALES (SECCIONES) ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', href: '#inicio' },
    { name: 'PORTAFOLIO', href: '#portafolio' },
    { name: 'SERVICIOS', href: '#servicios' },
    { name: 'CONTACTO', href: '#contacto' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo / Monograma */}
        <a href="#inicio" className="group" onClick={(e) => handleNavClick(e, '#inicio')}>
          <div className="font-serif font-bold text-2xl tracking-tighter flex items-center">
            C<span className="text-red-brand">V</span>
            <span className="ml-3 text-xs font-sans tracking-widest font-normal uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden md:block">
              Cinthya Vasquez
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-semibold tracking-[0.2em] hover:text-red-brand transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-brand group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="primary" className="py-3 px-6 text-xs">
            HABLEMOS
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black z-50 relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 origin-top ${isMobileMenuOpen ? 'opacity-100 visible scale-y-100' : 'opacity-0 invisible scale-y-0'}`}>
        <nav className="flex flex-col items-center gap-8 text-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-serif text-4xl italic hover:text-red-brand transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="red" className="mt-8">
            HABLEMOS
          </Button>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="pt-32 pb-16 min-h-screen flex items-center bg-lightBg">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Texto Left */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal>
              <div className="flex gap-4 items-center mb-8 uppercase text-xs font-bold tracking-widest text-gray-500">
                <span>Diseñadora Gráfica</span>
                <span className="w-8 h-px bg-red-brand"></span>
                <span>Arequipa, Perú</span>
                <span className="w-8 h-px bg-red-brand"></span>
                <span>Portfolio 2026</span>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] font-serif uppercase tracking-tighter mb-8">
                ¡Hola! <br />Soy <span className="italic font-light text-red-brand lowercase">Cinthya</span> <br />Vasquez
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <div className="max-w-xl space-y-6 text-gray-600 text-lg md:text-xl font-light leading-relaxed mb-10">
                <p>Soy una diseñadora gráfica apasionada por la estética visual y la comunicación creativa.</p>
                <p>Me especializo en ilustración, branding y diseño digital, desarrollando piezas visuales que combinan creatividad, funcionalidad y claridad.</p>
                <p>Me motiva seguir aprendiendo, asumir nuevos retos y aportar soluciones visuales que conecten con las personas. ¡Gracias por visitar mi página!</p>
              </div>
            </Reveal>

            <Reveal delay={300} className="flex flex-col sm:flex-row gap-4">
              <Button href="#portafolio" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portafolio').scrollIntoView({ behavior: 'smooth' });
              }}>
                VER PORTAFOLIO
              </Button>
              <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="secondary">
                HABLEMOS
              </Button>
            </Reveal>
          </div>

          {/* Imagen Right */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Reveal delay={200} className="relative w-full h-[60vh] lg:h-[80vh]">
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-red-brand z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 border-2 border-black z-0"></div>
              
              <div className="relative z-10 w-full h-full shadow-2xl">
                <img 
                  src="https://drive.google.com/thumbnail?id=121Q1P8sATVOhmviDnTc3egDV2keYHzge&sz=w1000" 
                  alt="Cinthya Vasquez" 
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-tighter leading-none sticky top-32">
                Creatividad <br/><span className="text-red-brand italic font-light lowercase">con propósito</span>
              </h2>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 space-y-20">
            {/* Educación */}
            <Reveal delay={100}>
              <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400 mb-8 pb-4 border-b border-gray-200">Educación</h3>
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 text-red-brand font-bold font-serif text-xl">2024 — 2025</div>
                  <div className="md:col-span-3">
                    <h4 className="text-2xl font-serif mb-2">Diseño Gráfico Digital Publicitario</h4>
                    <p className="text-gray-500 uppercase text-sm tracking-widest">InfoUNSA | Arequipa, Perú</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 text-red-brand font-bold font-serif text-xl"></div>
                  <div className="md:col-span-3">
                    <h4 className="text-2xl font-serif mb-2">Dash Design Conferencia</h4>
                    <p className="text-gray-500 uppercase text-sm tracking-widest">Creative People | Arequipa, Perú</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 text-red-brand font-bold font-serif text-xl">2026 — 2027</div>
                  <div className="md:col-span-3">
                    <h4 className="text-2xl font-serif mb-2">Marketing Digital</h4>
                    <p className="text-gray-500 uppercase text-sm tracking-widest">InfoUNSA | Arequipa, Perú</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Experiencia */}
            <Reveal delay={200}>
              <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400 mb-8 pb-4 border-b border-gray-200">Experiencia</h3>
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 text-black font-bold font-serif text-xl">2025 — Actual</div>
                  <div className="md:col-span-3">
                    <h4 className="text-2xl font-serif mb-2">Diseñadora Gráfica</h4>
                    <p className="text-gray-500 uppercase text-sm tracking-widest">Fotografía D'Marco | Arequipa, Perú</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Habilidades - Tarjetas Editoriales */}
        <Reveal>
          <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400 mb-12 text-center md:text-left">Áreas de Especialidad</h3>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Branding e Identidad Visual", items: ["Diseño de logotipos", "Desarrollo de identidad visual", "Conceptos de marca", "Piezas gráficas para branding"] },
            { num: "02", title: "Diseño Digital", items: ["Diseño para redes sociales", "Piezas publicitarias", "Ilustración digital"] },
            { num: "03", title: "Diseño Editorial", items: ["Maquetación de piezas gráficas", "Composición tipográfica", "Diseño de material visual"] }
          ].map((skill, idx) => (
            <Reveal key={idx} delay={idx * 150} className="bg-lightBg p-10 border border-gray-100 hover:border-black transition-colors duration-500 group">
              <div className="text-6xl font-serif text-red-brand mb-6">{skill.num}</div>
              <h4 className="text-xl font-bold uppercase tracking-wide mb-6 h-14">{skill.title}</h4>
              <ul className="space-y-3">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <span className="text-red-brand mr-2 mt-1">✦</span>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

const Software = () => {
  const tools = [
    { name: 'Illustrator', badge: 'Ai', percent: 90 },
    { name: 'Photoshop', badge: 'Ps', percent: 95 },
    { name: 'InDesign', badge: 'Id', percent: 85 },
    { name: 'CorelDRAW', badge: 'CD', percent: 80 },
    { name: 'SketchUp', badge: 'SU', percent: 50 },
    { name: 'Office', badge: 'Of', percent: 80 },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <section className="py-24 bg-black text-white" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter leading-[0.9]">
              Herramientas <br/>
              <span className="italic font-light lowercase text-red-brand">que forman parte</span> <br/>
              de mi proceso
            </h2>
          </Reveal>

          <div className="space-y-8">
            {tools.map((tool, idx) => (
              <Reveal key={idx} delay={idx * 100} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* Badge Minimalista */}
                    <div className="w-10 h-10 border border-gray-700 flex items-center justify-center font-serif font-bold text-lg rounded-sm bg-gray-900">
                      {tool.badge}
                    </div>
                    <span className="uppercase tracking-widest text-sm font-semibold">{tool.name}</span>
                  </div>
                  <span className="font-serif text-gray-400">{tool.percent}%</span>
                </div>
                {/* Barra de progreso */}
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-brand transition-all duration-1500 ease-out rounded-full"
                    style={{ width: isVisible ? `${tool.percent}%` : '0%' }}
                  ></div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portafolio" className="py-32 bg-lightBg">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Portafolio */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <Reveal className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter leading-none mb-6">
              Ideas convertidas <br/>
              <span className="italic font-light lowercase text-red-brand">en experiencias</span> visuales
            </h2>
            <p className="text-xl font-light text-gray-600 max-w-xl">
              Una selección de proyectos de diseño gráfico, branding, contenido digital y marketing desarrollados para comunicar, conectar y destacar.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Button href="https://www.behance.net/cinthyavasquez2" variant="secondary">
              VER BEHANCE
            </Button>
          </Reveal>
        </div>

        {/* Galería Asimétrica */}
        <div className="flex flex-col gap-16 md:gap-32">
          
          {/* Proyecto 01 - Grande Izquierda */}
          <Reveal className="group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 overflow-hidden relative">
                <img 
                  src="https://drive.google.com/thumbnail?id=1fbYWfe9dKPGPevN0wuxmbDlQOsO6M0BH&sz=w1000" 
                  alt="Proyecto Branding" 
                  className="w-full h-[50vh] md:h-[70vh] object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-brand rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 lg:pl-8">
                <p className="text-red-brand font-bold uppercase tracking-widest text-xs mb-4">Proyecto 01 / Branding</p>
                <h3 className="text-4xl font-serif uppercase mb-2 group-hover:text-red-brand transition-colors">Identidad Visual</h3>
                <p className="text-gray-500 font-light">Diseño de marca, papelería corporativa y guidelines.</p>
              </div>
            </div>
          </Reveal>

          {/* Proyecto 02 - Mediano Derecha */}
          <Reveal className="group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 lg:col-start-2 order-2 lg:order-1 text-left lg:text-right lg:pr-8">
                <p className="text-red-brand font-bold uppercase tracking-widest text-xs mb-4">Proyecto 02 / Editorial</p>
                <h3 className="text-4xl font-serif uppercase mb-2 group-hover:text-red-brand transition-colors">Diseño y Maquetación</h3>
                <p className="text-gray-500 font-light">Composición tipográfica y estructuración visual para medios impresos.</p>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 overflow-hidden relative">
                <img 
                  src="https://drive.google.com/thumbnail?id=161CmIdmPjGRywBBP0F0VJxjx54mntgXo&sz=w1000" 
                  alt="Proyecto Editorial" 
                  className="w-full h-[50vh] md:h-[60vh] object-cover"
                />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-brand rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Proyecto 03 - Centrado Amplio */}
          <Reveal className="group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-10 lg:col-start-2 overflow-hidden relative">
                <img 
                  src="https://drive.google.com/thumbnail?id=1kQelmlt4UsITRhI-tAyzo_GtBCM6hCeU&sz=w1000" 
                  alt="Proyecto Digital" 
                  className="w-full h-[50vh] md:h-[60vh] object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-brand rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-10 lg:col-start-2 text-center mt-6">
                <p className="text-red-brand font-bold uppercase tracking-widest text-xs mb-4">Proyecto 03 / Diseño Digital</p>
                <h3 className="text-4xl font-serif uppercase mb-2 group-hover:text-red-brand transition-colors">Social Media / Campaign</h3>
                <p className="text-gray-500 font-light">Estrategia visual y creación de contenido para plataformas digitales.</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

const CTAPortfolio = () => (
  <section className="bg-red-brand py-32 text-center text-white">
    <div className="container mx-auto px-6">
      <Reveal>
        <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-serif uppercase tracking-tighter leading-none mb-12">
          ¿Te gusta <br/>
          <span className="italic font-light lowercase text-black">mi trabajo?</span><br/>
          Creemos <br/>algo juntos
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="primary">
            HABLEMOS POR WHATSAPP
          </Button>
          <Button href="https://www.behance.net/cinthyavasquez2" variant="secondary" className="border-white text-white hover:bg-white hover:text-black">
            VER MÁS EN BEHANCE
          </Button>
        </div>
      </Reveal>
    </div>
  </section>
);

const Servicios = () => {
  const graphicServices = [
    { num: '01', name: 'Diseño de Logotipo', desc: 'Creación del identificador principal de tu marca.', pen: '150', usd: '45' },
    { num: '02', name: 'Identidad Visual', desc: 'Manual de marca, paleta de colores, tipografía y papelería.', pen: '350', usd: '100' },
    { num: '03', name: 'Flyer / Pieza Publicitaria', desc: 'Diseño de alto impacto para impresión o digital.', pen: '50', usd: '15' },
    { num: '04', name: 'Pack de 5 Diseños Redes', desc: 'Plantillas o posts finales para Instagram/Facebook.', pen: '120', usd: '35' },
    { num: '05', name: 'Diseño Editorial', desc: 'Maquetación de revistas, catálogos, e-books.', pen: '180', usd: '50' }
  ];

  const marketingServices = [
    { num: '01', name: 'Estrategia de Contenidos', desc: 'Planificación de pilares y objetivos de comunicación.', pen: '250', usd: '70' },
    { num: '02', name: 'Plan de Contenido Mensual', desc: 'Grilla mensual con copys y formatos definados.', pen: '300', usd: '85' },
    { num: '03', name: 'Gestión de Redes Sociales', desc: 'Administración completa, publicación y métricas.', pen: '450', usd: '125' },
    { num: '04', name: 'Meta Ads', desc: 'Creación y optimización de campañas de pago.', pen: '350', usd: '100' },
    { num: '05', name: 'Auditoría Digital', desc: 'Análisis del estado actual de tu marca online.', pen: '180', usd: '50' }
  ];

  const renderServiceRow = (s, type) => {
    const textWsp = encodeURIComponent(`Hola Cinthya, me interesa cotizar el servicio de ${s.name}.`);
    
    return (
      <div key={s.num} className="group border-b border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50 transition-colors px-4 -mx-4">
        <div className="flex items-start md:items-center gap-6 md:w-1/2">
          <span className="font-serif text-xl text-gray-300 group-hover:text-red-brand transition-colors">{s.num}</span>
          <div>
            <h4 className="text-xl font-bold uppercase tracking-wide mb-1 group-hover:text-red-brand transition-colors">{s.name}</h4>
            <p className="text-gray-500 font-light text-sm">{s.desc}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end md:w-1/2 gap-8 pl-12 md:pl-0">
          <div className="text-right">
            <p className="font-serif text-lg">Desde S/ {s.pen}</p>
            <p className="text-xs text-gray-400">Desde US$ {s.usd}</p>
          </div>
          <Button href={`https://wa.me/${PHONE_NUMBER}?text=${textWsp}`} variant="secondary" className="px-6 py-2 text-xs hover:border-red-brand hover:bg-red-brand">
            COTIZAR
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section id="servicios" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        <Reveal className="mb-24 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter leading-none mb-8">
            Diseño que destaca<br/>
            <span className="italic font-light text-red-brand lowercase">Estrategias que</span> conectan
          </h2>
          <p className="text-xl font-light text-gray-600 mb-10 max-w-2xl">
            Creo soluciones creativas de diseño gráfico y marketing digital pensadas para construir marcas, comunicar mejor y conectar con el público adecuado.
          </p>
          <Button href={`https://wa.me/${PHONE_NUMBER}`}>CUÉNTAME TU PROYECTO</Button>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Diseño Gráfico */}
          <Reveal>
            <h3 className="text-2xl font-serif italic mb-10 border-b-2 border-black pb-4 inline-block">Diseño Gráfico</h3>
            <div className="flex flex-col">
              {graphicServices.map(s => renderServiceRow(s))}
            </div>
          </Reveal>

          {/* Marketing Digital */}
          <Reveal delay={200}>
            <h3 className="text-2xl font-serif italic mb-10 border-b-2 border-black pb-4 inline-block">Marketing Digital</h3>
            <div className="flex flex-col">
              {marketingServices.map(s => renderServiceRow(s))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 text-center lg:text-left">
          <p className="text-sm text-gray-400 font-light">* Los precios son referenciales y pueden variar según el alcance específico de cada proyecto.</p>
        </Reveal>

      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', service: '', message: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.service || !formData.message) {
      setError('Por favor, completa todos los campos para continuar.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // ⚠️ URL de Google Apps Script insertada
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOqlWSBNQzXpRRNddFMDwcD4iqvOGRPkhxiwRMggLD_-YjmxtgFr2EAXz9i0PgM7IK/exec'; 
      
      // Enviamos los datos a Google Sheets de fondo
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Evita errores de seguridad en navegadores
        body: JSON.stringify(formData)
      });
      
    } catch (err) {
      console.error("No se pudo guardar el registro en Google Sheets:", err);
    } finally {
      setIsSubmitting(false);
      
      // Armamos y abrimos el mensaje de WhatsApp como siempre
      const message = `Hola Cinthya 👋\n\nMi nombre es: ${formData.name}\nMi contacto es: ${formData.contact}\nEstoy interesado/a en: ${formData.service}\n\nSobre mi proyecto:\n${formData.message}\n\nMe gustaría recibir más información.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
      
      // Limpiamos el formulario una vez enviado
      setFormData({ name: '', contact: '', service: '', message: '' });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const socialLinks = [
    { name: 'WhatsApp', desc: 'Conversemos', url: `https://wa.me/${PHONE_NUMBER}` },
    { name: 'Instagram', desc: '@oliver.vc2309', url: 'https://www.instagram.com/oliver.vc2309/' },
    { name: 'Behance', desc: 'Ver mi trabajo', url: 'https://www.behance.net/cinthyavasquez2' },
    { name: 'LinkedIn', desc: 'Conectemos', url: 'https://www.linkedin.com/in/cinthya-vc-10474b281/' }
  ];

  return (
    <section id="contacto" className="bg-lightBg py-32">
      <div className="container mx-auto px-6 md:px-12">
        
        <Reveal className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-serif uppercase tracking-tighter leading-none mb-6">
            Hablemos <br/>
            <span className="italic font-light text-red-brand lowercase">de tu próximo</span><br/>
            proyecto
          </h2>
          <p className="text-xl font-light text-gray-600 max-w-2xl mx-auto">
            ¿Tienes una idea, una marca o un proyecto en mente? Cuéntame brevemente qué necesitas y conversemos sobre cómo podemos trabajarlo juntos.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto bg-white p-10 md:p-16 shadow-sm border border-gray-100">
          
          {/* Formulario */}
          <Reveal>
            <h3 className="text-3xl font-serif uppercase mb-10">Cuéntame sobre tu proyecto</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Nombre</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre" className="input-editorial" />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Medio de contacto</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Correo electrónico o WhatsApp" className="input-editorial" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Servicio de interés</label>
                <select name="service" value={formData.service} onChange={handleChange} className="input-editorial appearance-none rounded-none bg-transparent cursor-pointer">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Diseño gráfico">Diseño gráfico general</option>
                  <option value="Branding">Branding / Identidad Visual</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Marketing Digital">Marketing Digital</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="Otro">Otro proyecto</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Detalles del proyecto</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Cuéntame brevemente qué necesitas..." rows="4" className="input-editorial resize-none"></textarea>
              </div>

              {error && <p className="text-red-brand text-sm">{error}</p>}
              
              <Button type="submit" variant="primary" className="w-full">
                {isSubmitting ? 'PROCESANDO...' : 'ENVIAR PROYECTO'}
              </Button>
            </form>
          </Reveal>

          {/* Contacto Directo */}
          <Reveal delay={200} className="lg:border-l lg:border-gray-200 lg:pl-16 flex flex-col justify-center">
            <h3 className="text-3xl font-serif uppercase mb-10">¿Prefieres contactarme directamente?</h3>
            <div className="space-y-6">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between pb-6 border-b border-gray-100 hover:border-black transition-colors"
                >
                  <div>
                    <h4 className="text-xl font-bold uppercase tracking-wide group-hover:text-red-brand transition-colors">{link.name}</h4>
                    <p className="text-gray-500 font-light">{link.desc}</p>
                  </div>
                  <ArrowUpRight className="text-gray-300 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="bg-red-brand py-32 text-center text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
    <div className="container mx-auto px-6 relative z-10">
      <Reveal>
        <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-serif uppercase tracking-tighter leading-none mb-12">
          Una buena idea <br/>
          puede empezar con <br/>
          <span className="italic font-light lowercase text-black block mt-4">un simple hola</span>
        </h2>
        <Button href={`https://wa.me/${PHONE_NUMBER}`} variant="primary" className="bg-black hover:bg-white hover:text-black shadow-2xl">
          HABLEMOS
        </Button>
      </Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white py-16">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12 mb-8">
        
        <div>
          <div className="font-serif font-bold text-2xl tracking-tighter mb-4">
            C<span className="text-red-brand">V</span>
          </div>
          <p className="uppercase tracking-widest text-sm font-semibold mb-1">Cinthya Vasquez</p>
          <p className="text-gray-500 font-light text-sm mb-1">Diseñadora Gráfica</p>
          <p className="text-gray-500 font-light text-sm">Arequipa, Perú</p>
        </div>

        <div className="flex flex-col gap-4 text-center md:text-left">
          {['Inicio', 'Portafolio', 'Servicios', 'Contacto'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white uppercase tracking-widest text-xs transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-center md:text-right">
          <a href="https://www.instagram.com/oliver.vc2309/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-brand transition-colors text-sm">Instagram</a>
          <a href="https://www.behance.net/cinthyavasquez2" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-brand transition-colors text-sm">Behance</a>
          <a href="https://www.linkedin.com/in/cinthya-vc-10474b281/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-brand transition-colors text-sm">LinkedIn</a>
          <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-brand transition-colors text-sm">WhatsApp</a>
        </div>

      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-widest">
        <p>© 2026 Cinthya Vasquez. Diseño Gráfico & Marketing Digital</p>
        <p className="font-serif italic capitalize text-gray-400">Creatividad · Estrategia · Diseño</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="antialiased selection:bg-red-brand selection:text-white">
      <StyleInjector />
      <Header />
      <main>
        <Hero />
        <About />
        <Software />
        <Portfolio />
        <CTAPortfolio />
        <Servicios />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}