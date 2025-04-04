import React, {useLayoutEffect} from 'react';
import cv from '../../../img/blog/cv.jpeg';

export const metadata = {
    title: "The Future of Computer Vision Design",
    date: "April 2, 2025",
    image: cv,
    link: "/blog/cv",
    excerpt: `
            Computer vision is no longer just a research topic—it’s the backbone of modern technology, quietly powering everything
            from autonomous vehicles and industrial robotics to smartphones and healthcare diagnostics. As the demand for smarter
            and faster visual intelligence grows, so does the need for a fundamental shift in how we design these systems.
            `
    };

const BlogPost = () => {
    useLayoutEffect(()=>{
        window.scrollTo(0, 0);
    }, []);

    const blog = [{
        date: "April 2, 2025",
        title: "The Future of Computer Vision Design",
        image: cv,
        link: "/blog/cv",
        content: 
        `
        Computer vision is no longer just a research topic—it’s the backbone of modern technology, quietly powering 
        everything from autonomous vehicles and industrial robotics to smartphones and healthcare diagnostics. As 
        the demand for smarter and faster visual intelligence grows, so does the need for a fundamental shift in 
        how we design these systems.

        <p style="font-size: 25px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 5vh; margin-bottom: 1vh;">
            The Old Paradigm: Trial, Error, and Endless Data
        </p>
        Traditionally, designing computer vision systems has involved a lot of trial and error. Engineers collect 
        massive datasets, train neural networks, test them in the real world, tweak the model, and repeat. This 
        brute-force approach works, but it’s slow, expensive, and often opaque. It also struggles to generalize 
        across different environments, lighting conditions, or hardware setups.

        As vision systems become more embedded in safety-critical applications—think autonomous driving or surgical 
        robotics—this guesswork becomes unacceptable.


        <p style="font-size: 25px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 5vh; margin-bottom: 1vh;">
            Design, Simulate, Optimize
        </p>
        The future of computer vision design lies in precision—in understanding the full imaging pipeline, not 
        just the algorithm at the end. It means simulating the entire system—from optics and sensors to image 
        signal processing (ISP) and AI—before touching any real hardware.

        Why simulate? Because simulation enables fast iteration, controlled experimentation, and physics-informed 
        optimization. Developers can predict how a lens will affect performance under low light, how sensor noise 
        will propagate through a neural network, or how ISP parameters might bias a model’s output. This unlocks 
        a whole new level of insight and control.


        <p style="font-size: 25px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 5vh; margin-bottom: 1vh;">
            A Shift from Data-Centric to Design-Centric
        </p>
        We are now entering a design-centric era of computer vision, where the focus shifts from just collecting 
        more data to intelligently designing the system itself. This means:

        Co-optimizing hardware and software together rather than treating them as separate silos.

        Simulating sensor performance before selecting the hardware.

        Training models on synthetic, labeled images generated from a virtual environment.

        Using AI to optimize the ISP pipeline for downstream tasks, not just for visual aesthetics.

        These capabilities are no longer theoretical—they are becoming reality through advanced simulation platforms 
        and AI-driven design tools.


        <p style="font-size: 25px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 5vh; margin-bottom: 1vh;">
            Bridging Physics and Deep Learning
        </p>
        One of the most exciting frontiers is the fusion of physics-based modeling with data-driven AI. By incorporating 
        the laws of optics, image formation, and sensor response into training loops, we can build models that are more
        robust, interpretable, and adaptable. This hybrid approach reduces reliance on labeled data while improving generalization in the real world.

        Imagine training a vision model not just with labeled photos, but with a simulation that knows how light behaves, 
        how noise is generated, and how images are processed. The result? A model that’s not only accurate but grounded in the physical world it’s meant to interpret.


        <p style="font-size: 25px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; margin-top: 5vh; margin-bottom: 1vh;">
            Conclusion: Vision by Design, Not by Accident
        </p>
        The future of computer vision design will be defined by simulation, co-optimization, and system-level intelligence. 
        Instead of relying on guesswork and overfitting to large datasets, we’ll build systems that are intentionally 
        crafted—from photon to inference.

        As the tools and platforms for virtual design mature, developers will gain the power to simulate, analyze, and 
        optimize every stage of the imaging pipeline. And with that, we’ll finally move beyond vision as a black box—and 
        into an era of transparent, explainable, and intelligent vision systems, designed from the ground up for the 
        real world.
        `

    }];

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "10vh 0", minHeight: "80vh" }}>
            <div className = "blog-content">
                {blog.map((post, index) => (
                    <div key={index}>
                        <p style={{ fontSize: "18px", color: "white" }}>{post.date}</p>
                        <h1 style={{ fontSize: "32px", marginBottom: "20px", color: 'white',
                                    maxWidth: "100%",         // allow full width of parent
                                    lineHeight: "1.4",        // clean vertical rhythm
                                    wordBreak: "break-word",  // break long words if needed
                                    overflowWrap: "break-word", // ensures wrapping even in Firefox
                                    whiteSpace: "normal",     // allow natural wrapping
                        }}>{post.title}</h1>

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

export default BlogPost;