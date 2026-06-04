export interface WeekCurriculum {
  week: number | string;
  topic: string;
  outcomes: string[];
}

export interface CourseDetail {
  id?: string;
  slug: string;
  name: string;
  duration: string;
  level: string;
  shortDescription: string;
  icon: string;
  about: string;
  features: string[];
  skills: string[];
  projects: {
    title: string;
    description: string;
    tech?: string[];
  }[];
  careers: {
    career: string;
    salary: string;
  }[];
  weeks: WeekCurriculum[];
  imgSrc: string;
  mentor: string;
  price: number;
  rating: number;
  bestSeller: boolean;
  classes: number;
  students: number;
}

export const coursesData: CourseDetail[] = [
  {
    slug: 'core-ai',
    name: 'AI Tools + Automation',
    duration: '1 Month',
    level: 'Beginner to Intermediate',
    shortDescription: 'Learn Artificial Intelligence, Prompt Engineering, Automation Tools, Machine Learning Fundamentals, Deep Learning, and GenAI APIs.',
    icon: 'solar:cpu-bolt-bold-duotone',
    imgSrc: '/images/courses/ai-tools.png',
    mentor: 'Himanshu Sanadhya (CEO)',
    price: 5999,
    rating: 4.7,
    bestSeller: true,
    classes: 22,
    students: 15,
    about: 'Unlock the power of Artificial Intelligence in our intensive 1-Month Core AI program. This course is designed for professionals, developers, and tech enthusiasts looking to build a strong foundation in modern AI. You will learn everything from machine learning basics to advanced prompt engineering, API integrations, and workflow automation. By the end of this course, you will be equipped to design, build, and deploy intelligent workflows and applications.',
    features: [
      'AI Fundamentals',
      'Machine Learning Basics',
      'Deep Learning Concepts',
      'Prompt Engineering',
      'ChatGPT & Gemini',
      'AI Productivity Tools',
      'No-Code Automation',
      'AI Workflow Design',
      'LangChain Introduction',
      'OpenAI API Integration'
    ],
    skills: [
      'Use AI tools professionally',
      'Build AI workflows',
      'Create AI chatbots',
      'Automate business tasks',
      'Understand machine learning concepts',
      'Integrate AI APIs',
      'Improve productivity using AI'
    ],
    projects: [
      {
        title: 'AI Marketing Workflow',
        description: 'Design and build an automated content generation and publishing pipeline utilizing Zapier/Make and ChatGPT APIs.',
        tech: ['OpenAI API', 'Make.com', 'Zapier', 'Prompt Engineering']
      },
      {
        title: 'AI Chatbot Deployment',
        description: 'Develop and deploy a custom context-aware customer service chatbot trained on specific business data.',
        tech: ['LangChain', 'Python', 'OpenAI API', 'Streamlit']
      }
    ],
    careers: [
      { career: 'AI Automation Specialist', salary: '₹8 - 15 LPA' },
      { career: 'Prompt Engineer', salary: '₹6 - 12 LPA' },
      { career: 'AI Consultant', salary: '₹10 - 20 LPA' },
      { career: 'Business Automation Executive', salary: '₹5 - 10 LPA' }
    ],
    weeks: [
      {
        week: 1,
        topic: 'AI Fundamentals & Machine Learning Basics',
        outcomes: [
          'Understand the difference between AI, Machine Learning, and Deep Learning.',
          'Learn basic ML concepts like supervised and unsupervised learning.',
          'Get comfortable with the AI landscape and current industry tools.'
        ]
      },
      {
        week: 2,
        topic: 'Prompt Engineering & Chatbots (ChatGPT / Gemini)',
        outcomes: [
          'Master professional prompting techniques (role-play, few-shot prompting).',
          'Learn to build custom GPTs and optimize AI outputs for accuracy.',
          'Understand hallucination mitigation strategies.'
        ]
      },
      {
        week: 3,
        topic: 'AI Productivity Tools & No-Code Automation',
        outcomes: [
          'Integrate AI into daily workflows using no-code platforms like Make.com and Zapier.',
          'Automate content creation, email sorting, and spreadsheet operations.',
          'Save hours of manual tasks using custom agent workflows.'
        ]
      },
      {
        week: 4,
        topic: 'APIs, LangChain Introduction & Capstone Project',
        outcomes: [
          'Connect to OpenAI & Gemini APIs using Python or Node.js.',
          'Understand the core concepts of LangChain (Chains, Prompts, Memory).',
          'Deploy your final Capstone AI Marketing Workflow project.'
        ]
      }
    ]
  },

  {
    slug: 'devops-cloud',
    name: 'DevOps + Cloud',
    duration: '2 Months',
    level: 'Intermediate to Advanced',
    shortDescription: 'Learn Linux, Git, Docker, AWS, CI/CD Pipelines, Kubernetes, and Cloud Deployment.',
    icon: 'solar:cloud-bold-duotone',
    imgSrc: '/images/courses/devops.png',
    mentor: 'Kunal Sangwan (AI Engineer)',
    price: 12999,
    rating: 4.8,
    bestSeller: false,
    classes: 45,
    students: 15,
    about: 'Bridge the gap between development and operations in this 2-Month DevOps & Cloud training. Learn to manage server environments, package applications in lightweight containers, scale microservices, and automate deployment pipelines. With cloud computing becoming the industry standard, this course gives you the tools needed to build, monitor, and scale enterprise applications on modern cloud providers.',
    features: [
      'Linux',
      'Git & GitHub',
      'Shell Scripting',
      'Docker',
      'CI/CD Pipelines',
      'Jenkins',
      'AWS',
      'Kubernetes',
      'Monitoring',
      'Cloud Deployment'
    ],
    skills: [
      'Deploy applications',
      'Manage cloud infrastructure',
      'Automate deployments',
      'Configure servers',
      'Build production-ready systems'
    ],
    projects: [
      {
        title: 'Dockerized Application Stack',
        description: 'Containerize a complex MERN or Python web application along with database and cache layers.',
        tech: ['Docker', 'Docker Compose', 'Multi-stage Builds', 'Nginx']
      },
      {
        title: 'AWS Automated Infrastructure',
        description: 'Deploy a highly-available web infrastructure using load balancers, EC2 auto-scaling, and managed databases.',
        tech: ['AWS EC2', 'VPC', 'RDS', 'Application Load Balancer']
      },
      {
        title: 'Full CI/CD Pipeline',
        description: 'Create an automated pipeline that builds, tests, security-scans, and deploys code changes on git commit.',
        tech: ['GitHub Actions', 'Docker Hub', 'AWS ECS', 'SonarQube']
      }
    ],
    careers: [
      { career: 'DevOps Engineer', salary: '₹8 - 18 LPA' },
      { career: 'Cloud Engineer', salary: '₹7 - 16 LPA' },
      { career: 'Site Reliability Engineer (SRE)', salary: '₹10 - 22 LPA' },
      { career: 'Platform Engineer', salary: '₹9 - 20 LPA' }
    ],
    weeks: [
      {
        week: '1 - 2',
        topic: 'Linux Basics, Command Line & Git Version Control',
        outcomes: [
          'Navigate Linux filesystems, manage permissions, and configure users.',
          'Automate repeating system maintenance tasks using Bash scripting.',
          'Manage complex branching strategies and collaboration workflows using Git & GitHub.'
        ]
      },
      {
        week: '3 - 4',
        topic: 'Containerization with Docker & Application Orchestration',
        outcomes: [
          'Write custom Dockerfiles using multi-stage builds to optimize image size.',
          'Manage multi-container application stacks using Docker Compose.',
          'Understand container networking, storage volumes, and environment variables.'
        ]
      },
      {
        week: '5 - 6',
        topic: 'AWS Cloud Services & Systems Engineering',
        outcomes: [
          'Design and secure virtual private networks (VPCs) on AWS.',
          'Configure auto-scaling groups and elastic load balancing for web traffic.',
          'Understand cloud databases (RDS), storage buckets (S3), and access management (IAM).'
        ]
      },
      {
        week: '7 - 8',
        topic: 'CI/CD Automation, Kubernetes & Systems Monitoring',
        outcomes: [
          'Build pipelines using Jenkins and GitHub Actions for continuous deployment.',
          'Orchestrate, manage, and scale containers using Kubernetes clusters.',
          'Configure active monitoring, metrics dashboards, and alerts using Prometheus and Grafana.'
        ]
      }
    ]
  },

  {
    slug: 'fullstack-mern',
    name: 'Full Stack MERN Engineering',
    duration: '3 Months',
    level: 'Beginner to Advanced',
    shortDescription: 'Master MongoDB, Express.js, React.js, Node.js, REST APIs, global state management, and production-ready cloud deployment.',
    icon: 'solar:code-file-bold-duotone',
    imgSrc: '/images/courses/mern.webp',
    mentor: 'Tushar (CTO)',
    price: 12999,
    rating: 4.8,
    bestSeller: true,
    classes: 45,
    students: 15,
    about: 'Accelerate your career as a professional Full-Stack Web Developer. In this comprehensive 3-Month program, you will learn the MongoDB, Express.js, React.js, and Node.js (MERN) stack from absolute scratch to advanced deployment patterns. You will design highly responsive user interfaces, build secure REST APIs with scalable middleware, work with database schemas, and deploy production-ready applications to cloud infrastructure.',
    features: [
      'HTML5 & CSS3 Essentials',
      'Modern JavaScript (ES6+)',
      'React.js Component Architecture',
      'Redux Toolkit State Management',
      'Node.js & Express.js Servers',
      'MongoDB Document Schema Design',
      'RESTful API Development',
      'JWT Authentication & Cookies',
      'Vercel & Render Cloud Deployment',
      'Git Version Control & Agile Workflows'
    ],
    skills: [
      'Build responsive Single Page Applications',
      'Design modular database schemas',
      'Create secure web backends',
      'Implement secure user authorization',
      'Deploy full-stack projects to the cloud'
    ],
    projects: [
      {
        title: 'E-Commerce Marketplace Backend',
        description: 'Design a secure shopping REST API complete with user roles, product catalogs, database models, and payment checkouts.',
        tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT']
      },
      {
        title: 'Real-time Collaboration Workspace',
        description: 'A modern workspace dashboard where teams can edit documents together in real-time.',
        tech: ['React.js', 'Redux Toolkit', 'Socket.io', 'Node.js']
      }
    ],
    careers: [
      { career: 'MERN Stack Developer', salary: '₹6 - 15 LPA' },
      { career: 'Full Stack Engineer', salary: '₹7 - 18 LPA' },
      { career: 'Frontend Web Developer', salary: '₹5 - 12 LPA' },
      { career: 'Backend Engineer', salary: '₹6 - 16 LPA' }
    ],
    weeks: [
      {
        week: '1 - 3',
        topic: 'Advanced Frontend & React Development',
        outcomes: [
          'Master JSX, props, state, and complex component lifecycle events.',
          'Configure absolute styling, custom layouts, and responsive designs.',
          'Implement globally accessible state using Context API and Redux Toolkit.'
        ]
      },
      {
        week: '4 - 6',
        topic: 'Backend Engineering with Node.js & Express',
        outcomes: [
          'Build lightweight servers, custom middleware pipelines, and controllers.',
          'Design clean MVC directory architecture for large-scale codebases.',
          'Validate complex user input models and handle error states gracefully.'
        ]
      },
      {
        week: '7 - 9',
        topic: 'Database Modeling & Schema Design in MongoDB',
        outcomes: [
          'Establish persistent clusters and design optimized entity schemas.',
          'Configure relational references, compound search indexes, and database aggregations.',
          'Write highly efficient database queries with low execution overhead.'
        ]
      },
      {
        week: '10 - 12',
        topic: 'Authentication, API Security & Cloud Deployment',
        outcomes: [
          'Enforce secure authorization layers using JWT cookies and password hashing.',
          'Protect APIs against cross-origin attacks, SQL/NoSQL injections, and rate limits.',
          'Host and serve MERN assets using automated AWS, Render, and Vercel workflows.'
        ]
      }
    ]
  },
  {
    slug: 'flutter-android',
    name: 'Flutter Android',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    shortDescription: 'Build modern Android applications using Flutter, Firebase, APIs, and Play Store Deployment.',
    icon: 'solar:smartphone-bold-duotone',
    imgSrc: '/images/courses/flutter.png',
    mentor: 'Tushar (CTO)',
    price: 24999,
    rating: 4.6,
    bestSeller: false,
    classes: 67,
    students: 15,
    about: 'Learn cross-platform mobile app development in this hands-on 3-Month course. Using Dart and Flutter, you will design stunning native user interfaces and connect them to real-time backends. You will build and publish completely native Android (and iOS) applications. Perfect for designers, frontend developers, and absolute beginners aiming to publish mobile apps on the Google Play Store.',
    features: [
      'Dart Programming',
      'Flutter Framework',
      'Widgets',
      'State Management',
      'Firebase',
      'API Integration',
      'Local Storage',
      'Authentication',
      'Device Features',
      'Play Store Deployment'
    ],
    skills: [
      'Build Android apps',
      'Develop cross-platform apps',
      'Integrate APIs',
      'Use Firebase',
      'Publish applications'
    ],
    projects: [
      {
        title: 'Notes App',
        description: 'A beautiful local diary and note-taking application using offline databases and custom category tags.',
        tech: ['Flutter', 'Dart', 'Hive DB', 'Shared Preferences']
      },
      {
        title: 'E-Commerce App Interface',
        description: 'Complete mobile shopping application with cart states, product filtering, animations, and checkout system.',
        tech: ['Flutter', 'Dart', 'Provider State Management', 'Stripe SDK']
      },
      {
        title: 'Real-time Chat Application',
        description: 'A messaging app with instant text delivery, profile updates, and active user status signals.',
        tech: ['Flutter', 'Firebase Auth', 'Firestore', 'Firebase Storage']
      }
    ],
    careers: [
      { career: 'Flutter Developer', salary: '₹5 - 14 LPA' },
      { career: 'Mobile App Developer', salary: '₹6 - 15 LPA' },
      { career: 'Android Developer', salary: '₹5 - 13 LPA' }
    ],
    weeks: [
      {
        week: '1 - 3',
        topic: 'Dart Programming Language Essentials',
        outcomes: [
          'Learn basic programming concepts: control flow, variables, and arrays.',
          'Master Dart Object-Oriented Programming (OOP) classes, inheritances, and mixins.',
          'Understand asynchronous operations (Futures, Async/Await, and Streams) in Dart.'
        ]
      },
      {
        week: '4 - 6',
        topic: 'Flutter UI Design & Custom Widgets',
        outcomes: [
          'Design interactive and complex layouts using built-in Flutter widgets.',
          'Implement animations, custom themes, fonts, and responsive media query assets.',
          'Build forms with validation and capture user text inputs.'
        ]
      },
      {
        week: '7 - 9',
        topic: 'State Management & REST API Integrations',
        outcomes: [
          'Manage app-wide state variables efficiently using Provider or Bloc.',
          'Perform HTTP requests to fetch, post, and render data from external REST APIs.',
          'Cache API responses locally using SQLite or Hive databases.'
        ]
      },
      {
        week: '10 - 12',
        topic: 'Firebase Backend, Device Hardware & App Deployment',
        outcomes: [
          'Implement Google, email, and anonymous authentication.',
          'Use Firestore database for real-time document synchronization.',
          'Integrate camera, push notifications, and release your app on the Google Play Store.'
        ]
      }
    ]
  },
  {
    slug: 'genai-fullstack',
    name: 'GenAI + Full Stack',
    duration: '3 Months',
    level: 'Advanced',
    shortDescription: 'Build AI-powered SaaS applications using MERN Stack, OpenAI, Gemini, Claude APIs, LangChain, and RAG.',
    icon: 'solar:magic-stick-bold-duotone',
    imgSrc: '/images/courses/genai.png',
    mentor: 'Kunal Sangwan (AI Engineer)',
    price: 24999,
    rating: 5.0,
    bestSeller: true,
    classes: 67,
    students: 15,
    about: 'Position yourself at the forefront of the tech industry by learning how to build Generative AI products. In this 3-Month program, you will combine MERN stack development with cutting-edge LLMs (Large Language Models). You will build advanced applications like document Q&A tools, AI autonomous agents, and AI writing assistants. Designed for web developers who want to transition to AI product development.',
    features: [
      'MERN Stack',
      'OpenAI API',
      'Gemini API',
      'Claude API',
      'Prompt Engineering',
      'LangChain',
      'RAG Systems',
      'AI Agents',
      'SaaS Architecture',
      'AI Product Development'
    ],
    skills: [
      'Build ChatGPT-like applications',
      'Create AI SaaS products',
      'Develop AI business tools',
      'Build AI agents',
      'Integrate multiple LLMs'
    ],
    projects: [
      {
        title: 'AI Writing Assistant SaaS',
        description: 'A platform that helps creators write and optimize posts, complete with Stripe subscriptions and AI editing tools.',
        tech: ['Next.js', 'Tailwind CSS', 'OpenAI API', 'Stripe Billing']
      },
      {
        title: 'Document Q&A System (RAG)',
        description: 'Upload PDFs and files to converse with them, powered by semantic search and vector embeddings.',
        tech: ['LangChain', 'Pinecone Vector DB', 'Node.js', 'Express.js']
      },
      {
        title: 'AI HR Recruiter Agent',
        description: 'An autonomous agent that scans resume data, ranks matches, and emails short-listed candidates.',
        tech: ['LangGraph', 'Python', 'Gemini API', 'Resend API']
      }
    ],
    careers: [
      { career: 'AI Engineer', salary: '₹10 - 25 LPA' },
      { career: 'GenAI Developer', salary: '₹9 - 22 LPA' },
      { career: 'AI Product Engineer', salary: '₹10 - 24 LPA' },
      { career: 'AI Solutions Architect', salary: '₹15 - 35 LPA' }
    ],
    weeks: [
      {
        week: '1 - 3',
        topic: 'Full-Stack MERN Engineering Refresher',
        outcomes: [
          'Setup a modular full-stack client-server architecture with React and Express.',
          'Model relational database patterns in MongoDB and design APIs.',
          'Implement secure user session handling and JWT authorization.'
        ]
      },
      {
        week: '4 - 6',
        topic: 'AI Models Core Integration (OpenAI, Gemini, Claude)',
        outcomes: [
          'Interact with API models, handle JSON outputs, and stream responses in real-time.',
          'Master chat memory, system templates, and token budget optimizations.',
          'Build custom prompt pipelines to reduce API latency and costs.'
        ]
      },
      {
        week: '7 - 9',
        topic: 'Vector DBs, Semantic Search & RAG Architectures',
        outcomes: [
          'Convert unstructured data/files into vector embeddings.',
          'Create search indexing and filtering workflows using Pinecone, ChromaDB, or pgvector.',
          'Build a context-rich retrieval pipeline for accurate document Q&A.'
        ]
      },
      {
        week: '10 - 12',
        topic: 'Autonomous Agents & SaaS Commercialization',
        outcomes: [
          'Design tool-use AI systems that can search the web and run scripts.',
          'Understand Multi-Agent frameworks (LangGraph, CrewAI) for team tasks.',
          'Implement Stripe billing subscription systems and deploy the SaaS to AWS or Vercel.'
        ]
      }
    ]
  },
  {
    slug: 'all-integrated-mega',
    name: 'All Integrated Mega Course',
    duration: '4 Months (16 Weeks)',
    level: 'Beginner to Expert',
    shortDescription: 'The ultimate roadmap: Full-Stack MERN development, dynamic DevOps & Cloud deployments, and Generative AI application engineering.',
    icon: 'solar:globus-bold-duotone',
    imgSrc: '/images/courses/react.webp',
    mentor: 'Himanshu Sanadhya (CEO) & Kunal Sangwan',
    price: 24999,
    rating: 5.0,
    bestSeller: true,
    classes: 90,
    students: 15,
    about: 'The ultimate software engineering blueprint. In this elite 4-Month (16-Week) program, you will transition from a coding novice into a highly competitive multi-disciplinary engineer. You will master full-stack MERN engineering, deploy containerized architectures on the Cloud using standard DevOps pipelines, and engineer state-of-the-art Generative AI applications powered by RAG, LangChain, and advanced Vector DBs. This is the complete, all-inclusive masterclass designed to launch the next wave of high-impact technical leaders.',
    features: [
      'Complete MERN Stack',
      'Advanced DevOps & Git',
      'AWS & Cloud Infrastructure',
      'Docker & Multi-Container stacks',
      'Kubernetes Cluster Management',
      'Generative AI & LLM APIs',
      'LangChain & Multi-Agents Frameworks',
      'Vector Databases & RAG Architectures',
      'CI/CD Pipelines & Jenkins',
      'Enterprise System Design'
    ],
    skills: [
      'Build state-of-the-art AI SaaS',
      'Deploy robust containerized microservices',
      'Design enterprise-scale database environments',
      'Orchestrate secure AWS cloud infrastructures',
      'Master end-to-end full stack software engineering'
    ],
    projects: [
      {
        title: 'Enterprise AI-Driven SaaS Application',
        description: 'Develop and deploy a complete AI platform offering document insights, natural chat, real-time metrics, auto-scaling cloud deploys, and automated billing.',
        tech: ['Next.js', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Pinecone Vector DB']
      }
    ],
    careers: [
      { career: 'Lead Software Engineer', salary: '₹14 - 30 LPA' },
      { career: 'Full Stack AI Solutions Architect', salary: '₹18 - 40 LPA' },
      { career: 'Senior Platform Developer', salary: '₹12 - 26 LPA' },
      { career: 'AI Technical Consultant', salary: '₹12 - 28 LPA' }
    ],
    weeks: [
      {
        week: '1 - 4',
        topic: 'Professional Full-Stack Web Development (MERN)',
        outcomes: [
          'Write industry-standard MERN applications using React and Node.js.',
          'Establish robust REST and GraphQL API gateways with real-time sockets.',
          'Implement granular user permissions and active profile states.'
        ]
      },
      {
        week: '5 - 8',
        topic: 'Systems Engineering & Cloud Infrastructure (DevOps)',
        outcomes: [
          'Package, optimize, and build multi-stage Docker application container stacks.',
          'Configure high-availability architectures on AWS using VPCs, Load Balancers, and EC2s.',
          'Automate tests, build stages, and secure deploys using CI/CD pipelines.'
        ]
      },
      {
        week: '9 - 12',
        topic: 'Generative AI & Intelligent Agents Integration',
        outcomes: [
          'Develop and secure semantic search pipelines using LangChain and Pinecone vector database.',
          'Construct custom retrieval augmented generation (RAG) contexts for intelligent Q&A.',
          'Design autonomous Multi-Agent networks capable of solving complex enterprise workflows.'
        ]
      },
      {
        week: '13 - 16',
        topic: 'Enterprise Scaling, Security & Capstone Deployment',
        outcomes: [
          'Orchestrate container auto-scaling and failover processes using Kubernetes clusters.',
          'Perform load testing, analyze system design latencies, and optimize query indexes.',
          'Launch a commercial AI SaaS platform onto live production cloud servers.'
        ]
      }
    ]
  }
];

