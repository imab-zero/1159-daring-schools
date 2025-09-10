"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Animate on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Horizontal scroll tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const sectionWidth = container.clientWidth;
      const currentIndex = Math.round(scrollPosition / sectionWidth);
      setCurrentSection(currentIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * container.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-h-screen h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-sm z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Image
              src="/assets/log.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-14 h-14"
              unoptimized
            />
          </div>
          <div className="flex space-x-6">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`px-4 py-2 transition-colors ${
                  currentSection === index
                    ? "text-yellow-600"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {index === 0 ? "Home" : index === 1 ? "About" : "Join"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Scroll Sections */}
      <div
        ref={scrollContainerRef}
        className="h-screen w-screen flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
      >
        {/* Section 1: Hero */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          {/* Background Layers */}
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 z-20">
            <Image
              src="/assets/dots-grid.svg"
              alt="Dots Pattern"
              width={400}
              height={400}
              className="absolute top-20 right-20 opacity-30"
              unoptimized
            />
            <Image
              src="/assets/circle-pattern.svg"
              alt="Circle Pattern"
              width={800}
              height={800}
              className="absolute -bottom-96 -left-96 opacity-20"
              unoptimized
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-30 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="text-yellow-600">SCHOOL</span> FOR THE{" "}
              <span className="text-yellow-600">DARING</span>
            </h1>

            <p
              className={`text-xl md:text-2xl max-w-3xl mb-4 font-light transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Unlock Your Potential
            </p>

            <p
              className={`text-xl md:text-2xl max-w-3xl mb-6 font-light transition-all duration-1000 delay-500 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Embrace the Challenge
            </p>

            <p
              className={`text-lg md:text-xl max-w-2xl mb-12 font-light italic text-gray-300 transition-all duration-1000 delay-700 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              &quot;At 1159 Realty, we believe in pushing boundaries and
              challenging conventions. Join our movement and be part of
              something extraordinary.&quot;
            </p>

            <div
              className={`transition-all duration-1000 delay-600 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => scrollToSection(2)}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 hover:scale-[1.03] transition-transform duration-300"
              >
                JOIN THE MOVEMENT
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: About */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          <div className="absolute inset-0 overflow-hidden z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Abstract Background"
              fill
              className="object-cover opacity-30"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/0" />
            <Image
              src="/assets/wave.svg"
              alt="Wave"
              width={1440}
              height={320}
              className="absolute bottom-0 left-0 w-full"
              unoptimized
            />
          </div>

          <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="pt-52 md:pt-0">
                <div className="theme-number animate-fade-in">01</div>
                <h2 className="theme-title animate-slide-up">
                  We Challenge Conventions
                </h2>
                <div className="theme-content animate-slide-up">
                  <p className="mb-6">
                    The School for the Daring is more than just an educational
                    impact. It&apos;s a movement that challenges the status quo
                    and pushes boundaries.
                  </p>
                  <p>
                    We believe in creating an environment where innovation
                    thrives, where taking risks is encouraged, and where the
                    daring are rewarded.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl animate-scale">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-600/10 z-10"></div>
                <Image
                  src="/assets/dots-grid.svg"
                  alt="About Illustration"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Join */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0" />
            <Image
              src="/assets/dots-grid.svg"
              alt="Dots"
              width={400}
              height={400}
              className="absolute top-20 left-20 opacity-30"
              unoptimized
            />
          </div>

          <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="pt-12 md:pt-0">
                <div className="theme-number animate-fade-in">02</div>
                <h2 className="theme-title animate-slide-up">
                  Join The Movement
                </h2>
                <div className="theme-content animate-slide-up">
                  <p className="mb-6">
                    Be part of a community that&apos;s redefining what&apos;s
                    possible.
                  </p>
                  <p>
                    Fill out the form to join our exclusive network and be the
                    first to know about our upcoming programs and events.
                  </p>
                </div>
              </div>
              <div className="animate-scale">
                <div className="w-full p-8 bg-black/80 rounded-lg border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
                    JOIN THE MOVEMENT
                  </h2>

                  {status === "success" ? (
                    <div className="text-center py-8 animate-fadeIn">
                      <h3 className="text-2xl font-bold mb-4 text-green-500">
                        You&apos;re In!
                      </h3>
                      <p>
                        Thanks for joining. Prepare to embrace your daring
                        future.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setStatus("loading");
                        setErrorMessage("");

                        try {
                          if (!email) {
                            setStatus("error");
                            setErrorMessage("Email is required");
                            return;
                          }

                          const formData = new FormData();
                          formData.append("email", email);
                          formData.append("name", name);

                          const res = await fetch("/api/lead", {
                            method: "POST",
                            body: formData,
                          });

                          const data = await res.json();

                          if (!res.ok)
                            throw new Error(
                              data.error || "Registration failed"
                            );

                          setStatus("success");
                          setEmail("");
                          setName("");
                        } catch (error) {
                          console.error("Submission Error:", error);
                          setStatus("error");
                          setErrorMessage(
                            error instanceof Error
                              ? error.message
                              : "Failed to register"
                          );
                        }
                      }}
                      className="space-y-6"
                    >
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-yellow-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {status === "error" && (
                        <div className="text-yellow-600 text-sm font-bold p-2 bg-red-100/10 border border-yellow-600 rounded animate-pulse">
                          Error: {errorMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-all duration-300 hover:scale-[1.03] disabled:opacity-50"
                      >
                        {status === "loading"
                          ? "Joining..."
                          : "JOIN THE MOVEMENT"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-gray-400 text-sm">
        <h1 className="text-white">School for the Daring</h1>
        <p>
          © {new Date().getFullYear()} School for the Daring. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
