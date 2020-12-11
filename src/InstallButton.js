import React, { useEffect, useState } from "react";


const InstallButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const pwaHandler = e => {
    e.preventDefault();
    setSupportsPWA(true);
    setPromptInstall(e);
  };
  
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", pwaHandler);
    return () => window.removeEventListener("transitionend", pwaHandler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <button
      className="install-btn"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      INSTALAR
    </button>
  );
};

export default InstallButton;