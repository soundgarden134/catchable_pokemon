import { Container } from 'react-bootstrap';
import { OBTAINABILITY_OPTIONS } from '../constants';
import '../styles.css'




export default function CatchOptionsInfo() {

    const separatorIndex = 'EV';
    const obtainableOptions: any = {};
    const unobtainableOptions: any = {};
    for (const [key, value] of Object.entries(OBTAINABILITY_OPTIONS)) {
        if (key <= separatorIndex) {
            obtainableOptions[key] = value;
        } else {
            unobtainableOptions[key] = value;
        }
    }

    return (
        <Container className="obtainability-options-container">
            <Container className="pokemon-games-container">
                <Container className="obtainability-subgroup">
                    <h3>Obtainable in game</h3>
                    <ul>
                        {Object.entries(obtainableOptions).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </Container>
                <Container className="obtainability-subgroup">
                    <h3>Unobtainable in game</h3>
                    <ul>
                        {Object.entries(unobtainableOptions).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </Container>
            </Container>
        </Container>
    );
}