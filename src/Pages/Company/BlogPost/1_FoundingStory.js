import React, {useLayoutEffect} from 'react';
import physics from '../../../img/blog/physics.jpg';

export const metadata = {
    title: "The Story Behind Our Company",
    date: "March 5, 2025",
    image: physics,
    link: "/blog/founding_story",
    excerpt: "Ever since I was a child, I've been fascinated by science and technology. While my classmates spent thier time playing \
                games, I was busy asking endless questions about the world around me - how light bends, how machines work, and why things \
                behave the way they do. This natural curiosity led me to study physics, where I developed a deep appreciation for \
                how fundamental principles could explain the complexities of the universe"
  };

const Founding_story = () => {
    useLayoutEffect(()=>{
        window.scrollTo(0, 0);
    }, []);

    const blog = [{
        date: "March 5, 2025",
        title: "The Story Behind Our Company",
        image: physics,
        link: "/blog/founding_story",
        content: 
        `
        <p style="font-size: 25px; font-weight: bold; margin-top: 3vh; margin-bottom: 20px;">
            The Journey to Innovation: Why I Founded My Company
        </p>

        Ever since I was a child, I’ve been fascinated by science and technology. While my classmates spent their time playing games,
        I was busy asking endless questions about the world around me—how light bends, how machines work, and why things behave the 
        way they do. This natural curiosity led me to study physics, where I developed a deep appreciation for how fundamental 
        principles could explain the complexities of the universe.

        But alongside my love for physics, another interest started to grow—software engineering. Unlike my structured coursework
        in physics, programming was something I taught myself. I was drawn to the idea that, with the right code, I could create
        something entirely new. I spent countless hours experimenting, building, and refining my skills, slowly realizing that the 
        fusion of physics and software could open doors to incredible possibilities.


        <p style="font-size: 25px; font-weight: bold; margin-top: 5vh; margin-bottom: 20px;">
            The Camera Industry and the Problems I Couldn't Ignore
        </p>

        My journey into computer vision truly began when I started working in the camera industry. For over two years, I was 
        deeply involved in the development of imaging systems, analyzing how light interacted with camera hardware—lenses, sensors, 
        and image processing algorithms—to produce a final image. It was an eye-opening experience, but it also exposed me to a 
        fundamental problem in the industry: inefficiency.

        I couldn’t understand the conventions of the computer vision industry. It baffled me how training data was fed into 
        machine learning models indiscriminately, without considering the differences in lighting conditions, camera hardware, 
        or image processing algorithms. Every camera system sees the world differently. A slight change in sensor type, lens 
        configuration, or ISP (Image Signal Processing) pipeline can completely alter the appearance of an image. And yet, 
        many companies in the industry were treating all images as if they were the same—blindly applying deep learning techniques 
        without truly understanding the underlying physics of image formation.

        This approach was inefficient. Companies spent enormous amounts of time and resources collecting data, training models, 
        and testing them in real-world conditions, only to find that their models didn’t generalize well. They would then 
        repeat the cycle, tweaking parameters through trial and error, with no structured way to predict the outcome. It was 
        clear to me that there had to be a better way.

        <p style="font-size: 25px; font-weight: bold; margin-top: 5vh; margin-bottom: 20px;">
            A Vision for Change: Building the Future of Computer Vision
        </p>
        
        This realization led me to take a bold step—founding my own company. I wanted to change the way computer vision 
        systems were developed by introducing a more systematic, physics-driven approach. Instead of relying on brute-force 
        data collection and blind training, I envisioned a solution where developers could simulate real-world conditions 
        before even collecting data—allowing them to optimize models with precision.


        By combining physics-based simulation with deep learning, I set out to build a platform that could model the entire 
        imaging pipeline, from optics and sensors to image processing and AI algorithms. This would eliminate the need for 
        excessive real-world testing, reduce costs, and accelerate innovation in the industry.


        Starting a company wasn’t easy. There were moments of doubt, setbacks, and challenges that seemed impossible to 
        overcome. But every time I looked back at the inefficiencies in the industry, I knew I was on the right path. 
        The industry didn’t need another incremental improvement—it needed a fundamental shift.


        <p style="font-size: 25px; font-weight: bold; margin-top: 5vh; margin-bottom: 20px;">
            Looking Ahead: Redefining Computer Vision
        </p>
        
        Today, we’re building that future. My company is more than just a business—it’s a mission to transform how 
        computer vision is developed and applied. We believe in leveraging simulation to drive smarter, faster, and 
        more efficient innovation, and we’re just getting started.
    
        The future of computer vision shouldn’t be dictated by trial-and-error experimentation. It should be precise, 
        predictable, and optimized from the ground up. And that’s exactly what we’re here to create.
        `

    }];

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "10vh 0", minHeight: "80vh" }}>
            <div className = "blog-content">
                {blog.map((post, index) => (
                    <div key={index}>
                        <p style={{ fontSize: "18px", color: "white" }}>{post.date}</p>
                        <h1 style={{ fontSize: "32px", marginBottom: "20px", color: 'white' }}>{post.title}</h1>

                        {/* Display the image */}
                        <img src={post.image} alt="Blog Post" style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }} />

                        {/* Render content with inline styles */}
                        <div style={{ width: "100%", lineHeight: "1.8", fontSize: "20px", fontWeight: '100', 
                        textAlign: "left", color: 'white' }}
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Founding_story;