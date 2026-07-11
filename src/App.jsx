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