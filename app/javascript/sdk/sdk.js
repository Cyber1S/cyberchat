export const SDK_CSS = `
:root {
  --b-100: #F2F3F7;
}

.c1chat-widget-holder {
  box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
  opacity: 1;
  will-change: transform, opacity;
  transform: translateY(0);
  overflow: hidden !important;
  position: fixed !important;
  transition: opacity 0.2s linear, transform 0.25s linear;
  z-index: 2147483000 !important;
}

.c1chat-widget-holder.c1chat-widget-holder--flat {
  box-shadow: none;
  border-radius: 0;
  border: 1px solid var(--b-100);
}

.c1chat-widget-holder iframe {
  border: 0;
  height: 100% !important;
  width: 100% !important;
  max-height: 100vh !important;
}

.c1chat-widget-holder.has-unread-view {
  border-radius: 0 !important;
  min-height: 80px !important;
  height: auto;
  bottom: 94px;
  box-shadow: none !important;
  border: 0;
}

.c1chat-widget-bubble {
  background: #1f93ff;
  border-radius: 100px;
  border-width: 0px;
  bottom: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .16) !important;
  cursor: pointer;
  height: 64px;
  padding: 0px;
  position: fixed;
  user-select: none;
  width: 64px;
  z-index: 2147483000 !important;
}

.c1chat-widget-bubble.c1chat-widget-bubble--flat {
  border-radius: 0;
}

.c1chat-widget-holder.c1chat-widget-holder--flat {
  bottom: 90px;
}

.c1chat-widget-bubble.c1chat-widget-bubble--flat {
  height: 56px;
  width: 56px;
}

.c1chat-widget-bubble.c1chat-widget-bubble--flat img {
  margin: 16px;
}

.c1chat-widget-bubble.c1chat-widget-bubble--flat.c1chat--close::before,
.c1chat-widget-bubble.c1chat-widget-bubble--flat.c1chat--close::after {
  left: 28px;
  top: 16px;
}

.c1chat-widget-bubble.unread-notification::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4040;
  border-radius: 100%;
  top: 0px;
  right: 0px;
  border: 2px solid #ffffff;
  transition: background 0.2s ease;
}

.c1chat-widget-bubble.c1chat-widget--expanded {
  bottom: 24px;
  display: flex;
  height: 48px !important;
  width: auto !important;
  align-items: center;
}

.c1chat-widget-bubble.c1chat-widget--expanded div {
  align-items: center;
  color: #fff;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  padding-right: 20px;
  width: auto !important;
}

.c1chat-widget-bubble.c1chat-widget--expanded img {
  height: 20px;
  margin: 14px 8px 14px 16px;
  width: 20px;
}

.c1chat-widget-bubble.c1chat-elements--left {
  left: 20px;
}

.c1chat-widget-bubble.c1chat-elements--right {
  right: 20px;
}

.c1chat-widget-bubble:hover {
  background: #1f93ff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .4) !important;
}

.c1chat-widget-bubble img {
  all: revert;
  height: 24px;
  margin: 20px;
  width: 24px;
}

@media only screen and (min-width: 667px) {
  .c1chat-widget-holder.c1chat-elements--left {
    left: 20px;
 }
  .c1chat-widget-holder.c1chat-elements--right {
    right: 20px;
 }
}

.c1chat--close:hover {
  opacity: 1;
}

.c1chat--close::before, .c1chat--close::after {
  background-color: #fff;
  content: ' ';
  display: inline;
  height: 24px;
  left: 32px;
  position: absolute;
  top: 20px;
  width: 2px;
}

.c1chat--close::before {
  transform: rotate(45deg);
}

.c1chat--close::after {
  transform: rotate(-45deg);
}

.c1chat--hide {
  bottom: -100vh !important;
  transform: translateY(40px);
  top: unset !important;
  opacity: 0;
  visibility: hidden !important;
  z-index: -1 !important;
}

.c1chat-widget--without-bubble {
  bottom: 20px !important;
}

@media only screen and (max-width: 667px) {
  .c1chat-widget-holder {
    height: 100%;
    right: 0;
    top: 0;
    width: 100%;
 }

 .c1chat-widget-holder iframe {
    min-height: 100% !important;
  }


 .c1chat-widget-holder.has-unread-view {
    height: auto;
    right: 0;
    width: auto;
    bottom: 0;
    top: auto;
    max-height: 100vh;
    padding: 0 8px;
  }

  .c1chat-widget-holder.has-unread-view iframe {
    min-height: unset !important;
  }

 .c1chat-widget-holder.has-unread-view.c1chat-elements--left {
    left: 0;
  }

  .c1chat-widget-bubble.c1chat--close {
    bottom: 60px;
    opacity: 0;
    visibility: hidden !important;
    z-index: -1 !important;
  }
}

@media only screen and (min-width: 667px) {
  .c1chat-widget-holder {
    border-radius: 16px;
    bottom: 104px;
    height: calc(85% - 64px - 20px);
    max-height: 590px !important;
    min-height: 250px !important;
    width: 400px !important;
 }
}
`;
