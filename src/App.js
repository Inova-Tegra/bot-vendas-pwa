import React, { useState, useEffect } from "react";
import InstallButton from "./InstallButton";
import "./App.css";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleInstallClick = () => {
    console.log("clicked!");
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("listened beforeinstallprompt");
    });
  });

  return (
    <div className="App">
      <InstallButton />
      <header className="App-header">
        <div>
          <h1>Bot Boutique</h1>
          <p>Um chatbot da Tegra.</p>
        </div>
      </header>
    </div>
  );
}

export default App;
