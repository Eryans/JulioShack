import { Button, Image } from 'react-bootstrap'
import Wrapper from '../../components/Wrapper'
import { Link } from 'react-router-dom'

const LostPage = () => {
  return <Wrapper style={{marginBottom:'4em'}}>

    <h1>Alors comme ça on s'est perdu jeune freluquet ?</h1>
    <Image
    src="https://risibank.fr/cache/medias/0/0/70/7012/full.jpeg"
    width={400}
    />
    <h1>Et oui t'as l'air un peu con...</h1>
    <br/>
    <br/>
    <h2>Mais ne t'inquiète pas ça arrive à tout le monde</h2>
    <Image
    src="https://risibank.fr/cache/medias/0/2/236/23633/full.png"
    width={400}
    />
    <h3>Ce n'est pas le jour de la séléction naturelle pour toi</h3>
    <Link to="/" ><Button>Allez hop hop hop clique ici pour revenir à l'accueil</Button></Link>
  </Wrapper>
}

export default LostPage
