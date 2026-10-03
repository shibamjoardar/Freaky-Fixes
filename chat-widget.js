(function () {
  const widget = document.createElement('div');
  widget.id = 'chat-widget';
  widget.className = 'chat-collapsed';
  widget.innerHTML = `
    <div id="chat-header">
      <i class="fa-solid fa-comment-dots" id="chat-icon" aria-hidden="true"></i>
      <span class="chat-title">AI support chat</span>
      <button type="button" id="chat-toggle" aria-label="Open AI support chat">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>
    <iframe src="https://www.chatbase.co/chatbot-iframe/59T6n2pFwMGj5iQpC78PK"
            title="Freaky Fixes AI support chat" loading="lazy"></iframe>
  `;
  document.body.appendChild(widget);

  const header = widget.querySelector('#chat-header');
  const toggleBtn = widget.querySelector('#chat-toggle');

  function setOpen(open) {
    widget.classList.toggle('chat-collapsed', !open);
    toggleBtn.setAttribute('aria-label', open ? 'Minimize chat' : 'Open AI support chat');
  }

  // Single pointer-event flow for drag + click, works for mouse and touch alike.
  let dragging = false, moved = false, startX = 0, startY = 0, offsetX = 0, offsetY = 0;
  const THRESHOLD = 6;

  function onPointerDown(e) {
    dragging = true;
    moved = false;
    startX = e.clientX;
    startY = e.clientY;
    const rect = widget.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    widget.style.left = `${rect.left}px`;
    widget.style.top = `${rect.top}px`;
    widget.style.right = 'auto';
    widget.style.bottom = 'auto';
    header.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    if (!moved && (Math.abs(e.clientX - startX) > THRESHOLD || Math.abs(e.clientY - startY) > THRESHOLD)) {
      moved = true;
      widget.classList.add('dragging');
    }
    if (!moved) return;
    const maxX = window.innerWidth - widget.offsetWidth - 8;
    const maxY = window.innerHeight - widget.offsetHeight - 8;
    widget.style.left = `${Math.min(Math.max(8, e.clientX - offsetX), Math.max(8, maxX))}px`;
    widget.style.top = `${Math.min(Math.max(8, e.clientY - offsetY), Math.max(8, maxY))}px`;
  }

  function onPointerUp() {
    if (dragging && !moved) {
      setOpen(widget.classList.contains('chat-collapsed'));
    }
    dragging = false;
    moved = false;
    widget.classList.remove('dragging');
  }

  header.addEventListener('pointerdown', onPointerDown);
  header.addEventListener('pointermove', onPointerMove);
  header.addEventListener('pointerup', onPointerUp);
  header.addEventListener('pointercancel', onPointerUp);

  // Lets other parts of the page (e.g. the "Open AI chat" button) open the widget.
  window.openFreakyChat = () => setOpen(true);
})();