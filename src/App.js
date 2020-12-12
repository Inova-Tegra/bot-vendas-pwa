import React, { useEffect } from "react";
import InstallButton from "./InstallButton";
import FeedbackIcons from "./FeedbackIcons";
import "./App.css";

function App() {

  const configWatsonChat = async () => {
    const chatBtn = await findWatsonChatBtn();
    initiateWatsonResponseFormatter();
    setTimeout(autoOpenChat(chatBtn), 500);
  }

  const findWatsonChatBtn = async () => {
    const chatBtn = document.querySelector('#WACLauncher__Button');
    if (chatBtn) {
      return chatBtn;
    } else {
      await new Promise(r => setTimeout(r, 250));
      return findWatsonChatBtn();
    }
  }
  
  // FORMATAR RESPOSTAS VINDAS DO WATSON DISCOVERY, PARA QUE TENHAM QUEBRA DE LINHA E SEJAMENTENDIDAS COMO CÓDIGO HTML E NÃO APENAS COMO UMA STRING
  const initiateWatsonResponseFormatter = () => {
    const targetNode = document.querySelector('#WACContainer');
    const config = { attributes: true, childList: true, subtree: true };

    const formatResponse = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            if (mutation.target.id === 'WAC__messages') {
              let watsonRes = mutation.target.querySelector('.WAC__searchResult--padding');
              const watsonLongRes = mutation.target.querySelector('.WAC__searchResponseBody');
              if (watsonLongRes) watsonRes = watsonLongRes;

              if (watsonRes) {
                watsonRes.innerHTML = watsonRes.innerHTML.split('\n').map(content=> `<p>${content}</p>`).join(' ')
                                                         .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
              }
            }
        }
    };

    const observer = new MutationObserver(formatResponse);
    observer.observe(targetNode, config);
  }

  // if app has already been installed, automatically open chat, for better user ux (needs less click to start conversation)
  const autoOpenChat = (chatBtn) =>{
    if (window.matchMedia('(display-mode: standalone)').matches) {
      chatBtn.click();
    }
  }

  useEffect(() => {
    configWatsonChat();
  });
  
  return (
    <div className="App">
      <InstallButton />
      <div className="App-content">
        <div>
          <h1>Bot Boutique</h1>
          <p>O bot do Home Boutique.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
