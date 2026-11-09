# Style des illustrations de projets

Toutes les images de `public/assets/images/projects/` suivent le même gabarit,
généré avec Nano Banana. Pour en ajouter une qui s'intègre à la série, colle le
bloc de style **mot pour mot**, puis le sujet.

## Bloc de style (à ne pas modifier)

> A clean technical illustration, 16:9, on a very dark charcoal background
> (#111318). Minimal, editorial, lots of negative space. Flat vector style with
> soft glow. Muted palette: charcoal, off-white, and a single crimson accent
> (#dc2626) — no other colours. No text, no labels, no numbers, no logos, no UI
> chrome. Scientific-paper aesthetic, not a stock illustration. Subject:

## Règles

- **Génère toute une série dans la même session.** Le modèle garde une cohérence
  de rendu d'un prompt au suivant ; quatre sessions séparées donnent quatre styles.
- **Exige « no text ».** Sinon le modèle ajoute des légendes illisibles.
- **Garde le fond sombre.** Un fond clair jure avec le reste de la page.
- **Compresse avant de committer.** Les originaux font ~1,9 Mo ; 1600 px de large
  en JPEG qualité 82 tombe à 30-80 Ko sans perte visible à l'écran :

```python
from PIL import Image
im = Image.open('source.jpeg').convert('RGB')
w, h = im.size
im = im.resize((1600, round(h * 1600 / w)), Image.LANCZOS)
im.save('cible.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
```

## Sujets déjà utilisés

| Fichier | Sujet donné au modèle |
|---|---|
| `graph-drawing.jpg` | a small abstract node-link graph on the left; on the right the same graph redrawn with each node at the centre of a glowing crimson heatmap blob over a faint square pixel grid; a thin crimson arrow between the two |
| `alzheimer.jpg` | three stylised axial brain MRI slices in greyscale, slightly overlapping in depth; on the frontmost, two or three regions glowing with a crimson attribution heatmap |
| `posenet.jpg` | a human figure reduced to a skeleton of joints and bones in thin off-white lines, repeated three times in slightly different poses; each joint a small crimson dot with a faint glow |
| `withub.jpg` | a git branch diagram: a horizontal line of circular commit nodes, two branches splitting off and merging back; one commit node glows crimson and is slightly larger |
| `ecosort.jpg` | three geometric objects in off-white outline (a bottle, a can, a folded box), each enclosed in a thin crimson detection bracket; below, a single crimson map pin |
| `asr.jpg` | an audio waveform running horizontally, irregular and organic on the left, cleaner and more regular toward the right; a soft crimson glow marks the transition |
| `annotheca.jpg` | three stylised paper pages in thin off-white outline, fanned out and slightly overlapping, their lines of text drawn as faint grey strokes; on the frontmost page, one line is marked with a soft crimson highlight and a small square sticky note sits in its corner; from the pages, a few thin off-white lines lead to two minimal folder outlines on the right, one of them glowing crimson |
