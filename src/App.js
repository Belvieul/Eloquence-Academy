import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Menu, X, Volume2, Trophy, Award } from 'lucide-react';
import wordCollection from './wordCollection.js';
import InstallPrompt from './InstallPrompt';

// Storage helper that works with localStorage
const storage = {
  get: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    } catch (err) {
      console.error('Storage get error:', err);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (err) {
      console.error('Storage set error:', err);
      return null;
    }
  }
};

const trackMorningVisit = async () => {
  const now = new Date();
  if (now.getHours() < 12) {
    try {
      const result = storage.get('morning-visits');
      const count = result ? parseInt(result.value) : 0;
      storage.set('morning-visits', (count + 1).toString());
    } catch (err) {
      console.log('Morning visit tracking skipped');
    }
  }
};

const trackEarlyBird = async () => {
  const now = new Date();
  if (now.getHours() < 8) {
    try {
      const result = storage.get('early-bird-visits');
      const visits = result ? JSON.parse(result.value) : [];
      const today = now.toDateString();
      if (!visits.includes(today)) {
        visits.push(today);
        storage.set('early-bird-visits', JSON.stringify(visits));
      }
    } catch (err) {
      console.log('Early bird tracking skipped');
    }
  }
};

const trackWeekendVisit = async () => {
  const now = new Date();
  const day = now.getDay();
  
  if (day === 0 || day === 6) {
    try {
      const result = storage.get('weekend-visits');
      const visits = result ? JSON.parse(result.value) : [];
      const weekNumber = Math.ceil(now.getDate() / 7);
      const visitKey = `${now.getFullYear()}-${now.getMonth()}-W${weekNumber}-${day}`;
      
      if (!visits.includes(visitKey)) {
        visits.push(visitKey);
        storage.set('weekend-visits', JSON.stringify(visits));
      }
    } catch (err) {
      console.log('Weekend tracking skipped');
    }
  }
};

const trackAudioUsage = async () => {
  try {
    const result = storage.get('audio-usage-count');
    const count = result ? parseInt(result.value) : 0;
    storage.set('audio-usage-count', (count + 1).toString());
  } catch (err) {
    console.log('Audio tracking skipped');
  }
};

const trackWordBrowsed = async () => {
  try {
    const result = storage.get('words-browsed-count');
    const count = result ? parseInt(result.value) : 0;
    storage.set('words-browsed-count', (count + 1).toString());
  } catch (err) {
    console.log('Browse tracking skipped');
  }
};

const trackPerfectScoreStreak = async (score) => {
  try {
    if (score === 10) {
      const result = storage.get('perfect-score-streak');
      const streak = result ? parseInt(result.value) : 0;
      storage.set('perfect-score-streak', (streak + 1).toString());
      return streak + 1;
    } else {
      storage.set('perfect-score-streak', '0');
      return 0;
    }
  } catch (err) {
    return 0;
  }
};

const trackPerfectScoreCount = async (score) => {
  try {
    if (score === 10) {
      const result = storage.get('perfect-scores-count');
      const count = result ? parseInt(result.value) : 0;
      storage.set('perfect-scores-count', (count + 1).toString());
      return count + 1;
    }
    return 0;
  } catch (err) {
    return 0;
  }
};

const trackFirstCorrectAnswer = async () => {
  try {
    const result = storage.get('first-correct-answer');
    if (!result) {
      storage.set('first-correct-answer', 'true');
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

const EloquenceAcademy = () => {
  const [currentView, setCurrentView] = useState('daily');
  const [savedWords, setSavedWords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dailyWord, setDailyWord] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [quizCompletionCount, setQuizCompletionCount] = useState(0);
  const [visitDays, setVisitDays] = useState([]);

  const categories = [
    "Intellectual Discussion",
    "Refined Compliments",
    "Literary Expression",
    "Eloquent Agreement",
    "Nuanced Emotions",
    "Diplomatic Discourse",
    "Sophisticated Criticism"
  ];

  const allAchievements = [
    // ORIGINAL 9 ACHIEVEMENTS
    { id: 'first-word', name: 'First Steps', description: 'Save your first word', icon: '🎓', tier: 'bronze', requirement: 1, type: 'saved' },
    { id: 'collector', name: 'Collector', description: 'Save 10 words', icon: '📚', tier: 'silver', requirement: 10, type: 'saved' },
    { id: 'word-master', name: 'Word Master', description: 'Save 25 words', icon: '🌟', tier: 'gold', requirement: 25, type: 'saved' },
    { id: 'eloquence-expert', name: 'Eloquence Expert', description: 'Save 50 words', icon: '👑', tier: 'gold', requirement: 50, type: 'saved' },
    { id: 'quiz-novice', name: 'Quiz Novice', description: 'Complete your first quiz', icon: '🎯', tier: 'bronze', requirement: 1, type: 'quiz' },
    { id: 'perfect-score', name: 'Perfect Score', description: 'Get 10/10 on a quiz', icon: '🔥', tier: 'gold', requirement: 10, type: 'perfect' },
    { id: 'quiz-master', name: 'Quiz Master', description: 'Complete 5 quizzes', icon: '💯', tier: 'silver', requirement: 5, type: 'quiz' },
    { id: 'dedicated', name: 'Dedicated Learner', description: 'Visit 7 days in a row', icon: '🚀', tier: 'gold', requirement: 7, type: 'streak' },
    { id: 'explorer', name: 'Category Explorer', description: 'Save words from all 7 categories', icon: '⭐', tier: 'gold', requirement: 7, type: 'categories' },
    
    // NEW BRONZE ACHIEVEMENTS (3)
    { id: "morning_learner", name: "Morning Scholar", description: "Check the daily word before noon", icon: "☀️", tier: "bronze", requirement: 1, type: 'morning' },
    { id: "quiz_starter", name: "Quiz Starter", description: "Answer your first quiz question correctly", icon: "✅", tier: "bronze", requirement: 1, type: 'first-correct' },
    { id: "speed_reader", name: "Speed Reader", description: "Browse through 20 different words", icon: "⚡", tier: "bronze", requirement: 20, type: 'browsed' },
    
    // NEW SILVER ACHIEVEMENTS (7)
    { id: "category_specialist", name: "Category Specialist", description: "Save 5 words from a single category", icon: "🎭", tier: "silver", requirement: 5, type: 'category-five' },
    { id: "quiz_enthusiast", name: "Quiz Enthusiast", description: "Complete 10 quizzes", icon: "🎮", tier: "silver", requirement: 10, type: 'quiz' },
    { id: "weekend_warrior", name: "Weekend Warrior", description: "Visit on both Saturday and Sunday in the same weekend", icon: "🏖️", tier: "silver", requirement: 1, type: 'weekend' },
    { id: "impressive_score", name: "Impressive Score", description: "Score 8/10 or higher on a quiz", icon: "🎯", tier: "silver", requirement: 1, type: 'high-score' },
    { id: "word_hoarder", name: "Word Hoarder", description: "Save 15 words in your collection", icon: "💼", tier: "silver", requirement: 15, type: 'saved' },
    { id: "consistent_learner", name: "Consistent Learner", description: "Visit 3 days in a row", icon: "📅", tier: "silver", requirement: 3, type: 'streak' },
    { id: "pronunciation_pro", name: "Pronunciation Pro", description: "Use audio pronunciation 10 times", icon: "🔊", tier: "silver", requirement: 10, type: 'audio' },
    
    // NEW GOLD ACHIEVEMENTS (7)
    { id: "perfect_week", name: "Perfect Week", description: "Score 10/10 on 3 different quizzes", icon: "💎", tier: "gold", requirement: 3, type: 'perfect-count' },
    { id: "category_master", name: "Category Master", description: "Save 10 words from each of 3 different categories", icon: "🏆", tier: "gold", requirement: 3, type: 'category-ten' },
    { id: "quiz_legend", name: "Quiz Legend", description: "Complete 25 quizzes", icon: "👾", tier: "gold", requirement: 25, type: 'quiz' },
    { id: "vocabulary_titan", name: "Vocabulary Titan", description: "Save 75 words in your collection", icon: "⚔️", tier: "gold", requirement: 75, type: 'saved' },
    { id: "two_week_streak", name: "Two Week Streak", description: "Visit 14 days in a row", icon: "🔥", tier: "gold", requirement: 14, type: 'streak' },
    { id: "perfectionist", name: "The Perfectionist", description: "Score 10/10 on 5 quizzes in a row", icon: "🌟", tier: "gold", requirement: 5, type: 'perfect-streak' },
    { id: "early_bird", name: "Early Bird", description: "Check the daily word before 8 AM on 5 different days", icon: "🐦", tier: "gold", requirement: 5, type: 'early-bird' },
    
    // NEW PLATINUM ACHIEVEMENTS (6)
    { id: "vocabulary_master", name: "Vocabulary Master", description: "Save 100 words in your collection", icon: "👑", tier: "platinum", requirement: 100, type: 'saved' },
    { id: "quiz_champion", name: "Quiz Champion", description: "Complete 50 quizzes", icon: "🥇", tier: "platinum", requirement: 50, type: 'quiz' },
    { id: "month_long_streak", name: "Month Long Streak", description: "Visit 30 days in a row", icon: "🌙", tier: "platinum", requirement: 30, type: 'streak' },
    { id: "complete_mastery", name: "Complete Mastery", description: "Save at least 15 words from all 7 categories", icon: "🎓", tier: "platinum", requirement: 7, type: 'category-fifteen' },
    { id: "flawless_record", name: "Flawless Record", description: "Score 10/10 on 10 different quizzes", icon: "💫", tier: "platinum", requirement: 10, type: 'perfect-count' },
    { id: "scholar_supreme", name: "Scholar Supreme", description: "Unlock all other achievements", icon: "🏅", tier: "platinum", requirement: 31, type: 'meta' }
  ];

  useEffect(() => {
    loadSavedWords();
    setDailyWordFromDate();
    loadAchievements();
    trackVisit();
    
    trackMorningVisit();
    trackEarlyBird();
    trackWeekendVisit();
  }, []);

  const loadSavedWords = async () => {
    try {
      const result = storage.get('saved-words');
      if (result && result.value) {
        setSavedWords(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No saved words yet');
    }
  };

  const loadAchievements = async () => {
    try {
      const result = storage.get('achievements');
      if (result && result.value) {
        setAchievements(JSON.parse(result.value));
      }
      
      const quizCount = storage.get('quiz-count');
      if (quizCount && quizCount.value) {
        setQuizCompletionCount(parseInt(quizCount.value));
      }
      
      const visits = storage.get('visit-days');
      if (visits && visits.value) {
        setVisitDays(JSON.parse(visits.value));
      }
    } catch (error) {
      console.log('No achievements yet');
    }
  };

  const checkAndUnlockAchievement = async (achievementId) => {
    if (achievements.includes(achievementId)) return;
    
    const achievement = allAchievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    const newAchievements = [...achievements, achievementId];
    setAchievements(newAchievements);
    
    try {
      storage.set('achievements', JSON.stringify(newAchievements));
    } catch (error) {
      console.error('Failed to save achievement');
    }
    
    setShowAchievement(achievement);
    setTimeout(() => setShowAchievement(null), 5000);
  };

  const checkAchievements = async () => {
    // ORIGINAL CHECKS
    if (savedWords.length >= 1 && !achievements.includes('first-word')) {
      checkAndUnlockAchievement('first-word');
    }
    if (savedWords.length >= 10 && !achievements.includes('collector')) {
      checkAndUnlockAchievement('collector');
    }
    if (savedWords.length >= 25 && !achievements.includes('word-master')) {
      checkAndUnlockAchievement('word-master');
    }
    if (savedWords.length >= 50 && !achievements.includes('eloquence-expert')) {
      checkAndUnlockAchievement('eloquence-expert');
    }
    
    const uniqueCategories = new Set(savedWords.map(w => w.category));
    if (uniqueCategories.size >= 7 && !achievements.includes('explorer')) {
      checkAndUnlockAchievement('explorer');
    }

    // NEW ACHIEVEMENT CHECKS
    if (savedWords.length >= 15 && !achievements.includes('word_hoarder')) {
      checkAndUnlockAchievement('word_hoarder');
    }
    if (savedWords.length >= 75 && !achievements.includes('vocabulary_titan')) {
      checkAndUnlockAchievement('vocabulary_titan');
    }
    if (savedWords.length >= 100 && !achievements.includes('vocabulary_master')) {
      checkAndUnlockAchievement('vocabulary_master');
    }
    if (quizCompletionCount >= 10 && !achievements.includes('quiz_enthusiast')) {
      checkAndUnlockAchievement('quiz_enthusiast');
    }
    if (quizCompletionCount >= 25 && !achievements.includes('quiz_legend')) {
      checkAndUnlockAchievement('quiz_legend');
    }
    if (quizCompletionCount >= 50 && !achievements.includes('quiz_champion')) {
      checkAndUnlockAchievement('quiz_champion');
    }

    const streak = calculateStreak();
    if (streak >= 3 && !achievements.includes('consistent_learner')) {
      checkAndUnlockAchievement('consistent_learner');
    }
    if (streak >= 14 && !achievements.includes('two_week_streak')) {
      checkAndUnlockAchievement('two_week_streak');
    }
    if (streak >= 30 && !achievements.includes('month_long_streak')) {
      checkAndUnlockAchievement('month_long_streak');
    }

    try {
      const morningResult = storage.get('morning-visits');
      if (morningResult && parseInt(morningResult.value) >= 1 && !achievements.includes('morning_learner')) {
        checkAndUnlockAchievement('morning_learner');
      }
    } catch (err) {}

    try {
      const browsedResult = storage.get('words-browsed-count');
      if (browsedResult && parseInt(browsedResult.value) >= 20 && !achievements.includes('speed_reader')) {
        checkAndUnlockAchievement('speed_reader');
      }
    } catch (err) {}

    try {
      const audioResult = storage.get('audio-usage-count');
      if (audioResult && parseInt(audioResult.value) >= 10 && !achievements.includes('pronunciation_pro')) {
        checkAndUnlockAchievement('pronunciation_pro');
      }
    } catch (err) {}

    try {
      const weekendResult = storage.get('weekend-visits');
      if (weekendResult) {
        const visits = JSON.parse(weekendResult.value);
        const weekVisits = {};
        visits.forEach(visit => {
          const parts = visit.split('-');
          const weekKey = `${parts[0]}-${parts[1]}-${parts[2]}`;
          if (!weekVisits[weekKey]) weekVisits[weekKey] = [];
          weekVisits[weekKey].push(parts[3]);
        });
        
        const hasWeekendWarrior = Object.values(weekVisits).some(days => 
          days.includes('0') && days.includes('6')
        );
        
        if (hasWeekendWarrior && !achievements.includes('weekend_warrior')) {
          checkAndUnlockAchievement('weekend_warrior');
        }
      }
    } catch (err) {}

    try {
      const earlyResult = storage.get('early-bird-visits');
      if (earlyResult) {
        const visits = JSON.parse(earlyResult.value);
        if (visits.length >= 5 && !achievements.includes('early_bird')) {
          checkAndUnlockAchievement('early_bird');
        }
      }
    } catch (err) {}

    const categoryList = ['Intellectual Discussion', 'Refined Compliments', 'Literary Expression', 
                          'Eloquent Agreement', 'Nuanced Emotions', 'Diplomatic Discourse', 'Sophisticated Criticism'];
    for (const category of categoryList) {
      const categoryWords = savedWords.filter(w => w.category === category);
      if (categoryWords.length >= 5 && !achievements.includes('category_specialist')) {
        checkAndUnlockAchievement('category_specialist');
        break;
      }
    }

    let categoriesWithTen = 0;
    for (const category of categoryList) {
      const categoryWords = savedWords.filter(w => w.category === category);
      if (categoryWords.length >= 10) categoriesWithTen++;
    }
    if (categoriesWithTen >= 3 && !achievements.includes('category_master')) {
      checkAndUnlockAchievement('category_master');
    }

    let categoriesWithFifteen = 0;
    for (const category of categoryList) {
      const categoryWords = savedWords.filter(w => w.category === category);
      if (categoryWords.length >= 15) categoriesWithFifteen++;
    }
    if (categoriesWithFifteen >= 7 && !achievements.includes('complete_mastery')) {
      checkAndUnlockAchievement('complete_mastery');
    }

    try {
      const perfectResult = storage.get('perfect-scores-count');
      if (perfectResult && parseInt(perfectResult.value) >= 3 && !achievements.includes('perfect_week')) {
        checkAndUnlockAchievement('perfect_week');
      }
      if (perfectResult && parseInt(perfectResult.value) >= 10 && !achievements.includes('flawless_record')) {
        checkAndUnlockAchievement('flawless_record');
      }
    } catch (err) {}

    try {
      const streakResult = storage.get('perfect-score-streak');
      if (streakResult && parseInt(streakResult.value) >= 5 && !achievements.includes('perfectionist')) {
        checkAndUnlockAchievement('perfectionist');
      }
    } catch (err) {}

    const totalAchievements = allAchievements.length - 1;
    const unlockedCount = achievements.filter(a => a !== 'scholar_supreme').length;
    if (unlockedCount >= totalAchievements && !achievements.includes('scholar_supreme')) {
      checkAndUnlockAchievement('scholar_supreme');
    }
  };

  const calculateStreak = () => {
    if (visitDays.length === 0) return 0;
    const sortedDays = visitDays.map(d => new Date(d)).sort((a, b) => a - b);
    let streak = 1;
    for (let i = sortedDays.length - 1; i > 0; i--) {
      const diff = (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const trackVisit = async () => {
    const today = new Date().toDateString();
    if (!visitDays.includes(today)) {
      const newVisits = [...visitDays, today];
      setVisitDays(newVisits);
      
      try {
        storage.set('visit-days', JSON.stringify(newVisits));
      } catch (error) {
        console.error('Failed to track visit');
      }
      
      const sortedDays = newVisits.map(d => new Date(d)).sort((a, b) => a - b);
      let streak = 1;
      for (let i = sortedDays.length - 1; i > 0; i--) {
        const diff = (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak++;
        } else {
          break;
        }
      }
      
      if (streak >= 7 && !achievements.includes('dedicated')) {
        checkAndUnlockAchievement('dedicated');
      }
    }
  };

  const setDailyWordFromDate = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const wordIndex = dayOfYear % wordCollection.length;
    setDailyWord(wordCollection[wordIndex]);
  };

  const toggleSaveWord = async (word) => {
    const isCurrentlySaved = savedWords.some(w => w.word === word.word);
    let newSavedWords;
    
    if (isCurrentlySaved) {
      newSavedWords = savedWords.filter(w => w.word !== word.word);
    } else {
      newSavedWords = [...savedWords, word];
    }
    
    setSavedWords(newSavedWords);
    
    try {
      storage.set('saved-words', JSON.stringify(newSavedWords));
      // Check for new achievements after saving
      setTimeout(() => checkAchievements(), 100);
    } catch (error) {
      console.error('Failed to save words:', error);
    }
  };

  const isSaved = (word) => {
    return savedWords.some(w => w.word === word.word);
  };

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
      
      trackAudioUsage();
      checkAchievements();
    } else {
      alert('Sorry, your browser does not support text-to-speech!');
    }
  };

  const startQuiz = () => {
    const shuffled = [...wordCollection].sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, 10).map(word => {
      const wrongAnswers = wordCollection
        .filter(w => w.word !== word.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.definition);
      
      const allAnswers = [...wrongAnswers, word.definition].sort(() => Math.random() - 0.5);
      
      return {
        word: word.word,
        pronunciation: word.pronunciation,
        correctAnswer: word.definition,
        answers: allAnswers
      };
    });
    
    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setScore(0);
    setQuizMode(true);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const handleAnswerClick = async (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      
      const isFirst = await trackFirstCorrectAnswer();
      if (isFirst && !achievements.includes('quiz_starter')) {
        checkAndUnlockAchievement('quiz_starter');
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const exitQuiz = async () => {
    if (quizComplete) {
      const finalScore = score;
      const newCount = quizCompletionCount + 1;
      setQuizCompletionCount(newCount);
      
      try {
        storage.set('quiz-count', newCount.toString());
      } catch (error) {
        console.error('Failed to save quiz count');
      }
      
      if (newCount >= 1 && !achievements.includes('quiz-novice')) {
        checkAndUnlockAchievement('quiz-novice');
      }
      if (newCount >= 5 && !achievements.includes('quiz-master')) {
        checkAndUnlockAchievement('quiz-master');
      }
      
      if (score === quizQuestions.length && !achievements.includes('perfect-score')) {
        checkAndUnlockAchievement('perfect-score');
      }

      if (finalScore >= 8 && !achievements.includes('impressive_score')) {
        checkAndUnlockAchievement('impressive_score');
      }

      await trackPerfectScoreStreak(finalScore);
      await trackPerfectScoreCount(finalScore);
      
      checkAchievements();
    }
    
    setQuizMode(false);
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const WordCard = ({ wordData, featured = false }) => {
    useEffect(() => {
      trackWordBrowsed();
    }, []);

    return (
      <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border border-gray-700 hover:border-amber-500 transition-all ${featured ? 'shadow-2xl' : 'shadow-lg'}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className={`font-serif text-amber-400 ${featured ? 'text-5xl' : 'text-3xl'} mb-2`}>
              {wordData.word}
            </h2>
            <div className="flex items-center space-x-2">
              <p className="text-gray-400 italic text-lg">/{wordData.pronunciation}/</p>
              <button
                onClick={() => speakWord(wordData.word)}
                className="text-amber-400 hover:text-amber-300 transition-colors p-1 hover:bg-gray-700 rounded"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => toggleSaveWord(wordData)}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Star className={`w-6 h-6 ${isSaved(wordData) ? 'fill-amber-400' : ''}`} style={{ fill: isSaved(wordData) ? 'currentColor' : 'none' }} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Definition</h3>
            <p className="text-gray-100 text-lg leading-relaxed">{wordData.definition}</p>
          </div>
          
          <div>
            <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Category</h3>
            <span className="inline-block bg-amber-900 bg-opacity-30 text-amber-300 px-3 py-1 rounded-full text-sm">
              {wordData.category}
            </span>
          </div>
          
          <div>
            <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Examples</h3>
            <div className="space-y-2">
              {wordData.examples && wordData.examples.map((example, idx) => (
                <p key={idx} className="text-gray-300 italic pl-4 border-l-2 border-amber-700">
                  {example}
                </p>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Usage Context</h3>
            <p className="text-gray-300 leading-relaxed">{wordData.context}</p>
          </div>
        </div>
      </div>
    );
  };

  const filteredWords = selectedCategory === 'all' 
    ? wordCollection 
    : wordCollection.filter(w => w.category === selectedCategory);

  if (!dailyWord) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-amber-400 text-2xl font-serif">Loading your eloquence...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Install Prompt for PWA */}
      <InstallPrompt />
      
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-amber-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-amber-400" />
              <h1 className="font-serif text-3xl text-amber-400">The Eloquence Academy</h1>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-amber-400"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <nav className="hidden md:flex space-x-6 items-center">
              <button
                onClick={() => setCurrentView('daily')}
                className={`transition-colors ${currentView === 'daily' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                Daily Word
              </button>
              <button
                onClick={() => setCurrentView('browse')}
                className={`transition-colors ${currentView === 'browse' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                Browse Collection
              </button>
              <button
                onClick={() => setCurrentView('saved')}
                className={`transition-colors flex items-center space-x-2 ${currentView === 'saved' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                <Star className="w-4 h-4" />
                <span>Saved ({savedWords.length})</span>
              </button>
              <button
                onClick={startQuiz}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Take Quiz 🎯
              </button>
              <button
                onClick={() => setCurrentView('achievements')}
                className={`transition-colors flex items-center space-x-2 ${currentView === 'achievements' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                <Trophy className="w-4 h-4" />
                <span>Achievements ({achievements.length}/{allAchievements.length})</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-amber-900">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <button
              onClick={() => { setCurrentView('daily'); setMenuOpen(false); }}
              className={`text-left transition-colors ${currentView === 'daily' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              Daily Word
            </button>
            <button
              onClick={() => { setCurrentView('browse'); setMenuOpen(false); }}
              className={`text-left transition-colors ${currentView === 'browse' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              Browse Collection
            </button>
            <button
              onClick={() => { setCurrentView('saved'); setMenuOpen(false); }}
              className={`text-left transition-colors flex items-center space-x-2 ${currentView === 'saved' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              <Star className="w-4 h-4" />
              <span>Saved ({savedWords.length})</span>
            </button>
            <button
              onClick={() => { startQuiz(); setMenuOpen(false); }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors text-left"
            >
              Take Quiz 🎯
            </button>
            <button
              onClick={() => { setCurrentView('achievements'); setMenuOpen(false); }}
              className={`text-left transition-colors flex items-center space-x-2 ${currentView === 'achievements' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements ({achievements.length}/{allAchievements.length})</span>
            </button>
          </nav>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
        {showAchievement && (
          <div className="fixed top-20 right-6 z-50 bg-gradient-to-br from-amber-500 to-amber-600 text-gray-900 px-6 py-4 rounded-lg shadow-2xl border-2 border-amber-300 animate-bounce">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">Achievement Unlocked!</p>
                <p className="text-sm">{showAchievement.icon} {showAchievement.name}</p>
              </div>
            </div>
          </div>
        )}

        {quizMode && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 max-w-3xl w-full border-2 border-amber-500 shadow-2xl max-h-[90vh] overflow-y-auto">
              {!quizComplete ? (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-serif text-amber-400">Quiz Mode</h2>
                      <p className="text-gray-400">Question {currentQuestion + 1} of {quizQuestions.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 text-3xl font-bold">{score}</p>
                      <p className="text-gray-400 text-sm">Score</p>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-4xl font-serif text-amber-400 mb-2">
                      {quizQuestions[currentQuestion]?.word}
                    </h3>
                    <p className="text-gray-400 italic text-lg mb-6">
                      /{quizQuestions[currentQuestion]?.pronunciation}/
                    </p>
                    <p className="text-xl text-gray-300 mb-6">What does this word mean?</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuestion]?.answers.map((answer, idx) => {
                      const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;
                      const isSelected = selectedAnswer === answer;
                      
                      let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all ";
                      
                      if (!showResult) {
                        buttonClass += "border-gray-600 hover:border-amber-500 hover:bg-gray-700 text-gray-200";
                      } else if (isSelected && isCorrect) {
                        buttonClass += "border-green-500 bg-green-900 bg-opacity-30 text-green-300";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "border-red-500 bg-red-900 bg-opacity-30 text-red-300";
                      } else if (isCorrect) {
                        buttonClass += "border-green-500 bg-green-900 bg-opacity-30 text-green-300";
                      } else {
                        buttonClass += "border-gray-600 text-gray-400";
                      }
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => !showResult && handleAnswerClick(answer)}
                          disabled={showResult}
                          className={buttonClass}
                        >
                          {answer}
                          {showResult && isCorrect && " ✓"}
                          {showResult && isSelected && !isCorrect && " ✗"}
                        </button>
                      );
                    })}
                  </div>
                  {showResult && (
                    <div className="flex gap-4">
                      <button
                        onClick={handleNextQuestion}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
                      >
                        {currentQuestion + 1 < quizQuestions.length ? "Next Question →" : "See Results"}
                      </button>
                      <button
                        onClick={exitQuiz}
                        className="px-6 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-3 rounded-lg transition-colors"
                      >
                        Exit Quiz
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-5xl font-serif text-amber-400 mb-4">Quiz Complete! 🎉</h2>
                  <p className="text-6xl font-bold text-amber-400 mb-4">{score}/{quizQuestions.length}</p>
                  <p className="text-2xl text-gray-300 mb-8">
                    {score === quizQuestions.length && "Perfect score! You're a vocabulary master! 👑"}
                    {score >= quizQuestions.length * 0.8 && score < quizQuestions.length && "Excellent work! 🌟"}
                    {score >= quizQuestions.length * 0.6 && score < quizQuestions.length * 0.8 && "Good job! Keep learning! 📚"}
                    {score < quizQuestions.length * 0.6 && "Keep practicing! You'll improve! 💪"}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={startQuiz}
                      className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors"
                    >
                      Try Again 🎯
                    </button>
                    <button
                      onClick={exitQuiz}
                      className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-lg transition-colors"
                    >
                      Exit Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'daily' && dailyWord && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-amber-400 mb-2">Word of the Day</h2>
              <p className="text-gray-400">Elevate your discourse with today's selection</p>
            </div>
            <WordCard wordData={dailyWord} featured={true} />
          </div>
        )}

        {currentView === 'browse' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-serif text-amber-400 mb-4">Browse Our Collection</h2>
              <p className="text-gray-400 mb-8">Explore words by category</p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full transition-all ${selectedCategory === 'all' ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  All Words
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full transition-all ${selectedCategory === cat ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid gap-8">
              {filteredWords.map((word, idx) => (
                <WordCard key={idx} wordData={word} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'saved' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-serif text-amber-400 mb-2">Your Saved Words</h2>
              <p className="text-gray-400">Your personal collection of eloquent vocabulary</p>
            </div>
            
            {savedWords.length === 0 ? (
              <div className="text-center py-20">
                <Star className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No saved words yet. Start building your collection!</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {savedWords.map((word, idx) => (
                  <WordCard key={idx} wordData={word} />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'achievements' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-serif text-amber-400 mb-2">Achievements</h2>
              <p className="text-gray-400 mb-4">Unlock badges as you master vocabulary</p>
              <p className="text-2xl text-amber-400 font-bold">{achievements.length} / {allAchievements.length} Unlocked</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {allAchievements.map(achievement => {
                const isUnlocked = achievements.includes(achievement.id);
                
                const getTierStyle = (tier) => {
                  const styles = {
                    bronze: { bg: 'from-orange-600 to-orange-800', border: 'border-orange-700' },
                    silver: { bg: 'from-gray-400 to-gray-600', border: 'border-gray-400' },
                    gold: { bg: 'from-yellow-400 to-yellow-600', border: 'border-yellow-400' },
                    platinum: { bg: 'from-purple-600 via-pink-500 to-purple-700', border: 'border-purple-500' }
                  };
                  return styles[tier] || styles.bronze;
                };
                
                const tierStyle = getTierStyle(achievement.tier);
                
                let progress = 0;
                if (achievement.type === 'saved') {
                  progress = Math.min((savedWords.length / achievement.requirement) * 100, 100);
                } else if (achievement.type === 'quiz') {
                  progress = Math.min((quizCompletionCount / achievement.requirement) * 100, 100);
                } else if (achievement.type === 'perfect') {
                  progress = isUnlocked ? 100 : 0;
                } else if (achievement.type === 'categories') {
                  const uniqueCategories = new Set(savedWords.map(w => w.category));
                  progress = Math.min((uniqueCategories.size / achievement.requirement) * 100, 100);
                } else if (achievement.type === 'streak') {
                  const sortedDays = visitDays.map(d => new Date(d)).sort((a, b) => a - b);
                  let streak = 1;
                  for (let i = sortedDays.length - 1; i > 0; i--) {
                    const diff = (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);
                    if (diff === 1) {
                      streak++;
                    } else {
                      break;
                    }
                  }
                  progress = Math.min((streak / achievement.requirement) * 100, 100);
                }
                
                return (
                  <div
                    key={achievement.id}
                    className={`bg-gradient-to-br ${isUnlocked ? tierStyle.bg : 'from-gray-800 to-gray-900'} rounded-lg p-6 border-2 ${isUnlocked ? tierStyle.border : 'border-gray-700'} transition-all ${isUnlocked ? 'shadow-2xl' : 'opacity-60'}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-5xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif text-white mb-1">{achievement.name}</h3>
                        <p className="text-gray-200 mb-3">{achievement.description}</p>
                        
                        {!isUnlocked && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-300">
                              <span>Progress</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {isUnlocked && (
                          <div className="flex items-center space-x-2 text-white">
                            <Award className="w-5 h-5" />
                            <span className="font-bold">UNLOCKED!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 border-t border-amber-900 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p className="font-serif text-sm">Cultivate eloquence. Speak with distinction.</p>
        </div>
      </footer>
    </div>
  );
};

export default EloquenceAcademy;
