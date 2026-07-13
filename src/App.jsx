import { useState, useEffect, useRef } from 'react'

function TypeWritter({ textes }) {
  const [index, setIndex] = useState(0)
  const [texte, setTexte] = useState('')
  const [i, setI] = useState(0)

  useEffect(() => {
    if (i < textes[index].length) {
      const timeout = setTimeout(() => {
        setTexte(t => t + textes[index][i])
        setI(i => i + 1)
      }, 100)
    return () => clearTimeout(timeout)
    } else {
      setTimeout(() => {
        setTexte('')
        setI(0)
        setIndex(idx => (idx + 1) % textes.length)
      }, 2000)
    }
  }, [i, index])

  return <span>{texte}<span className='cursor'>|</span></span>
}

function AnimatedSection({ id, children }) {
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible')
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section id={id} ref={ref} className="section-hidden">
            {children}
        </section>
    )
}

function Navbar() {
    const [active, setActive] = useState('hero')
    const [menuOuvert, setMenuOuvert] = useState(false)

    useEffect(() => {
        const sections = document.querySelectorAll('section')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 }
        )
        sections.forEach(s => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    const liens = [
        { id: 'hero', label: 'Home' },
        { id: 'apropos', label: 'À propos' },
        { id: 'formation', label: 'Parcours' },
        { id: 'competences', label: 'Compétences' },
        { id: 'projets', label: 'Projets' },
        { id: 'contact', label: 'Contact' },
    ]

    return (
        <nav className="navbar">
            <span className="navbar-logo">MP</span>
            
            {/* Menu desktop */}
            <ul className="navbar-desktop">
                {liens.map(lien => (
                    <li key={lien.id}>
                        <a
                            href={`#${lien.id}`}
                            className={active === lien.id ? 'nav-active' : ''}
                        >
                            {lien.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Bouton hamburger mobile */}
            <button 
                className="navbar-hamburger"
                onClick={() => setMenuOuvert(!menuOuvert)}
            >
                {menuOuvert ? '✕' : '☰'}
            </button>

            {/* Menu mobile */}
            {menuOuvert && (
                <ul className="navbar-mobile">
                    {liens.map(lien => (
                        <li key={lien.id}>
                            <a
                                href={`#${lien.id}`}
                                className={active === lien.id ? 'nav-active' : ''}
                                onClick={() => setMenuOuvert(false)}
                            >
                                {lien.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}


function App() {
  return (
    <div className="cv">
      <Navbar />
      <section id="hero">
        <h1>Matthieu PIRON</h1>
        <h2>
          <TypeWritter textes={[
            "Développeur Web Full Stack",
            "En formation autodidacte",
            "Designer numérique polyvalent"
          ]} /> 
        </h2>
        <p>En formation</p>
        <a href="#apropos">↓ Découvrir</a>
      </section>
      
      <AnimatedSection id="apropos">
        <h2>À propos</h2>
        <div className='apropos-content'>
          <div className='apropos-texte'>
            <p className='apropos-intro'>
              Profil hybride entre <span className='accent'>créativité</span> et <span className='accent'>technique</span>.
            </p>
            <p>
              Dans la culture du design numérique depuis plus de dix ans maintenant, 
              principalement en prestataire pour l'industrie automobile et sportive.
              Aujourd'hui, je rajoute une corde à mon arc, corde que j'ai souvent approchée mais jamais exploitée.
              Je me forme sur le développement web fullstack pour fusionner mes 
              univers créatifs et techniques dans un nouveau métier.
            </p>
            <p>
              Ce CV est lui-même une démonstration de mes compétences en cours d'acquisition.
            </p>
          </div>
          <div className='apropos-tags'>
            <span className='tag'>CGI artist</span>
            <span className='tag'>3D Design</span>
            <span className='tag'>Conseiller commercial</span>
            <span className='tag'>Dev Web</span>
            <span className='tag'>React</span>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="formation">
        <h2>Parcours</h2>
          <div className='timeline'>
            {[
              {annee: "2025", titre: "Développeur Web Fullstack", lieu: "Studi - En cours", accent: true },
              {annee: "2024", titre: "Conseiller Commercial en véhicule neuf", lieu: "Peugeot"},
              {annee: "2023", titre: "CG Artist - 3D Designer", lieu: "RCD Except - Remote"},
              {annee: "2021", titre: "CG Artist - 3D Configurateur", lieu: "3DCOM Renault - Paris"},
              {annee: "2020", titre: "CG Artist - 3D Designer", lieu: "RCD Except - Guyancourt"},
              {annee: "2018", titre: "CG Artist - Digital Designer Junior", lieu: "Oxelo Decathlon - Lille"},
              {annee: "2016", titre: "CG Artist - 3D Modeleur Surfacique", lieu: "ESTECH - Buc"},
              {annee: "2013", titre: "Technicien Audiovisuel", lieu: "MVision - Clamart"},
            ].map((item, index) => (
              <div className={`timeline-item ${item.accent ? 'accent' : ''}`} key={index}>
                <div className='timeline-annee'>{item.annee}</div>
                <div className='timeline-point'></div>
                <div className='timeline-contenu'>
                  <h3>{item.titre}</h3>
                  <p>{item.lieu}</p>
                </div>
              </div>
            ))}

          </div>
      </AnimatedSection>

      <AnimatedSection id="competences">
        <h2>Compétences</h2>
        <p className='competences-intro'>
          Profil polyvalent, de la création numérique au code en passant par la vente.
          Pas expert en tout, mais compétent en beaucoup.
        </p>
        <div className='competences-grid'>

          {[
            {
              categorie: "Créatif",
              emoji: "🎨",
              items: ["Modélisation 3D", "Rendering", "Animation 3D", "Retouche photo", "Adobe Suite", "Maya / Blender", "VRED / Keyshot", "Lumiscaphe Patchwork 3D" ]  
            },
            {
              categorie: "Technique",
              emoji: "💻",
              items: ["HTML/CSS", "Javascript", "React", "Git / GitHub", "Node.js", "Alias Automotive"]
            },
            {
              categorie: "Commercial",
              emoji: "🤝",
              items: ["Vente et Financement", "Relation clientèle", "Qualité", "Négociation", "Gestion de portefeuille"]
            }
          ].map((col, index) => (
            <div className='competences-col' key={index}>
              <h3>{col.emoji} {col.categorie}</h3>
              <ul>
                {col.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </AnimatedSection>

      <AnimatedSection id="projets">
        <h2>Projets</h2>
        <div className='projet-grid'>
          {[
            {
              categorie: "3D / Design",
              titre: "Configurateur Renault",
              desc: "Modélisation 3D, Rendering et post production pour configurateur automobile.",
              tags: ["Lumiscaphe Patchwork 3D", "Blender", "Maya", "Suite adobe"],
              img: null
            },
            {
              categorie: "3D / Design",
              titre: "Oxelo Decathlon",
              desc: "Digital designer - Modélisation et rendu de produits sportifs et Réalité virtuelle du merch",
              tags: ["Alias","Keyshot","VRED", "Blender"],
              img: null
            },
            {
              categorie: "Dev Web",
              titre: "Cartes de profil",
              desc: "Mini app JS vanilla - fetch depuis une API REST, génération dynamique de cartes.",
              tags: ["Javascript", "Fetch API", "CSS"],
              lien: "https://github.com/wasticodex/cartes-profil"
            },
            {
              categorie: "Dev Web",
              titre: "CV Scrollytelling",
              desc: "Ce CV - construit avec React, useState, UseEffect et animations CSS.",
              tags: ["React", "CSS", "Git"],
              lien: "#hero"
            },
          ].map((projet, index) => (
            <div className='projet-card' key={index}>
              <div className='projet-img'>
                {projet.img
                  ? <img src={projet.img} alt={projet.title} />
                  : <span>Image à venir</span>
                }
              </div>
              <div className='projet-infos'>
                <span className='projet-categories'>{projet.categorie}</span>
                <h3>{projet.titre}</h3>
                <p>{projet.desc}</p>
                <div className='projet-tags'>
                  {projet.tags.map((tag, i) => (
                    <span key={i} className='tag'>{tag}</span>
                  ))}
                </div>
                {projet.lien && (
                  <a href={projet.lien} className='projet-lien' target='_blank'>
                      Voir le projet →
                    </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection id="experiences">
        <h2>Expériences</h2>
      </AnimatedSection>

      <AnimatedSection id="contact">
        <h2>Contact</h2>
        <p className='contact-accroche'>
          Ouvert aux opportunités - profil hybride, créatif et technique en quête de nouveaux défis.
        </p>
        <div className='contact-grid'>
          <a href="mailto:wasticodex@gmail.com" className='contact-item'>
            <span className='contact-icon'>✉</span>
            <div>
              <p className='contact-label'>Email</p>
              <p className='contact-value'>wasti.codex@gmail.com</p>
            </div>
          </a>
          <a href="https://github.com/wasticodex" target='_blank' className='contact-item'>
            <span className='contact-icon'>⌥</span>
            <div>
              <p className='contact-label'>GitHub</p>
              <p className='contact-value'>wasticodex</p>
            </div>
          </a>
          <a href="https://linkedin.com/in/" target='_blank' className='contact-item'>
            <span className='contact-icon'>in</span>
            <div>
              <p className='contact-label'>LinkedIn</p>
              <p className='contact-value'>Matthieu PIRON</p>
            </div>
          </a>
          <div className='contact-item'>
            <span className='contact-icon'>📍</span>
            <div>
              <p className='contact-label'>Localisation</p>
              <p className='contact-value'>France</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default App