import type { Component } from "solid-js";
import { createSignal, Show, For } from "solid-js";
import { io } from "socket.io-client";

const Notification: Component = () => {
  const web_socket_url = import.meta.env.VITE_WEB_SOCKET_SERVER_URL ?? "ws://localhost:5150";
  const socket = io(web_socket_url);
  const [connected, setConnected] = createSignal(false);

  // Signal to store the messages
  const [messages, setMessages] = createSignal<{ sender: string; text: string; time: string }[]>([]);

  // Listen to connection and disconnection events
  socket.on("connect", () => setConnected(true));
  socket.on("disconnect", () => setConnected(false));

  // Listen to incoming messages and append them
  socket.on("broadcasting", (message) => {
    const newMessage = {
      sender: message.type,
      text: message.message,
      time: message.time,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  });

  return (
    <div class="hs-dropdown relative inline-flex">
      <button id="hs-dropdown-transform-style" type="button" class="m-1 ms-0 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-none text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
        <Show when={connected()} fallback={<div class="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full right-8 dark:border-gray-900" />}>
          <div class="absolute block w-3 h-3 bg-green-500 border-2 border-white rounded-full right-8 dark:border-gray-900" />
        </Show>
      </button>

      <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-transform-style">
        <div class="hs-dropdown-open:ease-in hs-dropdown-open:opacity-100 hs-dropdown-open:scale-100 transition ease-out opacity-0 scale-95 duration-200 mt-2 origin-top-left min-w-60 bg-white shadow-md rounded-lg dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700" data-hs-transition>
          <div class="p-1 space-y-0.5">
            <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-none bg-gray-50 dark:bg-gray-800 dark:text-white">Daftar Pesan</div>

            <div class="divide-y divide-gray-100 dark:divide-gray-700 max-w-sm">
              <Show when={messages().length > 0} fallback={<div class="text-center py-3 text-gray-500 dark:text-gray-400">Tidak ada pesan untuk Anda.</div>}>
                {/* Render the received messages dynamically */}
                <For each={messages()}>
                  {(message) => (
                    <div class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div class="shrink-0">
                        <img class="rounded-full w-11 h-11" src="/img/common/avatar_default.png" alt="sistem_avatar" />
                        <div class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                          <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                            <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                          </svg>
                        </div>
                      </div>
                      <div class="w-full ps-3">
                        <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                          Pesan dari <span class="font-semibold text-gray-900 dark:text-white">{message.sender}</span>: {message.text}
                        </div>
                        <div class="text-xs text-blue-600 dark:text-blue-500">{message.time}</div>
                      </div>
                    </div>
                  )}
                </For>
              </Show>
            </div>

            <div class="block py-2 text-sm font-medium text-center text-gray-900 rounded-none bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
              <div class="inline-flex items-center">
                <svg class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                Lihat Semua Pesan
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
