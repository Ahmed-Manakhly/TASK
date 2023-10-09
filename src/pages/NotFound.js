import Header from '../components/Header' ;
import img from '../assets/404.jpg'



const NotFound = () => {
  return (
    <>
    <Header/>
      <main>
        <img src={img} alt="Page not found" />
      </main>
    </>
  );
};

export default NotFound;