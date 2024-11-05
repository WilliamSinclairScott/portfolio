import "./DandD.css";
import CharacterSheetHeader, { CharacterSheetHeaderProps } from "../../components/CharacterSheetHeader";

export default function DandD() {

  const props: CharacterSheetHeaderProps = {
    characterName: "William Scott",
    characterClass: "Software Engineer",
    level: 1,
    xp: 0,
    background: "Background",
    species: "Species",
    subclass: "Subclass",
    armorClass: 10,
    shield: 0,
    currentHP: 10,
    tempHP: 0,
    maxHP: 10,
    spentHitDice: 0,
    maxHitDice: 1,
    deathSavesSuccesses: 0,
    deathSavesFailures: 0,
  };

  return (
    <div className="charater-sheet">
      <div className="character-information">
        <CharacterSheetHeader {...props} />
      </div>
      <div className="EverythingElse">
        <div className="statistics-proficiencies">
          <div className="training-proficiencies"></div>
          <div className="heroic-inspiration"></div>
          <div className="constitution"></div>
          <div className="charisma"></div>
          <div className="dexterity"></div>
          <div className="wisdom"></div>
          <div className="strength"></div>
          <div className="intelligence"></div>
          <div className="proficiency-bonus"></div>
        </div>
        <div className="weapons-features-traits">
          <div className="weapons-cantrips"></div>
          <div className="class-features"></div>
          <div className="species-traits"></div>
          <div className="Feats"></div>
        </div>
      </div>
    </div>
  );
}
