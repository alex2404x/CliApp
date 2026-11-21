# Component Specifications

## Button
  variants  primary, secondary, ghost, danger
  sizes     sm 32px, md 40px, lg 48px
  states    default, hover, active, focus-visible (2px ring, accent), disabled, loading
  tokens    bg accent, text on-accent, radius md, font sm/600
  a11y      real <button>, visible focus, loading keeps the label for screen readers
  used on   S01, S02, S03, S04

## Plan Card
  variants  standard, featured
  sizes     md
  states    default, hover
  tokens    bg surface, border border, radius md
  a11y      semantic card wrapper, descriptive headings
  used on   S02

## Input Field
  variants  text, number
  sizes     md 40px
  states    default, focus, error, disabled
  tokens    bg surface, border border-input, radius sm
  a11y      associated label, aria-invalid for errors
  used on   S03, S04

## Data Metric Tile
  variants  standard
  sizes     md
  states    default
  tokens    bg surface, text-muted heading
  a11y      meaningful data labels
  used on   S05
