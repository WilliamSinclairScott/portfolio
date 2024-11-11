import "./Barbarian.css";

import BarbarianData from "../../../src/data/classes/Barbarian.json";
import { Table } from "@radix-ui/themes";

const ClassOverviewTable = () => {
  const data = BarbarianData;
  const featureByLevel: string[][] = [];
  data.class.classFeatures.forEach((feature) => {
    if (typeof feature === "string") {
      const levelMatch = feature.match(/\d+$/);
      if (levelMatch) {
        const level = parseInt(levelMatch[0], 10) - 1;
        if (!featureByLevel[level]) {
          featureByLevel[level] = [];
        }
        featureByLevel[level].push(feature);
      }
    }
  });

  const numberToPlace = (num: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = num % 100;
    return (
      num + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
    );
  };
  return (
    //  Class Tabe
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Level</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Proficiency Bonus</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Features</Table.ColumnHeaderCell>
          {data.class.classTableGroups.colLabels.map((label, idx) => (
            <Table.ColumnHeaderCell key={idx}>{label}</Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.class.classTableGroups.rows.map((row, idx) => (
          <Table.Row key={idx}>
            <Table.Cell>{numberToPlace(idx + 1)}</Table.Cell>
            <Table.Cell>
              {/* Proficiency Bonus parsing logic here */}
            </Table.Cell>
            <Table.Cell>
              {featureByLevel[idx]
                ? featureByLevel[idx]
                    .map((feature) => feature.split("|")[0])
                    .join(", ")
                : ""}
            </Table.Cell>
            {row.map((cell, cellIdx) => (
              <Table.Cell key={cellIdx}>
                {typeof cell === "object" ? JSON.stringify(cell) : cell}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ClassOverviewTable;
