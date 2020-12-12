import React, { useState } from "react";
import InstallButton from "./InstallButton";
import "./App.css";

function FeedbackIcons() {
  // { feedback === 'negative' ? 'cancel' : 'highlight_off' }
  // { feedback === 'positive' ? 'check_circle' : 'check_circle_outline' }

  const handleClick = (feedbackText) => {
    console.log(feedbackText)
  }

  return (
    `<div class='feedback-container' data-feedback='null'>
        <p>Essa resposta foi útil?</p>
        <span 
          class="material-icons material-icons-red clickable" 
          onclick="(e) => handleFeedbackClick(e, 'negative', 'cancel')" 
        >
          highlight_off
        </span>
        
        <span 
          class="material-icons material-icons-red clickable" 
          onclick="(e) => handleFeedbackClick(e, 'positive', 'check_circle')" 
        >
          check_circle_outline
        </span>
    </div>`
  );
}

export default FeedbackIcons;
