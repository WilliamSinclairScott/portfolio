import React from 'react';
import { Box, Flex, Text, Container, Grid } from '@radix-ui/themes';

export interface CharacterSheetHeaderProps {
  characterName: string;
  background: string;
  species: string;
  characterClass: string;
  subclass: string;
  level: number;
  xp: number;
  armorClass: number;
  shield: number;
  currentHP: number;
  tempHP: number;
  maxHP: number;
  spentHitDice: number;
  maxHitDice: number;
  deathSavesSuccesses: number;
  deathSavesFailures: number;
}

const CharacterSheetHeader: React.FC<CharacterSheetHeaderProps> = ({
  characterName,
  background,
  species,
  characterClass,
  subclass,
  level,
  xp,
  armorClass,
  shield,
  currentHP,
  tempHP,
  maxHP,
  spentHitDice,
  maxHitDice,
  deathSavesSuccesses,
  deathSavesFailures,
}) => {
  return (
    <Container size="4">
      <Box
        style={{
          border: '2px solid var(--gray-7)',
          borderRadius: 'var(--radius-3)',
          padding: 'var(--space-3)',
          background: 'var(--gray-2)',
          position: 'relative',
        }}
      >
        <Grid columns="3" gap="3">
          <Box style={{ gridColumn: 'span 2' }}>
            <Grid columns="3" gap="2">
              <Box style={{ gridColumn: 'span 3' }}>
                <InputField label="CHARACTER NAME" value={characterName} />
              </Box>
              <InputField label="BACKGROUND" value={background} />
              <InputField label="SPECIES" value={species} />
              <InputField label="CLASS" value={characterClass} />
              <InputField label="SUBCLASS" value={subclass} />
              <CircleField label="LEVEL" value={level} />
            </Grid>
          </Box>
          <Box>
            <Grid columns="2" gap="2">
              <StatBox label="ARMOR CLASS" value={armorClass} />
              <StatBox label="SHIELD" value={shield} />
              <Box style={{ gridColumn: 'span 2' }}>
                <Text size="1" weight="bold">HIT POINTS</Text>
                <Flex gap="1">
                  <StatBox label="CURRENT" value={currentHP} />
                  <StatBox label="TEMP" value={tempHP} />
                  <StatBox label="MAX" value={maxHP} />
                </Flex>
              </Box>
              <Box>
                <Text size="1" weight="bold">HIT DICE</Text>
                <Flex gap="1">
                  <StatBox label="SPENT" value={spentHitDice} />
                  <StatBox label="MAX" value={maxHitDice} />
                </Flex>
              </Box>
              <Box>
                <Text size="1" weight="bold">DEATH SAVES</Text>
                <Flex gap="1">
                  <StatBox label="SUCC" value={deathSavesSuccesses} />
                  <StatBox label="FAIL" value={deathSavesFailures} />
                </Flex>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Text size="1" style={{ position: 'absolute', bottom: '-8px', right: 'var(--space-3)', background: 'var(--gray-2)', padding: '0 var(--space-1)' }}>
          XP: {xp}
        </Text>
        <Text size="2" weight="bold" style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gray-2)', padding: '0 var(--space-2)' }}>
          DUNGEONS & DRAGONS
        </Text>
      </Box>
    </Container>
  );
};

const InputField: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <Box>
    <Text size="1" weight="bold">{label}</Text>
    <Box style={{ border: '1px solid var(--gray-7)', borderRadius: 'var(--radius-2)', padding: 'var(--space-1)' }}>
      <Text size="2">{value}</Text>
    </Box>
  </Box>
);

const CircleField: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <Box style={{ textAlign: 'center' }}>
    <Text size="1" weight="bold">{label}</Text>
    <Box style={{ 
      width: '40px', 
      height: '40px', 
      borderRadius: '50%', 
      border: '2px solid var(--gray-7)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      margin: '0 auto',
      background: 'var(--gray-1)'
    }}>
      <Text size="3" weight="bold">{value}</Text>
    </Box>
  </Box>
);

const StatBox: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <Box style={{ textAlign: 'center' }}>
    <Text size="1">{label}</Text>
    <Box style={{ 
      border: '1px solid var(--gray-7)', 
      borderRadius: 'var(--radius-2)', 
      padding: 'var(--space-1)',
      background: 'var(--gray-1)'
    }}>
      <Text size="2">{value}</Text>
    </Box>
  </Box>
);

export default CharacterSheetHeader;