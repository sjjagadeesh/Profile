# Playground: how to add a screen

1. Drop your image (PNG/JPG/WebP, ~1600px wide) into `playground/img/`.
2. Add an entry to `playground/screens.json`:

```json
[
  {
    "title": "Approvals inbox, redesigned",
    "image": "img/approvals-inbox.png",
    "problem": "One line: what was wrong or unclear.",
    "takeaway": "One line: the decision this screen shows.",
    "tags": ["Enterprise", "Tables"],
    "date": "2026-11"
  }
]
```

3. Commit and push. Vercel redeploys and `playground.html` shows the new screen (newest first by `date`).

Rules: original, unbranded screens only. No client or product names, no real data (see NDA/accuracy rules).
