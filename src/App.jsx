import { useState, useEffect, use } from 'react'

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

function App() {
  return (
    <div className="cv">
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
      
      <section id="a propos">
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
      </section>

      <section id="formation">
        <h2>Formation</h2>
      </section>

      <section id="competences">
        <h2>Projets</h2>
      </section>

      <section id="experiences">
        <h2>Expériences</h2>
      </section>

      <section id="contact">
        <h2>Contact</h2>
      </section>
    </div>
  )
}

export default App