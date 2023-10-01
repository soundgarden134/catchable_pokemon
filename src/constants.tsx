
export const OBTAINABILITY_OPTIONS = {
  C: "The Pokémon can be caught in-game.",
  S:
    "The Pokémon can be caught in-game, but is only available at certain non-fixed times (e.g. Pokémon found through swarms or changing Pokémon in the Trophy Garden and Great Marsh). In Pokémon Colosseum and Pokémon XD, this instead means Pokémon can be snagged. In Pokémon Sun, Moon, Ultra Sun and Ultra Moon, this instead means Pokémon can be caught through the Island Scan.",
  D:
    "In Pokémon Diamond, Pearl, and Platinum, the Pokémon can be caught in-game via dual-slot mode. In Pokémon Sword and Shield, the Pokémon can be caught in-game via a Max Raid Battle at a Pokémon Den.",
  R: "The Pokémon can be received from someone (such as starter Pokémon, revived Fossil, in-game trade or gift).",
  E:
    "The Pokémon cannot be caught in-game, but an earlier evolutionary stage can be obtained. It can be evolved into the Pokémon in this game. This may also be used as a suffix for other methods to indicate that the Pokémon must be evolved from a Pokémon caught using that method.",
  B:
    "The Pokémon cannot be caught in-game, but a later evolutionary stage can be obtained. It can be bred to produce the Pokémon in this game; this may also involve evolving the hatched Pokémon. This may also be used as a suffix for other methods to indicate that the Pokémon must be bred from a Pokémon caught using that method.",
  CD:
    "The Pokémon can be caught in-game, but is only accessible through paid DLC. 'D' may also be used as a suffix for other methods to indicate that it can only be obtained through that method in paid DLC.",
  DA:
    "In Pokémon Sword and Shield's The Crown Tundra DLC, the Pokémon can be caught in-game via a Max Raid Battle during a Dynamax Adventure in the Max Lair.",
  CC:
    "The Pokémon is obtainable in-game but requires some form of communication with another core series game in order to obtain it. This may also be used as a prefix for other methods to indicate that the Pokémon requires a specific method after communicating with another game.",
  FS: "In Pokémon X and Y, the Pokémon can only be caught through the Friend Safari.",
  EV:
    "The Pokémon can be caught in-game, but only using an item obtained exclusively via event distribution (such as the Eon Ticket).",
  PW:
    "The Pokémon is available via the Pokéwalker and can be transferred to Pokémon HeartGold and SoulSilver.",
  DR:
    "The Pokémon is available via Dream Radar and can be transferred to Pokémon Black 2 and White 2.",
  DW:
    "The Pokémon was available via Dream World and could be transferred to Pokémon Black, White, Black 2 and White 2 before it was shut down.",
  ET:
    "The Pokémon cannot be caught in-game, but an earlier evolutionary stage can be obtained. It can be evolved into the Pokémon in this game by trading. 'T' may also be used as a suffix for other methods to indicate that the Pokémon must be evolved through trading from a Pokémon caught using that method.",
  T: "This Pokémon can be obtained only by trading it from another game or transferring it from a game in a previous generation.",
  "—": "This Pokémon is unobtainable in this game.",
};

export const POKEMON_GAMES = [
  "Red", "Green", "Blue", "Yellow", "Gold", "Silver", "Crystal", "Ruby", "Sapphire", "Fire Red", "Leaf Green", "Emerald", "Colosseum", "Gale Of Darkness", "Diamond", "Pearl", "Platinum", "Heart Gold", "Soul Silver", "Black", "White", "Black 2", "White 2", "X", "Y", "Omega Ruby", "Alpha Sapphire", "Sun", "Moon", "Ultra Sun", "Ultra Moon", "Let's Go Pikachu", "Let's Go Eevee", "Sword", "Shield", "Brilliant Diamond", "Shining Pearl", "Legends Arceus", "Scarlet", "Violet"
];

export interface PokemonData {
  Generation: string;
  Number: number;
  Name: string;
  Red: string;
  Green: string;
  Blue: string;
  Yellow: string;
  Gold: string;
  Silver: string;
  Crystal: string;
  Ruby: string;
  Sapphire: string;
  FireRed: string;
  LeafGreen: string;
  Emerald: string;
  Colosseum: string;
  GaleOfDarkness: string;
  Diamond: string;
  Pearl: string;
  Platinum: string;
  HeartGold: string;
  SoulSilver: string;
  Black: string;
  White: string;
  Black2: string;
  White2: string;
  X: string;
  Y: string;
  OmegaRuby: string;
  AlphaSapphire: string;
  Sun: string;
  Moon: string;
  UltraSun: string;
  UltraMoon: string;
  LetsGoPikachu: string;
  LetsGoEevee: string;
  Sword: string;
  Shield: string;
  BrilliantDiamond: string;
  ShiningPearl: string;
  LegendsArceus: string;
  Scarlet: string;
  Violet: string;
}
