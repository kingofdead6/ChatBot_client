// Chatbot.jsx
import React, { useEffect, useRef, useState } from 'react';
import bot from '../assets/bot.svg';
import user from '../assets/user.svg';
import sendIcon from '../assets/send.svg';

const Chatbot = () => {
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); 
  let loadInterval;

  useEffect(() => {
    const form = formRef.current;
    const chatContainer = chatContainerRef.current;

    if (!form || !chatContainer) return;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
      form.reset();

      const uniqueId = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      const messageDiv = document.getElementById(uniqueId);
      loader(messageDiv);

      try {
        console.log('Sending POST request to http://localhost:5000');
        const response = await fetch('http://localhost:5000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: data.get('prompt')
          })
        });

        clearInterval(loadInterval);
        messageDiv.innerHTML = " ";

        if (response.ok) {
          const data = await response.json();
          const parsedData = data.bot.trim();
          typeText(messageDiv, parsedData);
        } else {
          const err = await response.json();
          console.error('Server Error:', err);
          messageDiv.innerHTML = "Something went wrong";
          alert(err.error || 'Unknown error');
        }
      } catch (err) {
        clearInterval(loadInterval);
        messageDiv.innerHTML = "Network error";
        console.error('Fetch Error:', err);
        alert('Failed to connect to server');
      }
    };

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    });

    return () => {
      form.removeEventListener('submit', handleSubmit);
      form.removeEventListener('keyup', handleSubmit);
    };
  }, [isOpen]); 

  function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
      element.textContent += '.';
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }

  function typeText(element, text) {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  }

  function chatStripe(isAi, value, uniqueId) {
    return `
        <div class="wrapper ${isAi ? 'ai' : ''} flex ${isAi ? 'justify-start' : 'justify-end'} mb-4">
            <div class="chat flex items-start max-w-[85%] ${isAi ? 'flex-row' : 'flex-row-reverse'}">
                <div class="profile mx-2">
                    <img 
                        src="${isAi ? bot : user}" 
                        alt="${isAi ? 'bot' : 'user'}" 
                        class="w-10 h-10 rounded-full border-2 border-[rgba(147,51,234,0.5)] shadow-[0_0_6px_rgba(147,51,234,0.8)]"
                    />
                </div>
                <div 
                    class="message p-4 rounded-xl ${
                      isAi 
                        ? 'bg-[rgba(31,41,55,0.9)] text-[#D8B4FE] shadow-[0_0_12px_rgba(147,51,234,0.6)]' 
                        : 'bg-[rgba(147,51,234,0.9)] text-white shadow-[0_0_12px_rgba(147,51,234,0.8)]'
                    }" 
                    id="${uniqueId}"
                >${value}</div>
            </div>
        </div>
    `;
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-[#9333EA] text-white rounded-full shadow-[0_0_15px_rgba(147,51,234,0.7)] hover:bg-[#7E22CE] transition-all duration-300 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[400px] h-[600px] flex flex-col bg-[rgba(17,24,39,0.95)] rounded-2xl shadow-[0_0_25px_rgba(147,51,234,0.5)] z-50 overflow-hidden border border-[rgba(147,51,234,0.3)]">
          {/* Header */}
          <div className="p-4 bg-[rgba(31,41,55,0.9)] border-b border-[rgba(147,51,234,0.3)] flex justify-between items-center">
            <h2 className="text-[#D8B4FE] font-semibold text-lg">Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#D8B4FE] hover:text-[#9333EA] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div
            ref={chatContainerRef}
            id="chat-container"
            className="flex-1 overflow-y-auto p-4"
          ></div>

          {/* Form */}
          <form
            ref={formRef}
            className="p-4 bg-[rgba(31,41,55,0.9)] border-t border-[rgba(147,51,234,0.3)] flex items-center"
          >
            <textarea
              name="prompt"
              rows="1"
              cols="1"
              placeholder="Ask me anything..."
              className="flex-1 p-3 bg-[rgba(55,65,81,0.8)] border border-[rgba(147,51,234,0.5)] rounded-l-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#9333EA] text-[#D8B4FE] placeholder-[rgba(147,51,234,0.5)] shadow-[0_0_8px_rgba(147,51,234,0.3)] transition-all duration-200"
            ></textarea>
            <button
              type="submit"
              className="p-3 bg-[#9333EA] text-white rounded-r-lg hover:bg-[#7E22CE] shadow-[0_0_10px_rgba(147,51,234,0.6)] transition-all duration-200"
            >
              <img src={sendIcon} alt="send" className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;