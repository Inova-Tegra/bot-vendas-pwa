# Bot Vendas PWA
O Bot Vendas é uma aplicação que permite interações com dois tipos de interfaces: uma é via whatsapp e a outra é via um Progressive Web App. Esse repósitório, escrito em React, contém o código dessa segunda interface.

O projeto é escrito em React e é basicamente uma aplicação front-end que carrega o plugin do Watson Assistant e o exibe na tela. Além disso, ele tem as configurações necessárias apra ser um PWA, ou seja, para que possa ser instalado em browser modernos.

<br/>
<br/>

## Testando na sua máquina
Para rodar a aplicação na sua máquina:
```shell
yarn install # installs dependencies

yarn start # starts the server
```

<br/>
<br/>
<br/>

## Configurando o Watson Assistant
No arquivo `public/index.html`, adicionamos uma tag `<script>` que vai carregar o plugin do Watson e configurá-lo:
```js
// primeiro configuramos as opções do watson como um atributo de window
window.watsonAssistantChatOptions = {
  integrationID: "adadwadwadwadwa", // The ID of this integration.
  region: "us-south", // The region your integration is hosted in.
  serviceInstanceID: "wadawdawdwaawddwadwa", // The ID of your service instance.
  disclaimer: {isOn: true, disclaimer: 'Política', disclaimerHTML: `A Tegra utiliza cookies e outras tecnologias semelhantes para melhorar sua experiência <br> de acordo com nossa<a target="_blank" href="https://www.tegraincorporadora.com.br/politicaprivacidade/" style="color:#FCBF2A"> Política de Privacidade</a>. Ao continuar navegando, você aceita estas condições.`},
  onLoad: async function(instance) { 
    instance.on({ type: 'customResponse', handler: customResponseHandler });
    instance.render();
    updateBotTexts(); 
  }
};

// definimos um timeout que vai incluir o plugin do Watson Assistant
setTimeout(function(){
  const t=document.createElement('script');
  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
  document.head.appendChild(t);
});
```
<br/>

No código acima, vemos que o `watsonAssistantChatOptions` define uma callback function `onLoad` que será rodada toda vez que uma nova mensagem do Watson Assistant for enviada para nossa aplicação. Essa função define três ações: 
```js
onLoad: async function(instance) { 
  // ao receber respostas do Watson Assistant do tipo customResponse, rodar código customResponseHandler
  instance.on({ type: 'customResponse', handler: customResponseHandler });

  // renderizar resposta do Watson Assistant
  instance.render();

  // customiza botões e labels do bot (por exemplo, traduzindo textos default do plugin que não são customizáveis)
  updateBotTexts(); 
}
```

<br/>
<br/>

### customResponse
> Você pode aprender mais sobre respostas customizadas na [documentação do Watson Assistant](https://web-chat.global.assistant.watson.cloud.ibm.com/docs.html?to=tutorials-user-defined-response).


 As respostas do Watson Assistant vêm no seguinte formato:
```js
response_type: 'text'          // resposta padrão do Watson Assistant
response_type: 'search'        // resposta vinda da busca na base de dados do Watson Discovery
response_type: 'user_defined'  // resposta definida pelo usuário com um valor customizado (nesse caso, usado apenas pelo bot PWA)
```
Mensagens do tipo `user_defined` são entendidas pela aplicação como sendo do tipo `customResponse` e disparam a função `customResponseHandler()`. No caso, usamos esse handler para enviar uma mensagem vazia com o template `get_feedback` e customizamos a mensagem vaiza para exibir os botões de feedback. Esses botões enviam feedback dos usuários para a Plataforma Digital.

Temos umas série de funções no arquivo `public/index.html` que são responsáveis por essa customização:
```js
customResponseHandler()
handleFeedbackTemplate()
handleFeedback()
getPreviousMsgs()
getMsgDiv()
sendFeedback()
```

<br/>
<br/>

### updateBotTexts()
A função `updateBotTexts()` irá customizar os textos que são exibidos no bot, principlamente traduzindo alguns botões e labels. Esse código é altamente quebrável, pois procura os elementos pelos seus ids e classes - coisas que podem mudar a qualquer instante se houver alteração no plugin do Watson Assistant. De qualquer forma, o risco compensa pois, se quebrar, não impede o uso da aplicação. E, enquanto funciona, melhora a UX.

Temos umas série de funções no arquivo `public/index.html` que são responsáveis por essa customização:
```js
updateBotTexts()
updateBotHomeTexts()
updateBotDisclaimerTexts()
```

