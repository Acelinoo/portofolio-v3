// Home.jsx
import About from '../components/about/about';
import Contact from '../components/contact/contact';
import Footer from '../components/footer/footer';
import Education from '../components/education/education';
import MainContent from '../components/main/main-content';
import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';
import Works from '../components/works/works';
import Skills from '../components/skills/skills';

const Home = () => {
  return (
    <>
    
      <Navbar />
      <MainContent />
      <Skills />
     <Sidebar/>
     <About/>
     <Education/>
     <Works/>
     <Contact/>
     <Footer/>
     </>
  );
};

export default Home;
