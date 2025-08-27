
// MiniCord - simple offline chatbot logic
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const canned = [
  {patterns: ['hello','hi','hey'], reply: "Hey — I'm MiniCord 🤖. Ask me anything. Try: 'help'."},
  {patterns: ['howareyou','how are you'], reply: "I'm code, so energy levels are stable. How are you?"},
  {patterns: ['help'], reply: "I'm offline and simple. Try: 'hello', 'joke', 'about', or ask me to repeat something."},
  {patterns: ['joke'], reply: "Why did the developer go broke? Because he used up all his cache."},
  {patterns: ['about'], reply: "MiniCord — a lightweight offline PWA chatbot. Built to be added to your home screen."},
];

function appendMessage(text, cls){
  const el = document.createElement('div');
  el.className = 'message ' + cls;
  el.textContent = text;
  chatContainer.appendChild(el);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getResponse(input){
  const s = input.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
  if(!s) return "Say something — I'm listening!";
  for(const item of canned){
    for(const p of item.patterns){
      if(s.includes(p)) return item.reply;
    }
  }
  // simple echo / small talk
  if(s.startsWith('repeat ')) return s.replace(/^repeat\s+/,'');
  if(s.includes('?')) return "That's an interesting question. I'm simple offline — try asking 'help' for commands.";
  return "I don't have a response for that yet. Try 'help' to see hints.";
}

sendBtn.addEventListener('click', () => {
  const text = userInput.value.trim();
  if(!text) return;
  appendMessage(text, 'user');
  userInput.value = '';
  setTimeout(()=>{
    appendMessage(getResponse(text), 'bot');
  }, 450);
});

userInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') sendBtn.click();
});

// small welcome
appendMessage("Hey — I'm MiniCord. Type 'help' to get started.", 'bot');
