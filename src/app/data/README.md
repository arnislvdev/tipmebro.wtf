# Fortunes Data

This directory contains the fortunes data for the terminal's `fortune` command.

## Adding New Fortunes

To add new fortunes, simply edit `fortunes.json` and add new strings to the array. For example:

```json
[
  "Your existing fortune here...",
  "Your new fortune here...",
  "Another new fortune here..."
]
```

## Format

- Each fortune should be a string
- Keep fortunes concise and positive
- Avoid special characters that might break JSON formatting
- You can use apostrophes and quotes, just make sure to escape them properly

## Example

```json
[
  "A beautiful, smart, and loving person will be coming into your life.",
  "You will be successful in your work.",
  "Your dreams are worth your best efforts to achieve them."
]
```

The terminal will automatically pick a random fortune from this list when the `fortune` command is used.
