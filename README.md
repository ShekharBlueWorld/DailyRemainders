# Daily Reminders

A small evening-plan app. This first version is a notes page that saves to your browser.

Later versions can add Gmail follow-ups and Android notifications. Those are not in this step.

## Files

- `index.html` — page structure: heading, form, and notes list
- `style.css` — layout and mobile-friendly styling
- `app.js` — save, load, and delete notes with `localStorage`

## Run it on your computer

You only need a browser. No install, no Node.js.

1. Open a terminal in this folder.
2. Start a local server:

```bash
python3 -m http.server 8000
```

3. In your browser, open [http://localhost:8000](http://localhost:8000).

On a phone on the same Wi-Fi, you can also try `http://YOUR-COMPUTER-IP:8000`.

To stop the server, press `Ctrl+C` in the terminal.

Notes stay in this browser after you refresh. They are not uploaded anywhere.
