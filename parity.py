#!/usr/bin/env python3
"""
Calculate feature parity score for an app clone based on the features.csv

Expected format (columns):
feature,area,priority,original,clone,notes

Scoring:
- Must (priority="must"): weight = 3
- Should (priority="should"): weight = 2
- Could (priority="could"): weight = 1

Counts:
- yes: full weight
- partial: half weight
- no: 0 weight

Rows with "skip" (in clone column) are excluded from scoring.
Rows where "original" is "no" are excluded from scoring.
Rows where "clone" is "no" are excluded from scoring.
"""

import csv
import json
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Optional

def parse_features(csv_path: Path) -> List[Dict[str, str]]:
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        return list(reader)

def calculate_scores(features: List[Dict[str, str]]) -> Tuple[float, Dict[str, Dict]]:
    total_weight = 0.0
    achieved_weight = 0.0
    area_scores: Dict[str, Dict] = {}

    for row in features:
        original = row['original']
        clone = row['clone']
        priority = row['priority']

        if original == 'no' or clone == 'no' or clone == 'skip':
            continue

        # Determine weight based on priority
        if priority == 'must':
            weight = 3.0
        elif priority == 'should':
            weight = 2.0
        elif priority == 'could':
            weight = 1.0
        else:
            weight = 0.0

        total_weight += weight

        # Determine achieved weight
        if clone == 'yes':
            achieved_weight += weight
        elif clone == 'partial':
            achieved_weight += weight / 2.0

        # Track by area
        area = row['area']
        if area not in area_scores:
            area_scores[area] = {'total': 0.0, 'achieved': 0.0}

        area_scores[area]['total'] += weight
        if clone == 'yes':
            area_scores[area]['achieved'] += weight
        elif clone == 'partial':
            area_scores[area]['achieved'] += weight / 2.0

    score = (achieved_weight / total_weight * 100) if total_weight > 0 else 0.0

    return score, area_scores

def get_missing_features(features: List[Dict[str, str]]) -> List[Dict[str, str]]:
    missing = []

    for row in features:
        if row['original'] == 'no' or row['clone'] == 'no' or row['clone'] == 'skip':
            continue

        if row['clone'] != 'yes':
            missing.append(row)

    return missing

def print_results(score: float, area_scores: Dict, missing: List[Dict], args: any, all_features: List[Dict]):
    print(f"Feature Parity Score: {score:.1f}%")

    print("\nArea Scores:")
    for area, scores in area_scores.items():
        area_score = (scores['achieved'] / scores['total'] * 100) if scores['total'] > 0 else 0
        print(f"  {area}: {area_score:.1f}%")

    # Sort areas by score (worst first)
    sorted_areas = sorted(area_scores.items(), key=lambda x: (x[1]['achieved'] / x[1]['total'] * 100) if x[1]['total'] > 0 else 0)

    print("\nAreas (worst first):")
    for area, scores in sorted_areas:
        area_score = (scores['achieved'] / scores['total'] * 100) if scores['total'] > 0 else 0
        print(f"  {area}: {area_score:.1f}%")

    print("\nMissing Features (in build order):")
    for row in missing:
        status = row['clone']
        priority = row['priority']
        print(f"  {priority.upper()}: {row['feature']} - {row['notes']}")

    print(f"\nMust-haves done: {sum(1 for row in all_features if row['priority'] == 'must' and row['clone'] == 'yes')}/{sum(1 for row in all_features if row['priority'] == 'must')}")

    # Determine shippability
    must_haves_done = sum(1 for row in all_features if row['priority'] == 'must' and row['clone'] == 'yes')
    total_must_haves = sum(1 for row in all_features if row['priority'] == 'must')
    shippable = must_haves_done == total_must_haves and score >= 80.0

    if shippable:
        print("\nVerdict: Shippable ✓")
    else:
        if must_haves_done < total_must_haves:
            print("\nVerdict: NOT SHIPPABLE (missing must-haves)")
        elif score < 80.0:
            print("\nVerdict: NOT SHIPPABLE (feature score below 80%)")
        else:
            print("\nVerdict: NOT SHIPPABLE (missing S1/S2 bugs)")

    # Quick summary
    print(f"\nSummary:")
    print(f"  - Total features: {len([r for r in all_features if r['original'] == 'yes' and r['clone'] != 'no' and r['clone'] != 'skip'])}")
    print(f"  - Completed features: {sum(1 for r in all_features if r['clone'] == 'yes')}")
    print(f"  - Partially completed features: {sum(1 for r in all_features if r['clone'] == 'partial')}")
    print(f"  - Not implemented features: {sum(1 for r in all_features if r['clone'] == 'no')}")
    print(f"  - Skipped features: {sum(1 for r in all_features if r['clone'] == 'skip')}")

def main():
    import argparse

    parser = argparse.ArgumentParser(description='Calculate feature parity score')
    parser.add_argument('csv_file', help='Path to features.csv')
    parser.add_argument('--visual', action='store_true', help='Visual diff mode (placeholder)')
    parser.add_argument('--markdown', action='store_true', help='Output markdown format')
    parser.add_argument('--json', action='store_true', help='Output JSON format')

    args = parser.parse_args()

    csv_path = Path(args.csv_file)
    if not csv_path.exists():
        print(f"Error: {csv_path} not found")
        sys.exit(1)

    features = parse_features(csv_path)
    score, area_scores = calculate_scores(features)
    missing = get_missing_features(features)

    if args.json:
        # Output in JSON format for downstream processing
        result = {
            'score': score,
            'areas': area_scores,
            'missing': missing,
            'must_haves_done': sum(1 for row in features if row['priority'] == 'must' and row['clone'] == 'yes'),
            'total_must_haves': sum(1 for row in features if row['priority'] == 'must'),
            'shippable': sum(1 for row in features if row['priority'] == 'must' and row['clone'] == 'yes') == sum(1 for row in features if row['priority'] == 'must') and score >= 80.0
        }
        print(json.dumps(result, indent=2))
    else:
        print_results(score, area_scores, missing, args, features)

if __name__ == '__main__':
    main()
