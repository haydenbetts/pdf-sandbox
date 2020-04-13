export default `
:root {
    --color-mbox : rgba(0,0,0,0.2);
    --margin: 4px;
  }
  
  [contenteditable]:focus {
      outline: 0px solid transparent;
  }
  
  #controls {
    display: none;
  }
  
  @media screen {
  
    body {
      background-color: whitesmoke;
    }
  
    .pagedjs_page {
      background-color: #fdfdfd;
      margin: calc(var(--margin) * 4) var(--margin);
      flex: none;
      box-shadow: 0 0 0 1px var(--color-mbox);
    }
  
    .pagedjs_pages {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-start;
      transform-origin: top;
      transform: scale(.5) translate(100px, 0px);
      margin: 0 auto;
    }
  
    #controls {
      margin: 20px 0;
      text-align: center;
      display: block;
    }
  
    .pagedjs_first_page {
      /* margin-left: calc(50% + var(--margin)); */
    }
  }
  
  @media screen {
    .debug .pagedjs_margin-top .pagedjs_margin-top-left-corner,
    .debug .pagedjs_margin-top .pagedjs_margin-top-right-corner {
      box-shadow: 0 0 0 1px inset var(--color-mbox);
    }
  
    .debug .pagedjs_margin-top > div {
      box-shadow: 0 0 0 1px inset var(--color-mbox);
    }
  
    .debug .pagedjs_margin-right > div {
      box-shadow: 0 0 0 1px inset var(--color-mbox);
    }
  
    .debug .pagedjs_margin-bottom .pagedjs_margin-bottom-left-corner,
    .debug .pagedjs_margin-bottom .pagedjs_margin-bottom-right-corner {
      box-shadow: 0 0 0 1px inset var(--color-mbox);
    }
  
    .debug .pagedjs_margin-bottom > div {
      box-shadow: 0 0 0 1px inset var(--color-mbox);
    }
  
    .debug .pagedjs_margin-left > div {
      box-shadow: 0 0 0 1px inset var(--color-mbox);
    }
  }
  `