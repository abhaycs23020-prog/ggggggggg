const questions = {
  gk: [
    { question: "Largest planet?", answers:[{text:"Earth",correct:false},{text:"Jupiter",correct:true},{text:"Mars",correct:false},{text:"Saturn",correct:false}], hint:"It's a gas giant." },
    { question: "Father of Nation?", answers:[{text:"Nehru",correct:false},{text:"Gandhi",correct:true},{text:"Patel",correct:false},{text:"Ambedkar",correct:false}], hint:"His surname is Gandhi." },
    { question: "Fastest land animal?", answers:[{text:"Cheetah",correct:true},{text:"Lion",correct:false},{text:"Tiger",correct:false},{text:"Leopard",correct:false}], hint:"It can run 70+ mph." },
    { question: "Capital of France?", answers:[{text:"Paris",correct:true},{text:"Berlin",correct:false},{text:"Rome",correct:false},{text:"Madrid",correct:false}], hint:"City of love." },
    { question: "Largest ocean?", answers:[{text:"Atlantic",correct:false},{text:"Indian",correct:false},{text:"Pacific",correct:true},{text:"Arctic",correct:false}], hint:"Covers more than 30% of Earth." },
    { question: "Smallest country?", answers:[{text:"Monaco",correct:false},{text:"Vatican",correct:true},{text:"Malta",correct:false},{text:"San Marino",correct:false}], hint:"It's inside Rome." },
    { question: "Longest river?", answers:[{text:"Amazon",correct:true},{text:"Nile",correct:false},{text:"Yangtze",correct:false},{text:"Mississippi",correct:false}], hint:"Flows through South America." },
    { question: "Currency of Japan?", answers:[{text:"Yen",correct:true},{text:"Dollar",correct:false},{text:"Won",correct:false},{text:"Rupee",correct:false}], hint:"It's a Japanese currency." },
    { question: "Hottest planet?", answers:[{text:"Mercury",correct:false},{text:"Venus",correct:true},{text:"Mars",correct:false},{text:"Jupiter",correct:false}], hint:"Thick atmosphere traps heat." },
    { question: "Who invented the light bulb?", answers:[{text:"Edison",correct:true},{text:"Tesla",correct:false},{text:"Newton",correct:false},{text:"Bell",correct:false}], hint:"American inventor." }
  ],
  science: [
    { question: "Chemical symbol for water?", answers:[{text:"H2O",correct:true},{text:"O2",correct:false},{text:"CO2",correct:false},{text:"HO",correct:false}], hint:"Two Hydrogen, One Oxygen." },
    { question: "Speed of light?", answers:[{text:"3x10^8 m/s",correct:true},{text:"1.5x10^8 m/s",correct:false},{text:"3x10^6 m/s",correct:false},{text:"3x10^5 m/s",correct:false}], hint:"In vacuum." },
    { question: "Human body's largest organ?", answers:[{text:"Liver",correct:false},{text:"Skin",correct:true},{text:"Heart",correct:false},{text:"Lungs",correct:false}], hint:"Covers the entire body." },
    { question: "Force = Mass x ?", answers:[{text:"Velocity",correct:false},{text:"Acceleration",correct:true},{text:"Distance",correct:false},{text:"Time",correct:false}], hint:"Newton's Second Law." },
    { question: "Planet known as Red Planet?", answers:[{text:"Mars",correct:true},{text:"Venus",correct:false},{text:"Jupiter",correct:false},{text:"Mercury",correct:false}], hint:"Red due to iron oxide." },
    { question: "Boiling point of water?", answers:[{text:"100°C",correct:true},{text:"90°C",correct:false},{text:"80°C",correct:false},{text:"120°C",correct:false}], hint:"At standard pressure." },
    { question: "Atomic number of Oxygen?", answers:[{text:"8",correct:true},{text:"6",correct:false},{text:"16",correct:false},{text:"10",correct:false}], hint:"Number of protons." },
    { question: "What gas do plants release?", answers:[{text:"Oxygen",correct:true},{text:"Carbon Dioxide",correct:false},{text:"Nitrogen",correct:false},{text:"Hydrogen",correct:false}], hint:"Needed for breathing." },
    { question: "pH of pure water?", answers:[{text:"7",correct:true},{text:"6",correct:false},{text:"8",correct:false},{text:"5",correct:false}], hint:"Neutral solution." },
    { question: "Unit of electric current?", answers:[{text:"Ampere",correct:true},{text:"Volt",correct:false},{text:"Ohm",correct:false},{text:"Watt",correct:false}], hint:"Named after French physicist." }
  ],
  tech: [
    { question: "What does HTML stand for?", answers:[{text:"HyperText Markup Language",correct:true},{text:"HighText Markup Language",correct:false},{text:"Hyperlink Text Mark Language",correct:false},{text:"Home Tool Markup Language",correct:false}], hint:"Used for web pages." },
    { question: "CSS is used for?", answers:[{text:"Styling Web Pages",correct:true},{text:"Structure",correct:false},{text:"Logic",correct:false},{text:"Database",correct:false}], hint:"Appearance only." },
    { question: "JS is used for?", answers:[{text:"Dynamic Web Pages",correct:true},{text:"Styling",correct:false},{text:"Server",correct:false},{text:"Database",correct:false}], hint:"Client-side scripting." },
    { question: "Full form of CPU?", answers:[{text:"Central Processing Unit",correct:true},{text:"Computer Personal Unit",correct:false},{text:"Central Power Unit",correct:false},{text:"Control Processing Unit",correct:false}], hint:"Brain of computer." },
    { question: "First programming language?", answers:[{text:"Fortran",correct:true},{text:"C",correct:false},{text:"Python",correct:false},{text:"Java",correct:false}], hint:"Developed in 1950s." },
    { question: "What is Git?", answers:[{text:"Version Control System",correct:true},{text:"Database",correct:false},{text:"IDE",correct:false},{text:"Framework",correct:false}], hint:"Used for code management." },
    { question: "Operating system of iPhone?", answers:[{text:"iOS",correct:true},{text:"Android",correct:false},{text:"Windows",correct:false},{text:"Linux",correct:false}], hint:"Apple's mobile OS." },
    { question: "Most popular search engine?", answers:[{text:"Google",correct:true},{text:"Bing",correct:false},{text:"Yahoo",correct:false},{text:"DuckDuckGo",correct:false}], hint:"Handles billions of searches daily." },
    { question: "CPU stands for?", answers:[{text:"Central Processing Unit",correct:true},{text:"Computer Processing Unit",correct:false},{text:"Control Power Unit",correct:false},{text:"Central Power Unit",correct:false}], hint:"Key computer component." },
    { question: "What is AI?", answers:[{text:"Artificial Intelligence",correct:true},{text:"Automated Internet",correct:false},{text:"Advanced Interface",correct:false},{text:"Algorithm Input",correct:false}], hint:"Machines mimicking humans." }
  ],
  history: [
    { question: "Who was the first President of USA?", answers:[{text:"George Washington",correct:true},{text:"Abraham Lincoln",correct:false},{text:"John Adams",correct:false},{text:"Thomas Jefferson",correct:false}], hint:"1776 independence era." },
    { question: "Who discovered America?", answers:[{text:"Christopher Columbus",correct:true},{text:"Vasco da Gama",correct:false},{text:"Magellan",correct:false},{text:"Marco Polo",correct:false}], hint:"1492 voyage." },
    { question: "When was World War II?", answers:[{text:"1939-1945",correct:true},{text:"1914-1918",correct:false},{text:"1940-1945",correct:false},{text:"1930-1935",correct:false}], hint:"Started with invasion of Poland." },
    { question: "Who was Mahatma Gandhi?", answers:[{text:"Indian freedom fighter",correct:true},{text:"Prime Minister",correct:false},{text:"Scientist",correct:false},{text:"King",correct:false}], hint:"Father of Nation." },
    { question: "Fall of Berlin Wall?", answers:[{text:"1989",correct:true},{text:"1980",correct:false},{text:"1991",correct:false},{text:"1975",correct:false}], hint:"End of Cold War era." },
    { question: "First man on the moon?", answers:[{text:"Neil Armstrong",correct:true},{text:"Buzz Aldrin",correct:false},{text:"Yuri Gagarin",correct:false},{text:"Michael Collins",correct:false}], hint:"1969 Apollo 11 mission." },
    { question: "Invention of printing press?", answers:[{text:"Johannes Gutenberg",correct:true},{text:"Leonardo da Vinci",correct:false},{text:"Isaac Newton",correct:false},{text:"Benjamin Franklin",correct:false}], hint:"15th century Europe." },
    { question: "Who was Cleopatra?", answers:[{text:"Egyptian Queen",correct:true},{text:"Roman Empress",correct:false},{text:"Greek Queen",correct:false},{text:"Persian Queen",correct:false}], hint:"Famous female ruler." },
    { question: "French Revolution year?", answers:[{text:"1789",correct:true},{text:"1776",correct:false},{text:"1804",correct:false},{text:"1799",correct:false}], hint:"Storming of Bastille." },
    { question: "Who wrote 'Iliad'?", answers:[{text:"Homer",correct:true},{text:"Shakespeare",correct:false},{text:"Virgil",correct:false},{text:"Dante",correct:false}], hint:"Ancient Greek poet." }
  ]
};
