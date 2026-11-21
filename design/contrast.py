import sys
import json

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def luminance(r, g, b):
    a = [v / 255.0 for v in (r, g, b)]
    a = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in a]
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]

def contrast_ratio(color1, color2):
    lum1 = luminance(*hex_to_rgb(color1))
    lum2 = luminance(*hex_to_rgb(color2))
    brightest = max(lum1, lum2)
    darkest = min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 contrast.py tokens.json")
        sys.exit(1)

    with open(sys.argv[1], 'r') as f:
        data = json.load(f)

    pairs = data.get("pairs", [])
    failed = False

    print(f"Checking {len(pairs)} contrast pairs against WCAG AA (4.5:1)...")
    for idx, pair in enumerate(pairs):
        fg = pair["fg"]
        bg = pair["bg"]
        context = pair["context"]
        ratio = contrast_ratio(fg, bg)
        status = "PASS" if ratio >= 4.5 else "FAIL"
        if ratio < 4.5:
            failed = True
        print(f"[{status}] Pair {idx+1} ({context}): {ratio:.2f}:1 (fg: {fg}, bg: {bg})")

    if failed:
        print("\nContrast check FAILED one or more WCAG AA requirements.")
        sys.exit(1)
    else:
        print("\nAll contrast pairs PASSED WCAG AA requirements.")
        sys.exit(0)

if __name__ == "__main__":
    main()
