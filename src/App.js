import React, { useState, useEffect} from "react";
import "./App.css";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      console.log(deferredPrompt)
    });
    console.log('useEffect ran')
  })

  const handleInstallClick = () => {
    deferredPrompt.prompt();
  }

  return (
    <div className="App">
      <div className="install-banner" onClick={ () => handleInstallClick() }>
        Clique aqui para adicionar o Bot Boutique à tela principal de seu smarthpone.
      </div>
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
