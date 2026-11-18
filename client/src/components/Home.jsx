import React, { useEffect } from 'react'
import BlogProfileImage from "../assets/Blog Website Design.jpg"
import CSS from "../assets/css-3.png"
import HTML from "../assets/html.png"
import DB from "../assets/data-server.png"
import JS from "../assets/js.png"
import REACTICON from "../assets/physics.png"
import NODE from "../assets/node-js.png"
import P1 from "../assets/p1.jpg"
import P2 from "../assets/p2.png"
import P3 from "../assets/p3.png"
import BlogImage from "../assets/blogImage.png"
import { useNavigate } from 'react-router-dom';
import Footer from './common/Footer'

// Change this to your own email address
const MY_EMAIL = "santhosh123@gmail.com";

const SKILLS = [
    { name: "HTML", icon: HTML },
    { name: "CSS", icon: CSS },
    { name: "JavaScript", icon: JS },
    { name: "React", icon: REACTICON },
    { name: "MongoDB", icon: DB },
    { name: "Node.js", icon: NODE },
];

const PROJECTS = [
    { title: "Project One", image: P1 },
    { title: "Project Two", image: P2 },
    { title: "Project Three", image: P3 },
];

const primaryBtn = "inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-7 py-3 rounded-lg shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition";
const outlineBtn = "inline-block border-2 border-orange-400 text-orange-500 font-semibold px-7 py-3 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition";

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-6xl mx-auto">

            {/* Hero section */}
            <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-12 md:py-20">
                <div className="md:w-1/2 text-center md:text-left">
                    <span className="inline-block bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                        👋 Welcome to my portfolio
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold pb-2">Hey! I Am</h1>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-orange-500 pb-4">Santhosh</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                        I can create stunning websites for your company. Do check my work. I won't disappoint you. Try me for 7 days before you decide anything.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <a href={`mailto:${MY_EMAIL}?subject=I want to hire you`} className={primaryBtn}>Hire Me</a>
                        <button onClick={() => navigate("/blogs")} className={outlineBtn}>Read My Blogs</button>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <img src={BlogProfileImage} className="w-64 md:w-96 drop-shadow-2xl" alt="Santhosh profile" />
                </div>
            </section>

            {/* Skills */}
            <section className="py-10">
                <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8">
                    My <span className="text-orange-500">Skills</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {SKILLS.map((skill) => (
                        <div
                            key={skill.name}
                            className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
                        >
                            <img src={skill.icon} className="w-12 h-12" alt={skill.name} />
                            <p className="text-sm font-semibold">{skill.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats and services */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-10 py-16">
                <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
                    <div className="p-6 rounded-2xl text-center text-white bg-gradient-to-br from-purple-400 to-purple-700 shadow-lg">
                        <p className="text-5xl font-extrabold">12</p>
                        <p className="mt-2 font-medium">Projects Completed</p>
                    </div>
                    <div className="p-6 rounded-2xl text-center text-white bg-gradient-to-br from-green-400 to-green-700 shadow-lg">
                        <p className="text-5xl font-extrabold">🎓</p>
                        <p className="mt-2 font-medium">Fresher</p>
                    </div>
                </div>

                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-extrabold">My Awesome</h2>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-orange-500 mb-4">Services</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        I have attached my resume here for your reference.
                    </p>
                    <a href="/resume.pdf" download className={primaryBtn}>Download CV</a>
                </div>
            </section>

            {/* Projects */}
            <section className="py-10">
                <h2 className="text-center text-3xl md:text-5xl font-extrabold mb-10">
                    Checkout My Live <span className="text-orange-500">Projects</span> Here
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.title}
                            className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-md hover:shadow-2xl transition"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={project.image}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                                    alt={project.title}
                                />
                            </div>
                            <p className="p-4 font-semibold text-center">{project.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blog call to action */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-10 py-16">
                <div className="md:w-1/2 flex justify-center">
                    <img src={BlogImage} className="w-64 md:w-96" alt="Blog illustration" />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold pb-2">I like to Write</h2>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-orange-500 pb-4">Blogs about tech</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        You can know better about me by reading my blogs here. I share my expertise here.
                    </p>
                    <button onClick={() => navigate("/blogs")} className={primaryBtn}>Read My Blogs</button>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default Home