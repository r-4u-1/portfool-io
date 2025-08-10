// import React, { useEffect } from 'react';
// import './Mountain.css';
// import Hero from '../Hero/Hero';
// import { motion, useAnimation, Variants } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const Mountain: React.FC = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ triggerOnce: true });

//   useEffect(() => {
//     if (inView) {
//       controls.start('visible');
//     }
//   }, [controls, inView]);

//   const arcVariants: Variants = {
//     hidden: { opacity: 0, x: 0, y: 0 },
//     visible: {
//       opacity: 1,
//       x: [-30, -50, -150], // Move right
//       y: [50, -190, -90], // Move up and then down
//       transition: {
//         duration: 3,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <div className='wrapper'>
//       <header className='mount-header'>
//         <div className='background'><Hero /></div>
//         <div className="container">
//           <div className="line"><div className="circle"></div></div>
//         </div>
//         {/*<img src="img/greencloud.jpg" alt="Photo of sky by Pixabay: https://www.pexels.com/photo/painting-of-black-cloud-during-sunset-164175/" className='background'/>*/}
//         <img src="img/green-mount.png" alt="picture of mountain taken by https://www.freepnglogos.com/images/mountain-11959.html" className='foreground'/>
//         <h1 className='title'>Growth</h1>
//       </header>
//       <section className='mount-section'>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nam suscipit totam in aliquid ducimus nostrum voluptatem iusto? Neque voluptatem laboriosam voluptatum natus quaerat, cumque laborum reiciendis earum esse similique?
//         Architecto enim voluptate ducimus. Deserunt sit recusandae, labore harum cum minus incidunt voluptatum cupiditate similique dicta enim officia perspiciatis tempore porro a at vero laudantium, odit possimus? Quam, recusandae unde!
//         Dicta non iure debitis rem placeat, doloribus magni ex, ab blanditiis minus aut ipsam numquam eveniet hic nemo ratione distinctio quidem molestiae autem tempore quos. In eius officiis repellendus culpa?
//         Pariatur quisquam quas vitae similique magnam eveniet non doloribus quos nulla debitis possimus minus aspernatur fugiat maxime numquam, cumque nesciunt temporibus corporis ipsa sed? Velit, dignissimos? Hic libero non magni?
//         Error iusto modi illo delectus blanditiis, deserunt aliquid. Voluptatibus reiciendis qui est sit aut pariatur, cumque itaque dolor facere voluptate fugit nesciunt sed reprehenderit quidem culpa iste earum magni maxime!
//         Sunt accusantium cum saepe ab non laborum, unde dolorum molestias nostrum repellat provident natus, nesciunt sint voluptatem commodi, ex voluptatibus praesentium ipsum dolorem minima suscipit deserunt? Deserunt impedit veritatis nemo?
//         Laboriosam doloribus enim nihil deleniti esse, soluta autem ullam similique accusantium commodi, reprehenderit inventore iure hic? Ipsam saepe repellendus impedit iste unde dolorem dolore amet officia officiis, obcaecati inventore quidem.
//         Perferendis reiciendis illo, excepturi minus facilis perspiciatis culpa dignissimos iste quas, aspernatur at consectetur voluptate. Quibusdam cum ducimus, quidem maiores vitae reiciendis porro soluta sunt suscipit sapiente, odit quos amet!
//       </section>
//     </div>
//   );
// };

// export default Mountain; -->
