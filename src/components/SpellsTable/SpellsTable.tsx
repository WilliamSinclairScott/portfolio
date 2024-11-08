import { useState, useEffect } from "react";
import spellsData from "../../data/spells-xphb.json"; // Adjust the path as needed
import { Spell, Duration } from "../../types/Spell";
import "./SpellsTable.css";

export default function SpellsPage() {
  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    // Ensure data structure matches expected format
    //TODO: FIx any types
    if (spellsData && Array.isArray(spellsData.spell)) {
      const transformedSpells = spellsData.spell.map((spell: any) => {
        // Transform the duration property if necessary
        const transformedDuration: Duration[] = spell.duration.map((d: any) => {
          switch (d.type) {
            case "instant":
              return { type: "instant" };
            case "permanent":
              return { type: "permanent" };
            case "timed":
              return {
                type: "timed",
                duration: {
                  type: d.duration.type,
                  amount: d.duration.amount,
                },
                concentration: d.concentration,
              };
            case "special":
              return { type: "special" };
            default:
              throw new Error(`Unknown duration type: ${d.type}`);
          }
        });
        return { ...spell, duration: transformedDuration };
      });
      setSpells(transformedSpells);
    } else {
      console.error('Invalid data format');
    }
  }, []);

  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  const handleSort = (key: keyof Spell) => {
    let sortedSpells = [...spells];

    if (sortOrder === "none" || sortOrder === "desc") {
      sortedSpells.sort((a, b) => {
        const aValue = a[key] !== undefined ? a[key] : '';
        const bValue = b[key] !== undefined ? b[key] : '';
  
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      });
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      sortedSpells.sort((a, b) => {
        const aValue = a[key] !== undefined ? a[key] : '';
        const bValue = b[key] !== undefined ? b[key] : '';
  
        if (aValue < bValue) return 1;
        if (aValue > bValue) return -1;
        return 0;
      });
      setSortOrder("desc");
    } else {
      sortedSpells = spellsData.spell.map((spell: any) => {
        const transformedDuration: Duration[] = spell.duration.map((d: any) => {
          switch (d.type) {
            case "instant":
              return { type: "instant" };
            case "permanent":
              return { type: "permanent" };
            case "timed":
              return {
                type: "timed",
                duration: {
                  type: d.duration.type,
                  amount: d.duration.amount,
                },
                concentration: d.concentration,
              };
            case "special":
              return { type: "special" };
            default:
              throw new Error(`Unknown duration type: ${d.type}`);
          }
        });
        return { ...spell, duration: transformedDuration };
      });
      setSortOrder("none");
    }

    setSpells(sortedSpells);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const renderRange = (spell: Spell) => {
    const { type, distance } = spell.range;

    if (typeof distance === "object" && distance !== null) {
      if ("amount" in distance && "type" in distance) {
        return `${distance.amount} ${distance.type}`;
      }
      switch (distance.type) {
        case "self":
          return "Self";
        case "touch":
          return "Touch";
        case "sight":
          return "Sight";
        case "unlimited":
          return "Unlimited";
        default:
          return type;
      }
    }

    if (typeof distance === "string") {
      return distance;
    }

    return type;
  };

  const filteredSpells = spells.filter((spell) =>
    spell.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFullSchoolName = (school: string) => {
    switch (school) {
      case "A":
        return "Abjuration";
      case "C":
        return "Conjuration";
      case "D":
        return "Divination";
      case "E":
        return "Enchantment";
      case "V":
        return "Evocation";
      case "I":
        return "Illusion";
      case "N":
        return "Necromancy";
      case "T":
        return "Transmutation";
      default:
        return school;
    }
  };

  const handleSpellSelection = (spell: Spell) => {
    console.log("Selected Spell:", spell);
    setSelectedSpell(spell);
  };

  return (
    <div className="container">
      <h1>Spells</h1>
      <input
        type="text"
        placeholder="Search spells..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="spells-table">
        <div className="spells-table-container">
          <table>
            <thead>
              <tr>
                {[
                  { key: "name", label: "Name", className: "col-name" },
                  { key: "level", label: "Level", className: "col-level" },
                  { key: "time", label: "Time", className: "col-time" },
                  { key: "school", label: "School", className: "col-school" },
                  {
                    key: "concentration",
                    label: "C.",
                    className: "col-concentration",
                  },
                  { key: "range", label: "Range", className: "col-range" },
                  { key: "source", label: "Source", className: "col-source" },
                ].map(({ key, label, className }) => (
                  <th
                    key={key}
                    className={className}
                    onClick={() => handleSort(key as keyof Spell)}
                  >
                    <div className="header-content">
                      {label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSpells.map((spell, index) => (
                <tr key={index} onClick={() => handleSpellSelection(spell)}>
                  <td className="col-name">{spell.name}</td>
                  <td className="col-level">{spell.level}</td>
                  <td className="col-time">
                    {spell.time.map((t) => `${t.number} ${t.unit}`).join(", ")}
                  </td>
                  <td className="col-school">
                    {getFullSchoolName(spell.school)}
                  </td>
                  <td className="col-concentration">
                    {spell.duration.some(
                      (d) => d.type === "timed" && d.concentration
                    )
                      ? "Yes"
                      : "No"}
                  </td>
                  <td className="col-range">{renderRange(spell)}</td>
                  <td className="col-source">{spell.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedSpell && (
        <div className="spell-detail">
          <button
            className="back-button"
            onClick={() => setSelectedSpell(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to List
          </button>
          <h2>{selectedSpell.name}</h2>
          <div className="spell-header">
            <div>
              <span>Level:</span> {selectedSpell.level}
            </div>
            <div>
              <span>School:</span> {getFullSchoolName(selectedSpell.school)}
            </div>
            <div>
              <span>Time:</span>{" "}
              {selectedSpell.time
                .map((t) => `${t.number} ${t.unit}`)
                .join(", ")}
            </div>
            <div>
              <span>Range:</span> {renderRange(selectedSpell)}
            </div>
            <div>
              <span>Components:</span> {selectedSpell.components.v ? "V" : ""}
              {selectedSpell.components.s ? ", S" : ""}
              {selectedSpell.components.m
                ? `, M (${selectedSpell.components.m})`
                : ""}
            </div>
            <div>
              <span>Duration:</span>{" "}
              {selectedSpell.duration
                .map((d: any) => {
                  switch (d.type) {
                    case "instant":
                      return "Instant";
                    case "timed":
                      return `${d.duration.amount} ${d.duration.type}`;
                    case "concentration":
                      return `Concentration, up to ${d.duration.amount} ${d.duration.type}`;
                    case "special":
                      return "Special";
                    default:
                      return d.type;
                  }
                })
                .join(", ")}
            </div>
            <div>
              <span>Concentration:</span>{" "}
              {selectedSpell.duration.some(
                (d) => d.type === "timed" && d.concentration
              )
                ? "Yes"
                : "No"}
            </div>
          </div>
          <div className="spell-description">
            <p>{selectedSpell.entries.join(" ")}</p>
            {selectedSpell.entriesHigherLevel &&
              
              selectedSpell.entriesHigherLevel.type === "entries" && (
                <p>{selectedSpell.entriesHigherLevel.entries.join(" ")}</p>
              )}
          </div>
          <div className="spell-footer">
            <span>
              <span>Source:</span> {selectedSpell.source}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}