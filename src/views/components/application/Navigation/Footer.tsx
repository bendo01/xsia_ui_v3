import type { Component } from "solid-js";
import { createSignal } from "solid-js";

const Footer: Component = () => {
  const [current_year] = createSignal(new Date().getFullYear());
  return (
    <footer class="bg-neutral-100 dark:bg-neutral-800 text-white text-center py-4">
      <p class="text-neutral-700 dark:text-neutral-300">&copy; {current_year()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;

