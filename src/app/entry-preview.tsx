import { createRoot } from "react-dom/client";
import { bootstrapLiveApp } from "@/shared/lib/bootstrap.client";
import { loadDesignManifest } from "@/designs/registry";
import { PreviewPage } from "@/pages/preview/preview-page";
import { LoadingScreen } from "@/shared/ui/loading-screen";
import "@/shared/styles/tailwind.css";
import "@/shared/styles/app.css";

function getRootElement(): HTMLElement {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Missing #root mount point.");
  }
  return root;
}

const root = createRoot(getRootElement());

root.render(<LoadingScreen />);

const bootstrap = await bootstrapLiveApp();
const manifest = await loadDesignManifest(bootstrap.designId);

root.render(<PreviewPage bootstrap={bootstrap} initialManifest={manifest} />);
