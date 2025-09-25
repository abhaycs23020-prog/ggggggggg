// Questions organized by category and difficulty
const questions = {
  gk: {
    easy: [
      { question: "Largest planet?", answers: [
        {text:"Earth", correct:false},
        {text:"Jupiter", correct:true},
        {text:"Mars", correct:false},
        {text:"Saturn", correct:false}
      ]},
      { question: "National bird of India?", answers: [
        {text:"Peacock", correct:true},
        {text:"Sparrow", correct:false},
        {text:"Parrot", correct:false},
        {text:"Eagle", correct:false}
      ]},
      { question: "Capital of France?", answers: [
        {text:"Rome", correct:false},
        {text:"Berlin", correct:false},
        {text:"Paris", correct:true},
        {text:"Madrid", correct:false}
      ]},
      { question: "Which ocean is the largest?", answers: [
        {text:"Atlantic", correct:false},
        {text:"Pacific", correct:true},
        {text:"Indian", correct:false},
        {text:"Arctic", correct:false}
      ]},
      { question: "National animal of India?", answers: [
        {text:"Tiger", correct:true},
        {text:"Lion", correct:false},
        {text:"Elephant", correct:false},
        {text:"Leopard", correct:false}
      ]}
      // 👉 Add 10 more questions here (total 15)
    ],
    medium: [
      { question: "First President of India?", answers: [
        {text:"Rajendra Prasad", correct:true},
        {text:"Nehru", correct:false},
        {text:"Sardar Patel", correct:false},
        {text:"APJ Abdul Kalam", correct:false}
      ]},
      { question: "Currency of Japan?", answers: [
        {text:"Won", correct:false},
        {text:"Yuan", correct:false},
        {text:"Yen", correct:true},
        {text:"Ringgit", correct:false}
      ]},
      { question: "Great Wall of China is visible from?", answers: [
        {text:"Moon", correct:false},
        {text:"Earth Orbit", correct:true},
        {text:"Mars", correct:false},
        {text:"Sun", correct:false}
      ]}
      // 👉 Add 12 more (total 15)
    ],
    hard: [
      { question: "Year of French Revolution?", answers: [
        {text:"1789", correct:true},
        {text:"1804", correct:false},
        {text:"1776", correct:false},
        {text:"1812", correct:false}
      ]},
      { question: "Who wrote Arthashastra?", answers: [
        {text:"Chanakya", correct:true},
        {text:"Kalidas", correct:false},
        {text:"Kabir", correct:false},
        {text:"Valmiki", correct:false}
      ]}
      // 👉 Add 13 more (total 15)
    ]
  },

  science: {
    easy: [
      { question: "H2O is?", answers: [
        {text:"Oxygen", correct:false},
        {text:"Water", correct:true},
        {text:"Hydrogen", correct:false},
        {text:"Carbon Dioxide", correct:false}
      ]},
      { question: "Which planet has rings?", answers: [
        {text:"Earth", correct:false},
        {text:"Saturn", correct:true},
        {text:"Venus", correct:false},
        {text:"Mars", correct:false}
      ]}
      // 👉 Add 13 more
    ],
    medium: [
      { question: "Speed of light?", answers: [
        {text:"3x10^8 m/s", correct:true},
        {text:"1.5x10^8 m/s", correct:false},
        {text:"3x10^6 m/s", correct:false},
        {text:"1x10^9 m/s", correct:false}
      ]},
      { question: "Boiling point of water?", answers: [
        {text:"50°C", correct:false},
        {text:"100°C", correct:true},
        {text:"120°C", correct:false},
        {text:"90°C", correct:false}
      ]}
      // 👉 Add 13 more
    ],
    hard: [
      { question: "Avogadro’s number?", answers: [
        {text:"6.022x10^23", correct:true},
        {text:"3.14", correct:false},
        {text:"9.8", correct:false},
        {text:"1.67x10^-27", correct:false}
      ]},
      { question: "Unit of electric current?", answers: [
        {text:"Volt", correct:false},
        {text:"Ohm", correct:false},
        {text:"Ampere", correct:true},
        {text:"Watt", correct:false}
      ]}
      // 👉 Add 13 more
    ]
  },

  tech: {
    easy: [
      { question: "Founder of Microsoft?", answers: [
        {text:"Steve Jobs", correct:false},
        {text:"Bill Gates", correct:true},
        {text:"Elon Musk", correct:false},
        {text:"Mark Zuckerberg", correct:false}
      ]},
      { question: "What does WWW stand for?", answers: [
        {text:"Wide World Web", correct:false},
        {text:"World Wide Web", correct:true},
        {text:"Web Wide World", correct:false},
        {text:"Wide Web World", correct:false}
      ]}
      // 👉 Add 13 more
    ],
    medium: [
      { question: "HTML stands for?", answers: [
        {text:"Hyper Text Markup Language", correct:true},
        {text:"High Tech Machine Language", correct:false},
        {text:"Hyperlink Text Madeup Language", correct:false},
        {text:"None of these", correct:false}
      ]},
      { question: "First search engine?", answers: [
        {text:"Google", correct:false},
        {text:"Archie", correct:true},
        {text:"Yahoo", correct:false},
        {text:"Bing", correct:false}
      ]}
      // 👉 Add 13 more
    ],
    hard: [
      { question: "Year Java was released?", answers: [
        {text:"1995", correct:true},
        {text:"1990", correct:false},
        {text:"2000", correct:false},
        {text:"1985", correct:false}
      ]},
      { question: "Who invented C language?", answers: [
        {text:"Dennis Ritchie", correct:true},
        {text:"James Gosling", correct:false},
        {text:"Bjarne Stroustrup", correct:false},
        {text:"Guido van Rossum", correct:false}
      ]}
      // 👉 Add 13 more
    ]
  }
};
