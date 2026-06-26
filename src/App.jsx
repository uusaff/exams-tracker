import { useState, useEffect } from 'react';
import bgImage from './assets/bg.jpg';

// Common Progress Circle Component
const ProgressCircle = ({ progress, size = 60, strokeWidth = 5, color = "stroke-cyan-300" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="stroke-neutral-700"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${color} transition-all duration-300 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ textShadow: "0 0 10px rgba(56, 189, 248, 0.5)" }}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-white">{progress}%</span>
    </div>
  );
};

// Urgency Slider Component (Transitions Green -> Red)
const UrgencySlider = ({ dateString }) => {
  // Extracting date assuming format like "06 Jul 2026 (Mon)"
  const datePart = dateString.split(' (')[0];
  const examDate = new Date(datePart);
  const today = new Date(); // Dynamically checks current date
  
  const timeDiff = examDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  // Max window to base the 100% width on (approx 15 days)
  const maxDays = 15;
  const fillPercentage = Math.max(0, Math.min(100, (daysLeft / maxDays) * 100));

  let sliderColor = "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"; 
  let trackColor = "bg-emerald-950/30 border-emerald-500/20";
  let textColor = "text-emerald-400";
  let label = `${daysLeft} Days Left`;

  if (daysLeft <= 0) {
    sliderColor = "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.9)]";
    trackColor = "bg-red-950/30 border-red-500/20";
    textColor = "text-red-500 font-bold animate-pulse";
    label = daysLeft === 0 ? "EXAM TODAY!" : "EXAM PASSED";
  } else if (daysLeft <= 3) {
    sliderColor = "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"; // Red
    trackColor = "bg-red-950/30 border-red-500/20";
    textColor = "text-red-400 font-bold animate-pulse";
  } else if (daysLeft <= 7) {
    sliderColor = "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]"; // Yellow/Orange
    trackColor = "bg-amber-950/30 border-amber-500/20";
    textColor = "text-amber-400";
  } else if (daysLeft <= 10) {
    sliderColor = "bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]"; // Yellow-Green
    trackColor = "bg-lime-950/30 border-lime-500/20";
    textColor = "text-lime-400";
  }

  return (
    <div className={`mt-2 mb-4 p-3 rounded-xl border ${trackColor} bg-black/40`}>
      <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-2">
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Timeline
        </span>
        <span className={`${textColor} tracking-wide font-semibold`}>
          {label}
        </span>
      </div>
      
      {/* Slider Background */}
      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-black shadow-inner">
        {/* Slider Thumb */}
        <div 
          className={`h-full ${sliderColor} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${daysLeft > 0 ? fillPercentage : 100}%` }} 
        />
      </div>
    </div>
  );
};

// Full Data Extracted from Excel
const initialData = [
  {
    id: 'ds', name: 'Data Structures', date: '06 Jul 2026 (Mon)', time: '08:30 AM – 10:30 AM', venue: 'SST1-103',
    syllabus: [
      { id: 'ds1', topic: '1. TREE', completed: false },
      { id: 'ds2', topic: '2. BST', completed: false },
      { id: 'ds3', topic: '3. ADT', completed: false },
      { id: 'ds4', topic: '4. AVL', completed: false },
      { id: 'ds5', topic: '5. SELF BALANCE TREE', completed: false },
      { id: 'ds6', topic: '6. HEAP', completed: false },
      { id: 'ds7', topic: '7. GRAPHS', completed: false },
      { id: 'ds8', topic: '8. SORTING', completed: false },
      { id: 'ds9', topic: '9. BFS & DFS', completed: false },
      { id: 'ds10', topic: '10. SPANNING TREE', completed: false },
      { id: 'ds11', topic: '11. MIN SPAN TREE', completed: false },
      { id: 'ds12', topic: '12. SHORTEST DIST', completed: false },
      { id: 'ds13', topic: '13. THE 3 ALGOS', completed: false },
    ]
  },
  {
    id: 'sw', name: 'Software', date: '07 Jul 2026 (Tue)', time: '11:00 AM – 01:00 PM', venue: 'Venue TBA',
    syllabus: [
      { id: 'sw1', topic: '5th May Lectures', completed: false },
      { id: 'sw2', topic: '2026-05-08 Notes', completed: false },
      { id: 'sw3', topic: '2026-05-15 Notes', completed: false },
      { id: 'sw4', topic: '2026-05-19 Notes', completed: false },
      { id: 'sw5', topic: '2026-05-22 Notes', completed: false },
      { id: 'sw6', topic: '2026-05-26 Notes', completed: false },
      { id: 'sw7', topic: '2026-05-29 Notes', completed: false },
      { id: 'sw8', topic: '2026-06-02 Notes', completed: false },
      { id: 'sw9', topic: '2026-06-05 Notes', completed: false },
      { id: 'sw10', topic: '2026-06-09 Notes', completed: false },
      { id: 'sw11', topic: '2026-06-12 Notes', completed: false },
    ]
  },
  {
    id: 'coal', name: 'COAL', date: '08 Jul 2026 (Wed)', time: '11:00 AM – 01:00 PM', venue: 'CB2-704',
    syllabus: [
      { id: 'cl1', topic: 'CHAPTER 5', completed: false },
      { id: 'cl2', topic: 'CHAPTER 6', completed: false },
      { id: 'cl3', topic: 'CHAPTER 7', completed: false },
      { id: 'cl4', topic: 'CHAPTER 8', completed: false },
      { id: 'cl5', topic: 'CHAPTER 9', completed: false },
      { id: 'cl6', topic: 'CHAPTER 10', completed: false },
    ]
  },
  {
    id: 'stats', name: 'Probability & Stats', date: '09 Jul 2026 (Thu)', time: '08:30 AM – 10:30 AM', venue: 'SST1-107 / 108',
    syllabus: [
      { id: 'st1', topic: 'LECTURE 15 TO 28', completed: false },
      { id: 'st2', topic: 'Q1. 8 MARKS', completed: false },
      { id: 'st3', topic: 'Counting tech sample space', completed: false },
      { id: 'st4', topic: 'Intro to probability', completed: false },
      { id: 'st5', topic: 'Laws of probability', completed: false },
      { id: 'st6', topic: 'Q2. 8 MARKS', completed: false },
      { id: 'st7', topic: 'Conditional probability', completed: false },
      { id: 'st8', topic: 'Bayes theorem', completed: false },
      { id: 'st9', topic: 'Q3. 8 MARKS', completed: false },
      { id: 'st10', topic: 'Correlation', completed: false },
      { id: 'st11', topic: 'Regression', completed: false },
      { id: 'st12', topic: 'Q4. 8 MARKS', completed: false },
      { id: 'st13', topic: 'Probability dist func', completed: false },
      { id: 'st14', topic: 'Binomial probability dist', completed: false },
      { id: 'st15', topic: 'Q5. 8 MARKS', completed: false },
      { id: 'st16', topic: 'Geometric prob dist', completed: false },
      { id: 'st17', topic: 'Normal distribution', completed: false },
      { id: 'st18', topic: 'Exponential distribution', completed: false },
    ]
  },
  {
    id: 'la', name: 'Linear Algebra', date: '09 Jul 2026 (Thu)', time: '11:00 AM – 01:00 PM', venue: 'Venue TBA',
    syllabus: [
      { id: 'la1', topic: 'Q1. 8 MARKS', completed: false },
      { id: 'la2', topic: 'Ex 4.1 (1-12)', completed: false },
      { id: 'la3', topic: 'Ex 4.2 (1-16)', completed: false },
      { id: 'la4', topic: 'Q2. 8 MARKS', completed: false },
      { id: 'la5', topic: 'Ex 4.3 (1-10)', completed: false },
      { id: 'la6', topic: 'Ex 4.4 (1-14)', completed: false },
      { id: 'la7', topic: 'Ex 4.5 (1-18)', completed: false },
      { id: 'la8', topic: 'Q3. 8 MARKS', completed: false },
      { id: 'la9', topic: 'Ex 4.6 (1-6)', completed: false },
      { id: 'la10', topic: 'Ex 4.9 (1,2)', completed: false },
      { id: 'la11', topic: 'Q4. 8 MARKS', completed: false },
      { id: 'la12', topic: 'Ex 5.1 (1-12)', completed: false },
      { id: 'la13', topic: 'Ex 5.2 (5-20)', completed: false },
      { id: 'la14', topic: 'Q5. 8 MARKS', completed: false },
      { id: 'la15', topic: 'Ex 6.1 (1-26)', completed: false },
      { id: 'la16', topic: 'Ex 6.3 (27-31, 45-49)', completed: false },
    ]
  }
];

export default function App() {
  const [subjects, setSubjects] = useState(() => {
    // Loaded from a new cache key (v2) so you immediately see all 5 subjects
    const saved = localStorage.getItem('examTrackerState_v2');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [autoSaveStatus, setAutoSaveStatus] = useState('SYNCED');

  // Auto-Save Effect
  useEffect(() => {
    setAutoSaveStatus('SAVING...');
    const timer = setTimeout(() => {
      localStorage.setItem('examTrackerState_v2', JSON.stringify(subjects));
      setAutoSaveStatus('SYNCED');
    }, 500);
    return () => clearTimeout(timer);
  }, [subjects]);

  // Update logic (Tick Box modification)
  const toggleTopic = (subjectId, topicId) => {
    setSubjects(prev => prev.map(sub => {
      if (sub.id === subjectId) {
        return {
          ...sub,
          syllabus: sub.syllabus.map(topic => 
            topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
          )
        };
      }
      return sub;
    }));
  };

  // Calculations
  const calculateProgress = (syllabus) => {
    if (syllabus.length === 0) return 0;
    const completedCount = syllabus.filter(t => t.completed).length;
    return Math.round((completedCount / syllabus.length) * 100);
  };

  const totalTopics = subjects.reduce((acc, curr) => acc + curr.syllabus.length, 0);
  const totalCompleted = subjects.reduce((acc, curr) => acc + curr.syllabus.filter(t => t.completed).length, 0);
  const overallProgress = totalTopics === 0 ? 0 : Math.round((totalCompleted / totalTopics) * 100);

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10 font-sans selection:bg-emerald-500/30" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      
      {/* Header Panel */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row items-start md:items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-sm border border-cyan-400 px-3 py-1 rounded-full text-cyan-200">@UUSAFF</span>
            3rd Sem Finals 😭😭😭😭
          </h1>
          <p className="text-slate-300 mt-1">Prh le bhai 🙏🏻</p>
        </div>

        {/* Total Mastery Circle */}
        <div className="flex items-center gap-6 bg-black/50 p-5 rounded-2xl border border-white/5 z-10 w-full md:w-auto justify-between">
          <div className="text-right">
            <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Mission Progress</p>
            <p className="text-3xl font-extrabold text-white">{totalCompleted} / {totalTopics} <span className="text-lg font-medium text-slate-500">Topics</span></p>
          </div>
          <ProgressCircle progress={overallProgress} size={100} strokeWidth={8} color="stroke-cyan-300" />
        </div>
      </div>

      {/* Subjects Grid - Updated Layout for 5 Items */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map(subject => {
          const progress = calculateProgress(subject.syllabus);
          
          return (
            <div 
              key={subject.id} 
              className="bg-black/30 backdrop-blur-lg border border-white/5 rounded-2xl p-6 shadow-xl hover:border-cyan-800 transition-all duration-300 flex flex-col h-full relative"
            >
              {/* Subject Header & Circle */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{subject.name}</h2>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p className="flex items-center gap-2">📅 {subject.date}</p>
                    <p className="flex items-center gap-2">⏰ {subject.time}</p>
                    <p className="flex items-center gap-2">📍 {subject.venue}</p>
                  </div>
                </div>
                <ProgressCircle progress={progress} size={64} strokeWidth={6} color="stroke-purple-300" />
              </div>

              {/* Dynamic Timeline Slider */}
              <UrgencySlider dateString={subject.date} />

              {/* Syllabus Checkboxes (Scrollable for longer lists) */}
              <div className="space-y-3.5 mt-2 flex-1 overflow-y-auto pr-2 max-h-[320px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {subject.syllabus.map(topic => (
                  <label 
                    key={topic.id} 
                    className={`flex items-center gap-3.5 p-3 rounded-lg cursor-pointer transition-colors ${
                      topic.completed 
                        ? 'bg-purple-950/20 border-purple-500/20' 
                        : 'bg-black/20 border-transparent hover:bg-black/40'
                    } border`}
                  >
                    <input 
                      type="checkbox" 
                      checked={topic.completed}
                      onChange={() => toggleTopic(subject.id, topic.id)}
                      className="accent-purple-400 w-5 h-5 cursor-pointer flex-shrink-0"
                    />
                    <span className={`text-sm ${
                      topic.completed ? 'text-slate-500 line-through' : 'text-slate-100'
                    }`}>
                      {topic.topic}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-Save Status Bar */}
      <div className="fixed bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 text-xs text-slate-400 flex items-center gap-2 shadow-lg z-50">
        <div className={`w-2 h-2 rounded-full ${autoSaveStatus === 'SYNCED' ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
        AUTO-SAVE: {autoSaveStatus}
      </div>

    </div>
  );
}