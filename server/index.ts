import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import 'dotenv/config';
import * as storage from "./storage";




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// DELETE donation
app.delete("/api/donations/:id", async (req, res) => {
  try {
    await storage.deleteDonation(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete donation" });
  }
});

// DELETE volunteer
app.delete("/api/volunteers/:id", async (req, res) => {
  try {
    await storage.deleteVolunteer(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete volunteer" });
  }
});

// DELETE contact message
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await storage.deleteContact(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message" });
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
 const port = process.env.PORT || 5000;
server.listen(port, () => {
  log(`serving on port ${port}`);
});
})();
