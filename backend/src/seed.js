import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Exam from './models/Exam.js';

try {
  await mongoose.connect(process.env.MONGODB_URI);
  let admin = await User.findOne({ email: 'admin@example.com' });
  if (!admin) admin = await User.create({ name: 'Portal Admin', email: 'admin@example.com', passwordHash: await bcrypt.hash('Admin123!', 12), role: 'admin' });
  const quizzes = [
    { title:'C Programming Fundamentals', subject:'C Programming', description:'Variables, loops, arrays and pointers.', durationMinutes:12, questions:[
      {text:'Which symbol ends most C statements?',options:['.','; ',':',','],correctAnswer:1,marks:1},
      {text:'Which format specifier is commonly used to print an int?',options:['%c','%f','%d','%s'],correctAnswer:2,marks:1},
      {text:'Array indexing in C starts at which index?',options:['0','1','-1','Depends on compiler'],correctAnswer:0,marks:1}]},
    { title:'C++ Programming and OOP', subject:'C++ Programming', description:'Classes, inheritance and object-oriented concepts.', durationMinutes:12, questions:[
      {text:'Which feature lets a class derive from another class?',options:['Encapsulation','Inheritance','Compilation','Iteration'],correctAnswer:1,marks:1},
      {text:'Which operator is used to access a member through an object?',options:['::','.','-> only','&'],correctAnswer:1,marks:1},
      {text:'A constructor is primarily used to…',options:['Destroy every object','Initialize an object','Return an integer','Override a variable'],correctAnswer:1,marks:1}]},
    { title:'Java Programming Basics', subject:'Java Programming', description:'Java syntax, strings and object-oriented programming.', durationMinutes:12, questions:[
      {text:'Which keyword creates a subclass relationship in Java?',options:['implements','extends','inherits','superclass'],correctAnswer:1,marks:1},
      {text:'Which type stores true or false?',options:['int','char','boolean','String'],correctAnswer:2,marks:1},
      {text:'Which method is the usual Java application entry point?',options:['start()','run()','main()','init()'],correctAnswer:2,marks:1}]},
    { title:'Python Programming Basics', subject:'Python Programming', description:'Python collections, functions and language basics.', durationMinutes:12, questions:[
      {text:'Which Python collection is mutable and ordered?',options:['tuple','list','frozenset','str'],correctAnswer:1,marks:1},
      {text:'Which keyword defines a function?',options:['func','function','def','lambda'],correctAnswer:2,marks:1},
      {text:'What does len([3, 4, 5]) return?',options:['2','3','4','5'],correctAnswer:1,marks:1}]},
    { title:'Data Structures and Algorithms', subject:'Data Structures & Algorithms', description:'Stacks, complexity and searching algorithms.', durationMinutes:15, questions:[
      {text:'Which principle does a stack follow?',options:['FIFO','LIFO','Random access only','Sorted order'],correctAnswer:1,marks:1},
      {text:'What is binary search time complexity on a sorted array?',options:['O(n)','O(n²)','O(log n)','O(1) always'],correctAnswer:2,marks:1},
      {text:'Which data structure is commonly used for BFS?',options:['Stack','Queue','Heap only','Hash function'],correctAnswer:1,marks:1}]},
    { title:'DBMS and SQL Fundamentals', subject:'DBMS & SQL', description:'Keys, SQL queries and database transactions.', durationMinutes:15, questions:[
      {text:'Which key uniquely identifies a row in a table?',options:['Foreign key','Primary key','Candidate value only','Duplicate key'],correctAnswer:1,marks:1},
      {text:'Which SQL command retrieves rows?',options:['SELECT','UPDATE','INSERT','DROP'],correctAnswer:0,marks:1},
      {text:'What is the main goal of normalization?',options:['Increase duplication','Reduce unwanted redundancy','Encrypt every column','Replace SQL'],correctAnswer:1,marks:1}]},
    { title:'Operating Systems', subject:'Operating Systems', description:'Processes, scheduling and memory management.', durationMinutes:12, questions:[
      {text:'What is a process?',options:['A program in execution','A storage cable','A programming language','A database table'],correctAnswer:0,marks:1},
      {text:'Which is one necessary condition for deadlock?',options:['Circular wait','Compilation','Inheritance','Caching only'],correctAnswer:0,marks:1},
      {text:'Which technique allows processes to share CPU time in turns?',options:['Time slicing','Normalization','Indexing','Parsing'],correctAnswer:0,marks:1}]},
    { title:'Computer Networks', subject:'Computer Networks', description:'OSI layers, protocols and networking basics.', durationMinutes:12, questions:[
      {text:'Which protocol commonly provides reliable, ordered transport?',options:['UDP','TCP','ARP','ICMP only'],correctAnswer:1,marks:1},
      {text:'Which application protocol is used to transfer web pages?',options:['HTTP','SMTP only','FTP only','DHCP'],correctAnswer:0,marks:1},
      {text:'How many layers are in the OSI reference model?',options:['4','5','7','8'],correctAnswer:2,marks:1}]},
    { title:'Software Engineering', subject:'Software Engineering', description:'SDLC, testing and agile development.', durationMinutes:12, questions:[
      {text:'What does SDLC stand for?',options:['Software Development Life Cycle','System Data Link Control','Software Design Language Code','Secure Digital Logic Circuit'],correctAnswer:0,marks:1},
      {text:'Which testing checks a small individual unit?',options:['Unit testing','Acceptance testing only','Load testing','Recovery testing'],correctAnswer:0,marks:1},
      {text:'Scrum is commonly associated with which approach?',options:['Agile development','Waterfall only','Machine code','Database normalization'],correctAnswer:0,marks:1}]},
    { title:'Computer Organization', subject:'Computer Organization', description:'CPU, memory and instruction execution.', durationMinutes:12, questions:[
      {text:'Which component performs arithmetic and logical operations?',options:['ALU','Control bus','Hard disk','Keyboard'],correctAnswer:0,marks:1},
      {text:'Which memory is typically fastest among these?',options:['RAM','CPU registers','SSD','Hard disk'],correctAnswer:1,marks:1},
      {text:'What does CPU stand for?',options:['Central Processing Unit','Computer Primary Utility','Core Program Upload','Central Peripheral User'],correctAnswer:0,marks:1}]},
    { title:'Theory of Computation', subject:'Theory of Computation', description:'Automata, regular languages and Turing machines.', durationMinutes:12, questions:[
      {text:'A DFA has how many transitions for each state and input symbol?',options:['Exactly one','At least three','No transitions','Any number including ambiguity'],correctAnswer:0,marks:1},
      {text:'Regular expressions describe which class of languages?',options:['Regular languages','Only context-sensitive languages','Only natural languages','All undecidable languages'],correctAnswer:0,marks:1},
      {text:'A Turing machine is a model of…',options:['Computation','Network routing','Database joins','CSS layout'],correctAnswer:0,marks:1}]},
    { title:'Compiler Design', subject:'Compiler Design', description:'Lexing, parsing and compiler phases.', durationMinutes:12, questions:[
      {text:'Which compiler phase converts characters into tokens?',options:['Lexical analysis','Code optimization','Linking','Register allocation'],correctAnswer:0,marks:1},
      {text:'Which structure commonly represents syntax?',options:['Parse tree','Routing table','Hash salt','Queue scheduler'],correctAnswer:0,marks:1},
      {text:'Which phase checks program meaning and types?',options:['Semantic analysis','Lexical analysis only','Loading','Packet switching'],correctAnswer:0,marks:1}]},
    { title:'Web Development Essentials', subject:'Web Development', description:'HTML, CSS, JavaScript and web APIs.', durationMinutes:12, questions:[
      {text:'Which language primarily styles web pages?',options:['HTML','CSS','SQL','Python'],correctAnswer:1,marks:1},
      {text:'What does HTML provide?',options:['Page structure','Database transactions','Operating-system scheduling','Encryption keys'],correctAnswer:0,marks:1},
      {text:'Which HTTP method is commonly used to retrieve a resource?',options:['GET','DELETE','PATCH','CONNECT only'],correctAnswer:0,marks:1}]},
    { title:'Artificial Intelligence and Machine Learning', subject:'Artificial Intelligence & ML', description:'AI concepts, model training and supervised learning.', durationMinutes:15, questions:[
      {text:'In supervised learning, training data typically includes…',options:['Inputs only','Inputs and target labels','No examples','Only random numbers'],correctAnswer:1,marks:1},
      {text:'Which task predicts a continuous numeric value?',options:['Regression','Classification','Clustering only','Tokenization'],correctAnswer:0,marks:1},
      {text:'What is overfitting?',options:['Model performs well on training data but poorly on unseen data','Model has no parameters','Data is always encrypted','A model never trains'],correctAnswer:0,marks:1}]},
    { title:'Cybersecurity Fundamentals', subject:'Cybersecurity', description:'Authentication, encryption and common threats.', durationMinutes:12, questions:[
      {text:'What does multi-factor authentication require?',options:['Two or more distinct factor types','Two usernames only','A longer screen','Only a public profile'],correctAnswer:0,marks:1},
      {text:'What is phishing?',options:['A deceptive attempt to obtain sensitive information','A sorting algorithm','A database backup','A network cable type'],correctAnswer:0,marks:1},
      {text:'Why is password hashing used?',options:['To store a verifier without storing the plaintext password','To make passwords visible','To remove login checks','To share passwords publicly'],correctAnswer:0,marks:1}]},
    { title:'Cloud Computing', subject:'Cloud Computing', description:'Cloud service models and virtualization.', durationMinutes:12, questions:[
      {text:'Which model provides a managed platform to deploy applications?',options:['PaaS','IaaS only','On-premises only','DNS'],correctAnswer:0,marks:1},
      {text:'What is virtualization?',options:['Creating virtual versions of computing resources','Deleting every server','Writing CSS','Encrypting a spreadsheet'],correctAnswer:0,marks:1},
      {text:'Which cloud model offers software over the internet?',options:['SaaS','RAM','ALU','LAN'],correctAnswer:0,marks:1}]},
    { title:'Data Science Fundamentals', subject:'Data Science', description:'Data analysis, statistics and visualization.', durationMinutes:12, questions:[
      {text:'Which Python library is widely used for tabular data analysis?',options:['pandas','Flask only','Pygame','Turtle only'],correctAnswer:0,marks:1},
      {text:'Which measure is the middle value of ordered data?',options:['Mean','Median','Range','Variance'],correctAnswer:1,marks:1},
      {text:'What is data visualization used for?',options:['Communicating patterns through visual representations','Replacing all data collection','Hashing passwords','Compiling code'],correctAnswer:0,marks:1}]},
    { title:'Computer Science Mathematics', subject:'Computer Science Mathematics', description:'Logic, sets, relations and graph theory.', durationMinutes:12, questions:[
      {text:'A proposition in logic is a statement that has…',options:['A truth value','Always two variables','Only a number','No meaning'],correctAnswer:0,marks:1},
      {text:'How many elements are in the power set of a set with 3 elements?',options:['3','6','8','9'],correctAnswer:2,marks:1},
      {text:'In an undirected graph, an edge connects…',options:['Two vertices','Two databases','Two functions only','Two IP addresses always'],correctAnswer:0,marks:1}]}
  ];
  for (const quiz of quizzes) {
    await Exam.findOneAndUpdate(
      { title: quiz.title },
      { $setOnInsert: { ...quiz, published: true, createdBy: admin._id } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log('Seed complete. Admin: admin@example.com / Admin123!');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally { await mongoose.disconnect(); }
