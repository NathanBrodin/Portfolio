# Dotted Map Migration Plan

## Goal

Migrate animation, curved paths, and add tooltip features from `world-map.tsx` (using `dotted-map`) into `dotted-map.tsx` (using `svg-dotted-map`).

## Files to modify

1. `src/components/ui/dotted-map.tsx` - main component
2. `src/components/my-world-map/index.tsx` - consumer/config

---

## Changes to `src/components/ui/dotted-map.tsx`

### 1. New imports

- Add `motion` from `motion/react`
- Add `React.useRef`, `React.useState`, `React.useCallback`

### 2. Extend `Marker` interface

```ts
interface Marker {
  lat: number
  lng: number
  size?: number
  label?: string // tooltip title
  description?: string // tooltip body
  animated?: boolean // enables ripple animation
}
```

### 3. Add `CurvedPath` interface

```ts
interface CurvedPath {
  start: string // marker label to connect from
  end: string // marker label to connect to
  animated?: boolean
}
```

### 4. Extend `DottedMapProps`

- Add `paths?: CurvedPath[]`
- Add `lineColor?: string` (default `'#0ea5e9'`)

### 5. Add `ProcessedMarker` type

```ts
type ProcessedMarker = {
  x: number
  y: number
  label?: string
  description?: string
  animated?: boolean
  size?: number
}
```

### 6. Add `createCurvedPath` helper (from world-map.tsx)

```ts
function createCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const midX = (start.x + end.x) / 2
  const midY = Math.min(start.y, end.y) - 12
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
}
```

### 7. Component body changes

#### New state/refs

- `containerRef` - ref for the wrapper `<div>` (for tooltip positioning)
- `hoveredMarker` state - which marker is hovered (or null)
- `tooltipPos` state - `{ x, y }` relative to container

#### New helpers

- `getMarkerOffset(marker)` - extracts the stagger offset logic into a reusable callback
- `resolvedPaths` memo - resolves `CurvedPath[]` to projected `{start, end, animated}` using processed markers and their offsets

#### Marker hover handlers

- `handleMarkerHover(marker, event)` - sets hovered marker and computes tooltip position from mouse event relative to container
- `handleMarkerLeave()` - clears hovered marker

#### Render structure change

Wrap the SVG in a `<div ref={containerRef} className="relative">` to position tooltips.

#### SVG additions

1. **Curved paths section** after dots:
   - `<defs>` with `<linearGradient id="path-gradient">` (same gradient from world-map.tsx)
   - For each resolved path: if `animated`, render `<motion.path>` with `pathLength` 0->1 animation; otherwise render static `<path>`

2. **Marker rendering** - wrap each marker in `<g>` with hover handlers:
   - Solid `<circle>` for the marker dot
   - If `marker.animated`: additional `<circle>` with SVG `<animate>` elements for ripple effect (expanding `r` from markerSize to 2, fading opacity from 0.5 to 0, 2s duration, indefinite repeat)

3. **Tooltip** (outside SVG, inside container div):
   - Absolutely positioned `<div>` shown when `hoveredMarker` is set and has a label
   - Uses Tailwind classes: `bg-popover text-popover-foreground pointer-events-none absolute z-50 rounded-md border px-3 py-1.5 text-sm shadow-md`
   - Transform: `translate(-50%, -100%) translateY(-8px)` to position above the cursor
   - Shows `label` as `<p className="font-medium">` and optional `description` as `<p className="text-muted-foreground text-xs">`

---

## Changes to `src/components/my-world-map/index.tsx`

### 1. Add descriptions to markers

Add `description` field to each marker constant (placeholder text for now).

### 2. Set TROMSO as animated

Add `animated: true` to the TROMSO constant.

### 3. Add paths prop

```tsx
<DottedMap
  markers={[TROMSO, KOKKOLA, OSLO, LAVAL, SUNDSVALL]}
  paths={[{ start: 'Tromso', end: 'Oslo', animated: true }]}
  markerColor="var(--primary)"
/>
```

---

## Verification

- `pnpm run check` - format + lint
- `pnpm build` - ensure compilation succeeds
