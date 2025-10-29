import { onMount, createSignal, onCleanup, from } from "solid-js";

import Footer from "../../components/front/Footer";
import Header from "../../components/application/Navigation/Header";

export default function Landing() {
    onMount(() => {
        
    });


    return (
        <div class="flex flex-col min-h-[99.9vh]">
            <Header />
            <main class="flex-grow"></main>
            <Footer />
        </div>
    );
}
