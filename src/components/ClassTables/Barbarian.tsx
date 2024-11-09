
import './Barbarian.css';
import { BaseClass } from '../../../src/types/Classes';
import BarbarianData from '../../../src/data/classes/Barbarian.json';
const BarbarianClass = () => {
  const data = BarbarianData;
  return (
    <div className="barbarian-class-container">
      <h1 className="barbarian-class-title">{data.name}</h1>
      <p className="barbarian-class-source">
        Source: {data.source}, Page: {data.page}, Edition: {data.edition}
      </p>
      <h2 className="section-title">Primary Ability</h2>
      <ul>
        {data.primaryAbility.map((ability, idx) => (
          <li key={idx}>{Object.keys(ability)[0].toUpperCase()}</li>
        ))}
      </ul>

      <h2 className="section-title">Class Details</h2>
      {data.class.map((classData, idx) => (
        <div key={idx} className="class-details">
          <h3>Hit Dice</h3>
          <p>
            {classData.hd.number}d{classData.hd.faces}
          </p>
          <h3>Proficiencies</h3>
          <p>{classData.proficiency.join(', ')}</p>
          <h3>Starting Proficiencies</h3>
          <div>
            <p>
              Armor: {classData.startingProficiencies.armor.join(', ')}
            </p>
            <p>
              Weapons: {classData.startingProficiencies.weapons.join(', ')}
            </p>
            <p>
              Skills:{' '}
              {classData.startingProficiencies.skills[0].choose.from.join(', ')}
              {' ('}
              {classData.startingProficiencies.skills[0].choose.count} chosen
              {')'}
            </p>
          </div>

          <h3>Starting Equipment</h3>
          <p>{classData.startingEquipment.entries}</p>

          <h3>Class Table</h3>
          <table className="barbarian-class-table">
            <thead>
              <tr>
                {classData.classTableGroups[0].colLabels.map((label, idx) => (
                  <th key={idx}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classData.classTableGroups[0].rows.map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, cellIdx) =>
                    typeof cell === 'object' && cell.type === 'bonus' ? (
                      <td key={cellIdx}>+{cell.value}</td>
                    ) : (
                      <td key={cellIdx}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Class Features</h3>
          <ul>
            {classData.classFeatures.map((feature, featureIdx) =>
              typeof feature === 'string' ? (
                <li key={featureIdx}>{feature}</li>
              ) : (
                <li key={featureIdx}>{feature.classFeature}</li>
              )
            )}
          </ul>
        </div>
      ))}

      <h2 className="section-title">Subclasses</h2>
      {data.subclass.map((subclassData, idx) => (
        <div key={idx} className="subclass-details">
          <h3>{subclassData.name}</h3>
          <p>Source: {subclassData.source}, Page: {subclassData.page}</p>
          <h4>Features</h4>
          <ul>
            {subclassData.subclassFeatures.map((subFeature, subIdx) => (
              <li key={subIdx}>{subFeature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BarbarianClass;
