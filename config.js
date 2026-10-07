// DM settings: edit this file to change the puzzle.
//
// To set a new solution, open the site, open the browser console and run:
//   encodeSolution(["ᚲ", "ᛟ", "ᚱ", "ᛞ", "ᛏ", "ᚨ"])
// then paste the result into SOLUTION below. Use distinct runes, and keep
// the hints in step with the new answer.
// The default solution is ᚲ ᛟ ᚱ ᛞ ᛏ ᚨ.
const CONFIG = {
  sigils: ["ᚠ", "ᚦ", "ᚱ", "ᚲ", "ᛉ", "ᛟ", "ᛞ", "ᛊ", "ᚨ", "ᛏ"],
  dialCount: 6,
  SOLUTION: "4ZqyfOGbn3zhmrF84ZuefOGbj3zhmqg=",
  inscription: "Six lights sleep behind the sealed door. Wake them in the order the aether remembers.",
  // Shown one per missed pull, in order, then repeating. Hints stay on screen.
  hints: [
    "The first rune is a lone chevron, a single arrowhead pointing left toward the hinge.",
    "The fourth rune is two triangles meeting point to point, like a bowtie lying on its side.",
    "The fifth rune points straight up like a spear, and nothing in the sequence stands taller.",
    "A diamond with its feet planted holds the second place, directly after the chevron.",
    "The third rune wears a loop on its shoulder, and sits between the diamond and the bowtie.",
    "The last rune leans like a branch with two slanted arms, and it comes right after the spear."
  ],
  revealText: "The door swings inward on a breath of cool, humming air. Beyond it, a single sphere of blue light hovers above a stone altar."
};
