"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import {
  ArrowDown,
  Code,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  MessageSquare,
  Users,
  ExternalLink,
  Zap,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";

const LogoScene = dynamic(() => import("@/components/logo-scene"), {
  ssr: false,
});

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  // Update window height on mount and resize
  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight);
  
    updateHeight();
    window.addEventListener("resize", updateHeight);
    document.body.classList.add("no-scrollbar");
  
    return () => {
      window.removeEventListener("resize", updateHeight);
      document.body.classList.remove("no-scrollbar");
    };
  }, []);

  const { scrollY } = useScroll()

  // Calculate the width and border radius based on scroll position
  // Transition completes when body section reaches 20% of screen height
  const transitionPoint = windowHeight * 0.8 // 80% of screen height scrolled = 20% of screen showing

  const bodyWidth = useTransform(scrollY, [0, transitionPoint], ["90%", "100%"])

  const bodyBorderRadius = useTransform(scrollY, [0, transitionPoint], ["3rem", "0rem"])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const pathVariants = {
    hidden: {
      pathLength: 0,
      fill: "rgba(0,0,0,0)",
      stroke: "rgb(var(--dl-neutral-white))",
      strokeWidth: 2,
    },
    visible: (i: number) => ({
      pathLength: 1,
      transition: {
        pathLength: {
          duration: 1,
          ease: "easeInOut",
          delay: i * 0.5, // stagger each path
        },
      },
    }),
    fillIn: (i: number) => ({
      fill: "rgb(var(--dl-neutral-white))",
      stroke: "rgba(0,0,0,0)",
      transition: {
        delay: i * 0.5 + 1, // fill after draw
        duration: 0.4,
      },
    }),
  };

  const controls = useAnimation();
  const paths = [
    "M185.9916 96.45V84.585L187.0305 84.795C186.3378 88.645 184.2603 91.725 180.7974 94.035C177.4038 96.345 173.3178 97.5 168.5391 97.5C163.6914 97.5 159.4668 96.3801 155.8656 94.14C152.3334 91.83 149.598 88.61 147.6588 84.48C145.7196 80.35 144.75 75.4851 144.75 69.885C144.75 64.215 145.7541 59.28 147.7626 55.08C149.7711 50.88 152.5758 47.625 156.177 45.315C159.8478 43.005 164.1069 41.85 168.9546 41.85C174.0105 41.85 178.0965 43.0401 181.2129 45.42C184.3986 47.7999 186.2685 51.0549 186.8226 55.185L185.6799 55.29V20.85H201.2625V96.45H185.9916ZM173.5257 84.9C177.1962 84.9 180.174 83.6049 182.4594 81.015C184.7449 78.3549 185.8878 74.575 185.8878 69.675C185.8878 64.775 184.7103 61.03 182.3556 58.44C180.0702 55.7799 176.0577 54.45 170.3178 54.45C164.7165 54.45 161.7387 55.7799 159.3839 58.44C157.0985 61.1001 156.9558 64.8801 156.9558 69.78C156.9558 74.68 158.0985 78.4599 160.3839 81.12C162.7387 83.7801 165.7782 84.9 173.5257 84.9Z",
    "M238.653 97.5C232.7661 97.5 227.6412 96.345 223.2783 94.035C218.9153 91.6551 215.5215 88.365 213.0978 84.165C210.7435 79.965 209.5655 75.135 209.5655 69.675C209.5655 64.1451 210.7435 59.3151 213.0978 55.185C215.5215 50.985 218.8806 47.73 223.1745 45.42C227.4684 43.0401 232.4547 41.85 238.1334 41.85C243.6048 41.85 248.3487 42.97 252.3654 45.21C256.3819 47.4501 259.4988 50.565 261.716 54.555C263.9332 58.545 265.0392 63.2349 265.0392 68.625C265.0392 69.745 265.0045 70.795 264.9354 71.775C264.8663 72.6849 264.7623 73.56 264.6236 74.4H218.7075V64.005H252.0537L249.3528 65.895C249.3528 61.555 248.3141 58.37 246.2364 56.34C244.2281 54.24 241.4577 53.19 237.9258 53.19C233.8398 53.19 230.6538 54.59 228.3684 57.39C226.1529 60.19 225.0441 64.39 225.0441 69.99C225.0441 75.45 226.1529 79.51 228.3684 82.17C230.6538 84.83 234.0476 86.16 238.5489 86.16C241.0422 86.16 243.189 85.74 244.9899 84.9C246.7905 84.06 248.1408 82.695 249.0409 80.805H263.6886C261.9573 85.9851 258.9795 90.08 254.7555 93.09C250.5996 96.03 245.2323 97.5 238.653 97.5Z",
    "M286.2906 96.45L265.41 42.9H282.1353L298.4448 92.88H289.7187L305.925 42.9H322.233L301.353 96.45H286.2906Z",
    "M328.257 96.45V20.85H343.839V96.45H328.257Z",
    "M356.256 96.45V42.9H371.838V96.45H356.256ZM355.737 35.76V18.75H372.357V35.76H355.737Z",
    "M384.255 96.45V42.9H399.525V55.5H399.837V96.45H384.255ZM421.134 96.45V63.27C421.134 60.33 420.372 58.125 418.848 56.655C417.393 55.185 415.248 54.45 412.407 54.45C409.983 54.45 407.802 55.01 405.864 56.13C404.003 57.25 402.504 58.79 401.397 60.75C400.356 62.71 399.837 65.02 399.837 67.68L398.487 54.765C400.218 50.845 402.747 47.73 406.071 45.42C409.464 43.04 413.619 41.85 418.536 41.85C424.425 41.85 428.925 43.53 432.042 46.89C435.159 50.18 436.716 54.625 436.716 60.225V96.45H421.134Z",
    "M448.575 96.45V20.85H464.157V96.45H448.575ZM482.544 96.45L460.521 68.625L482.025 42.9H499.995L474.753 71.04L475.479 66.105L501.036 96.45H482.544Z",
    "M526.479 97.5C518.724 97.5 512.559 95.925 508.99 92.775C503.418 89.625 500.925 85.2849 500.508 79.755H514.431C514.776 82.1349 515.952 83.955 517.962 85.215C520.038 86.4051 522.879 87 526.479 87C529.734 87 532.089 86.5449 533.544 85.635C535.068 84.6549 535.83 83.2899 535.83 81.54C535.83 80.21 535.38 79.195 534.48 78.495C533.649 77.7249 532.089 77.0949 529.806 76.605L521.286 74.82C514.983 73.49 510.345 71.4951 507.366 68.835C504.387 66.105 502.899 62.6049 502.899 58.335C502.899 53.155 504.873 49.13 508.821 46.26C512.769 43.32 518.274 41.85 525.339 41.85C532.332 41.85 537.906 43.2849 542.064 46.155C546.219 48.9549 548.502 52.875 548.919 57.915H534.999C534.723 56.0949 533.751 54.7299 532.089 53.82C530.427 52.8399 528.072 52.35 525.027 52.35C522.255 52.35 520.179 52.77 518.793 53.61C517.476 54.38 516.819 55.5 516.819 56.97C516.819 57.87 517.374 58.995 518.481 60.015C519.588 60.7151 521.424 61.3449 523.986 61.905L533.544 63.9C538.878 65.0199 542.895 67.1199 545.595 70.2C548.364 73.2099 549.75 76.7799 549.75 80.91C549.75 86.16 547.707 90.255 543.621 93.195C539.604 96.0651 533.892 97.5 526.479 97.5Z"
  ];

  useEffect(() => {
    controls.start("visible").then(() => {
      controls.start("fillIn");
    });
  }, [controls]);
  

  return (
    <div ref={containerRef} className="relative">
      <div className="fixed inset-0 h-screen w-full items-center justify-center bg-gradient-to-br from-[#592785] to-dl-purple text-white">
        <motion.header className="absolute top-6 text-center w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <svg width="552" className="h-12 -translate-x-7 inline" height="120" viewBox="0 0 552 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {paths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                variants={pathVariants}
                custom={i} // used in variant function for delay
                initial="hidden"
                animate={controls}
              />
            ))}
          </svg>
        </motion.header>
        {isLoading && (
          <span className="absolute h-12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <CircularProgress className="text-dl-light-purple" color="secondary" />
          </span>
        )}
        <LogoScene onLoaded={() => setIsLoading(false)} />
        {/* <div className="max-w-4xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              DevLinks
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-violet-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              One link to showcase all your developer profiles
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <ArrowDown className="h-8 w-8" />
        </motion.div> */}

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-dl-red bg-opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-violet-300 bg-opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.25, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-20 right-1/3 h-72 w-72 rounded-full bg-blue-600 bg-opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.28, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          ></motion.div>
        </div>
      </div>

      {/* Spacer to push content below the fold */}
      <div style={{ height: "100vh" }}></div>

      {/* Body Section that transitions over the hero */}
      <motion.div
        style={{
          width: bodyWidth,
          borderTopLeftRadius: bodyBorderRadius,
          borderTopRightRadius: bodyBorderRadius,
        }}
        className="relative min-h-screen bg-white mx-auto shadow-xl z-20 overflow-hidden"
      >
        {/* Frontend Mentor Origins Section */}
        <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Born from a Challenge</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                DevLinks started as a UI challenge from{" "}
                <Link
                  href="https://frontendmentor.io"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  Frontend Mentor
                  <ExternalLink className="h-4 w-4" />
                </Link>{" "}
                — a platform that helps developers improve their coding skills by building realistic projects. What
                began as a design implementation quickly evolved into something more when we realized the need for a
                truly functional solution.
              </p>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-md border border-blue-100 max-w-2xl mx-auto"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700 italic">
                  {`"From static design to dynamic platform — DevLinks proves that the best projects often start with a
                  simple challenge and grow into something developers actually need."`}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              About DevLinks
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {"DevLinks is a centralized hub for developers to consolidate their online presence. In today's digital landscape, developers often maintain multiple profiles across various platforms. DevLinks simplifies sharing by providing a single, customizable link that showcases all your professional profiles."}
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-8 mt-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="bg-gray-50 p-6 rounded-lg" variants={cardVariants} whileHover="hover">
                <motion.div
                  className="bg-violet-100 text-violet-600 p-3 rounded-full w-fit mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code className="h-6 w-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Showcase Your Work</h3>
                <p className="text-gray-600">
                  Link to your GitHub, portfolio, blog, and other platforms where your code lives.
                </p>
              </motion.div>

              <motion.div className="bg-gray-50 p-6 rounded-lg" variants={cardVariants} whileHover="hover">
                <motion.div
                  className="bg-violet-100 text-violet-600 p-3 rounded-full w-fit mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Github className="h-6 w-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Professional Identity</h3>
                <p className="text-gray-600">
                  Present a cohesive professional identity across all your development platforms.
                </p>
              </motion.div>

              <motion.div className="bg-gray-50 p-6 rounded-lg" variants={cardVariants} whileHover="hover">
                <motion.div
                  className="bg-violet-100 text-violet-600 p-3 rounded-full w-fit mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Linkedin className="h-6 w-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Grow Your Network</h3>
                <p className="text-gray-600">
                  Make it easy for potential employers and collaborators to find all your work.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="bg-white p-6 mt-12 rounded-xl shadow-md border border-blue-100 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Born from a Challenge</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                DevLinks started as a UI challenge from{" "}
                <Link
                  href="https://frontendmentor.io"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  Frontend Mentor
                  <ExternalLink className="h-4 w-4" />
                </Link>{" "}
                — a platform that helps developers improve their coding skills by building realistic projects. What
                began as a design implementation quickly evolved into something more when we realized the need for a
                truly functional solution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              How to Use
            </motion.h2>

            <div className="space-y-12">
              <motion.div
                className="flex flex-col md:flex-row gap-8 items-center"
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="md:w-1/2">
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md h-64 flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-400 text-center">Step 1 Illustration</p>
                  </motion.div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Create Your Account</h3>
                  <p className="text-gray-600">
                    Sign up for DevLinks in seconds. All you need is an email address to get started.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row-reverse gap-8 items-center"
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="md:w-1/2">
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md h-64 flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-400 text-center">Step 2 Illustration</p>
                  </motion.div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. Add Your Links</h3>
                  <p className="text-gray-600">
                    Add links to your GitHub, LinkedIn, portfolio, blog, Twitter, and any other platforms where your
                    work appears.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row gap-8 items-center"
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="md:w-1/2">
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-md h-64 flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-400 text-center">Step 3 Illustration</p>
                  </motion.div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">3. Share Your DevLinks</h3>
                  <p className="text-gray-600">
                    Get your personalized DevLinks URL and share it in your email signature, resume, business card, or
                    social media profiles.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collaborate Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Join Our Developer Community</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                DevLinks is built by developers, for developers. We welcome contributions, ideas, and feature requests
                from our community.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-violet-50 p-8 rounded-xl border border-violet-100"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="bg-violet-100 text-violet-600 p-3 rounded-full w-fit mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Github className="h-6 w-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">Contribute on GitHub</h3>
                <p className="text-gray-600 mb-4">{"Our codebase is open for contributions. Whether you're fixing bugs, improving documentation, or adding new features, we appreciate your help."}
                </p>
                <div className="space-y-2">
                  <motion.div
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                    <span>Submit pull requests for new features</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                    <span>Report bugs and issues</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                    <span>Improve documentation</span>
                  </motion.div>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center mt-6 text-violet-600 font-medium hover:text-violet-700"
                >
                  View GitHub Repository <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                className="bg-violet-50 p-8 rounded-xl border border-violet-100"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="bg-violet-100 text-violet-600 p-3 rounded-full w-fit mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <MessageSquare className="h-6 w-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">Request Features</h3>
                <p className="text-gray-600 mb-4">
                  {"Have an idea for a feature that would make DevLinks even better? We'd love to hear it! Submit your feature requests through our GitHub issues."}
                </p>
                <div className="space-y-2">
                  <motion.div
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                    <span>Suggest new integrations</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                    <span>Request UI/UX improvements</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                    <span>Propose new customization options</span>
                  </motion.div>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center mt-6 text-violet-600 font-medium hover:text-violet-700"
                >
                  Submit Feature Request <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <Users className="h-16 w-16 text-violet-500" />
                  </motion.div>
                </div>
                <div className="md:w-3/4 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">Join Our Discord Community</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with other developers, share your DevLinks profile, get help, and discuss new features in
                    our growing community.
                  </p>
                  <motion.button
                    className="bg-violet-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Discord
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-violet-500 to-purple-700 text-white">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Consolidate Your Developer Presence?</h2>
            <p className="text-xl mb-8 text-violet-100">
              Join thousands of developers who use DevLinks to showcase their work.
            </p>
            <motion.button
              className="bg-white text-purple-700 px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-all text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started for Free
            </motion.button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-gray-800 text-gray-300">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-white mb-2">DevLinks</h3>
                <p className="text-sm">© {new Date().getFullYear()} DevLinks. All rights reserved.</p>
              </div>

              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Link href="#" className="hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Link href="#" className="hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Link href="#" className="hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}
