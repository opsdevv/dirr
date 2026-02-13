# PDF Viewer with Comments

Share a link to your PDF. Anyone can view it and leave comments. Comments are stored in a **JSON file** on the server (no database).

## Quick start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Open in browser**
   - On this machine: [http://localhost:3000](http://localhost:3000)
   - To share with others on your network: use your PC’s IP and port, e.g. `http://192.168.1.100:3000`

## Sharing the link

- **Same Wi‑Fi:** Others can open `http://YOUR_IP:3000` (replace `YOUR_IP` with your computer’s local IP from `ipconfig`).
- **From another machine on the internet:** You’d need port forwarding on your router or a tunnel (e.g. [ngrok](https://ngrok.com)) pointing to port 3000.

## Where things are stored

- **Comments:** `comments.json` in this folder (created when the first comment is posted).
- **PDF:** `program.pdf` in this folder. You can replace it with another PDF and keep the same link.

## Optional: different port

```bash
PORT=4000 npm start
```

Then open `http://localhost:4000` (or the same with your IP when sharing).
