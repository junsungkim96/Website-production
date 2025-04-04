import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import physics from '../../img/blog/physics.jpg';


const Blog = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      title: "The Journey to Innovation: Why I Founded My Company",
      date: "March 5, 2025",
      excerpt: "Ever since I was a child, I've been fascinated by science and technology. While my classmates spent thier time playing \
                games, I was busy asking endless questions about the world around me - how light bends, how machines work, and why things \
                behave the way they do. This natural curiosity led me to study physics, where I developed a deep appreciation for \
                how fundamental principles could explain the complexities of the universe",
      image: physics,
      link: "/blog/founding_story"
    },
    {
      title: "The Future of Computer Vision",
      date: "April 2, 2025",
      excerpt: "Explore how deep learning, simulation, and real-time processing are shaping the future of the computer vision industry.",
      image: physics,
      link: "/blog/future-of-cv"
    },
  ];

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', paddingBottom: '10vh', minHeight: '80vh'}}>
      <Container>
        {/* Blog Title */}
        <p style = {{fontSize: '50px'}}>
          Blog
        </p>

        {/* Subtitle */}
        <p style={{ color: 'lightgray', fontSize: '1.2rem', marginTop: '3vh', marginBottom: '2vh' }}>
          Company updates and technology articles
        </p>

        {/* Divider below title */}
        <hr style={{ borderTop: '1px solid white', marginTop: '5vh', marginBottom: '4vh' }} />

        {/* Blog Posts */}
        <Row className="g-4">
          {[...blogPosts].reverse().map((post, index) => (
            <React.Fragment key={index}>
              <Col md={12}>
                <Card className="h-100 shadow" style={{ backgroundColor: 'transparent', border: 'none' }}>
                  <Row className="g-0">
                    {/* Left: Date */}
                    <Col md={2} className="d-flex align-items-center justify-content-center" style={{ padding: '1rem' }}>
                      <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '1.7vh'}}>{post.date}</p>
                    </Col>

                    {/* Right: Content (clickable) */}
                    <Col md={10} style = {{paddingLeft: '5vw'}}>
                      <a href={post.link} style={{ textDecoration: 'none', color: 'white' }}>
                        <Card.Body style={{ padding: '1rem', textAlign: 'left' }}>
                          <Card.Title style={{ fontSize: '1.5rem', fontWeight: '400', fontFamily: 'Helvetica, Arial, sans-serif'}}>
                            {post.title}
                          </Card.Title>
                          <img
                            src={post.image}
                            alt={post.title}
                            style={{
                              width: '90%',
                              height: 'auto',
                              borderRadius: '8px',
                              marginTop: '1vh',
                              marginBottom: '1vh',
                            }}
                          />
                          <Card.Text style={{ lineHeight: '1.7', color: 'white', fontSize: '1.3vh'}}>
                            {post.excerpt}
                          </Card.Text>
                          <div className = "underline" style = {{cursor: 'pointer', paddingTop: '2vh', textAlign: 'left'}}>
                            <p style={{ fontSize: '1rem', margin: 0 }}>Read More</p>
                          </div>
                        </Card.Body>
                      </a>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Divider between posts */}
              {index !== blogPosts.length - 1 && (
                <Col md={12}>
                  <hr style={{ borderTop: '1px solid white', margin: '3vh 0' }} />
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>
      </Container>
    </div>
  )
};


export default Blog;