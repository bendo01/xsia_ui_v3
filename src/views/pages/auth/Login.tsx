import { useNavigate } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import toast from "solid-toast";
import ToastError from "../../../views/components/application/Toast/ToastError";

import ThemeSwitcher from "../../components/front/ThemeSwitcher";
import LoginOrnamentBottom from "../../components/front/LoginOrnamentBottom";
import LoginOrnamentTop from "../../components/front/LoginOrnamentTop";
import { AuthLogin } from "../../../models/auth/User";
import { GetUserRoles, LoginUser, GetCurrentUser } from "../../../controllers/auth/User";
import { TypeAppInputEvent } from "../../../lib/types";
import Loader from "../../components/application/Navigation/Loader";


export default function Login() {
  const imgPath = `/img/logo/${import.meta.env.VITE_INSTITUTION_CODE}/android-chrome-512x512.png`;

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [form, setForm] = createStore<AuthLogin>({
    email: "",
    password: "",
  });

  const isFormValid = () => {
    const email = form.email.trim();
    const password = form.password.trim();
    return email && password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    if (!isFormValid()) {
      const message = "Email dan Password harus diisi dengan format email yang valid";
      setErrorMessage(message);
      toast.custom((t) => <ToastError message={message} toast_id={t.id} />, {
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response_login = await LoginUser(form);
      const response_roles = await GetUserRoles();
      const response_current_user = await GetCurrentUser();
      if (response_login?.code === 200 && response_roles?.code === 200) {
        navigate("/dashboard");
        toast.success("Login successful!");
      } else {
        const message = response_login?.message || "Authentifikasi Pengguna Gagal";
        setErrorMessage(message);
        toast.custom((t) => <ToastError message={message} toast_id={t.id} />, {
          duration: 100000,
          unmountDelay: 0,
        });
      }
    } catch (error) {
      const message = "Authentifikasi Pengguna Error";
      setErrorMessage(message);
      toast.custom((t) => <ToastError message={message} toast_id={t.id} />, {
        duration: 100000,
        unmountDelay: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event: TypeAppInputEvent) => {
    const { name, value } = event.currentTarget;
    setForm(name as keyof AuthLogin, value);
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    handleLogin();
  };

  onMount(() => {
    setErrorMessage("");
  });

  return (
    <div class="w-full h-full">
      <Show when={isLoading()}>
        <Loader />
      </Show>
      <Show when={!isLoading()}>
        <section class="flex flex-col justify-center items-center bg-white dark:bg-neutral-950 w-full h-screen">
          <div class="relative max-w-md overflow-hidden rounded-none bg-neutral-50 px-10 py-16 text-center sm:px-12 md:px-[60px] dark:bg-neutral-800">
            <div class="mb-10 text-center md:mb-16">
              <img
                src={imgPath}
                alt="logo_institution"
                class="mx-auto inline-block max-w-[160px]"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <Show when={errorMessage()}>
                <div class="text-left bg-red-50 border border-red-200 text-sm text-red-800 rounded-none p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert" tabindex="-1" aria-labelledby="hs-with-list-label">
                  <div class="flex">
                    <div class="shrink-0">
                      <svg class="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                    </div>
                    <div class="ms-4">
                      <h3 id="hs-with-list-label" class="text-sm font-semibold">
                        Terjadi Permasalahan Proses Autentifikasi Akun Anda
                      </h3>
                      <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                        <ul class="list-disc space-y-1 ps-5">
                          <li>Email Tidak Sesuai dengan Email yang Anda Masukkan</li>
                          <li>Masukkan Kata Sandi yang valid</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Show>

              <div class="mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan Surat Elektronik"
                  class="w-full rounded-none border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-neutral-300 dark:text-white"
                  onInput={handleInput}
                  required
                />
              </div>

              <div class="mb-6">
                <div class="relative">
                  <input
                    id="hs-toggle-password"
                    type="password"
                    name="password"
                    class="py-2.5 sm:py-3 ps-4 pe-10 block w-full rounded-none border border-stroke bg-transparent px-5 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-neutral-300 dark:text-white"
                    placeholder="Masukkan Kata Sandi"
                    onInput={handleInput}
                    required
                  />
                  <button
                    type="button"
                    data-hs-toggle-password='{"target": "#hs-toggle-password"}'
                    class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                  >
                    <svg
                      class="shrink-0 size-3.5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path class="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path class="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                      <path class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mb-10">
                <button
                  type="submit"
                  class="w-full cursor-pointer rounded-none border border-blue-900 bg-blue-900 px-5 py-3 font-medium text-white transition hover:bg-opacity-90 dark:text-white"
                >
                  Login
                </button>
              </div>
            </form>

            <div>
              <LoginOrnamentTop />
              <LoginOrnamentBottom />
            </div>
          </div>
        </section>
        <ThemeSwitcher />
      </Show>
    </div>
  );
}
