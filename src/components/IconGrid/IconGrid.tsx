import React from 'react';
import './IconGrid.css';

const getRandomColor = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const IconGrid: React.FC = () => {
  const icons = [
    { src: "./img/svg/AzureDevops.svg", alt: "Icon 1", width: 80, height: 80 },
    { src: "./img/svg/bem.svg", alt: "Icon 2", width: 80, height: 80 },
    { src: "./img/svg/css.svg", alt: "Icon 4", width: 80, height: 80 },
    { src: "./img/svg/elastic.svg", alt: "Icon 5", width: 80, height: 80 },
    { src: "./img/svg/elasticsearch.svg", alt: "Icon 6", width: 80, height: 80 },
    { src: "./img/svg/express.svg", alt: "Icon 7", width: 80, height: 80 },
    { src: "./img/svg/git.svg", alt: "Icon 8", width: 80, height: 80 },
    { src: "./img/svg/github.svg", alt: "Icon 9", width: 80, height: 80 },
    { src: "./img/svg/githubcopilot.svg", alt: "Icon 10", width: 80, height: 80 },
    { src: "./img/svg/html5.svg", alt: "Icon 11", width: 80, height: 80 },
    { src: "./img/svg/jest.svg", alt: "Icon 12", width: 80, height: 80 },
    { src: "./img/svg/jetbrains.svg", alt: "Icon 13", width: 80, height: 80 },
    { src: "./img/svg/jquery.svg", alt: "Icon 14", width: 80, height: 80 },
    { src: "./img/svg/json.svg", alt: "Icon 15", width: 80, height: 80 },
    { src: "./img/svg/less.svg", alt: "Icon 16", width: 80, height: 80 },
    { src: "./img/svg/kibana.svg", alt: "Icon 17", width: 80, height: 80 },
    { src: "./img/svg/lighthouse.svg", alt: "Icon 18", width: 80, height: 80 },
    { src: "./img/svg/mongodb.svg", alt: "Icon 19", width: 80, height: 80 },
    { src: "./img/svg/nodedotjs.svg", alt: "Icon 20", width: 80, height: 80 },
    { src: "./img/svg/nodemon.svg", alt: "Icon 21", width: 80, height: 80 },
    { src: "./img/svg/php.svg", alt: "Icon 22", width: 80, height: 80 },
    { src: "./img/svg/postman.svg", alt: "Icon 23", width: 80, height: 80 },
    { src: "./img/svg/react.svg", alt: "Icon 24", width: 80, height: 80 },
    { src: "./img/svg/pytest.svg", alt: "Icon 25", width: 80, height: 80 },
    { src: "./img/svg/python.svg", alt: "Icon 26", width: 80, height: 80 },
    { src: "./img/svg/sass.svg", alt: "Icon 27", width: 80, height: 80 },
    { src: "./img/svg/selenium.svg", alt: "Icon 28", width: 80, height: 80 },
    { src: "./img/svg/swagger.svg", alt: "Icon 29", width: 80, height: 80 },
    { src: "./img/svg/testcafe.svg", alt: "Icon 30", width: 80, height: 80 },
    { src: "./img/svg/vite.svg", alt: "Icon 31", width: 80, height: 80 },
    { src: "./img/svg/Bootstrap.svg", alt: "Icon 32", width: 80, height: 80 },
    { src: "./img/svg/BrowserStack.svg", alt: "Icon 33", width: 80, height: 80 },
    { src: "./img/svg/WebStorm.svg", alt: "Icon 34", width: 80, height: 80 },
    { src: "./img/svg/Redis.svg", alt: "Icon 35", width: 80, height: 80 },
    { src: "./img/svg/wordpress.svg", alt: "Icon 36", width: 80, height: 80 },
    { src: "./img/svg/stripe.svg", alt: "Icon 37", width: 80, height: 80 },
  ];

  return (
    <div className='icon-grid-container'>
      <div className="icon-grid">
        {icons.map((icon, index) => (
          <div key={index} className="icon-container" style={{ backgroundColor: getRandomColor() }}>
            <img
              src={icon.src}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconGrid;