/**
 * 通用考试系统框架
 * 可套用到拼音、数学、英语、故事等不同学习主题
 * 
 * 使用示例：
 * - 拼音考试：测试拼音掌握程度
 * - 数学考试：测试数学计算能力
 * - 英语考试：测试英语词汇水平
 * - 故事考试：测试故事理解能力
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';

// ==========================
// 类型定义
// ==========================

/** 题目类型 */
export type QuestionType = 'choice' | 'fill' | 'judge' | 'match';

/** 选择题选项 */
export interface ChoiceOption {
  id: string;
  content: string;
  emoji?: string;
  imageUrl?: string;
}

/** 题目数据 */
export interface Question {
  id: string;
  type: QuestionType;
  /** 题目内容 */
  question: string;
  /** 题目提示（可选） */
  hint?: string;
  /** 正确答案 */
  correctAnswer: string;
  /** 选项（选择题用） */
  options?: ChoiceOption[];
  /** 示例或解释 */
  explanation?: string;
  /** 图标或表情 */
  emoji?: string;
  /** 图片URL（可选） */
  imageUrl?: string;
  /** 自定义数据 */
  metadata?: Record<string, any>;
}

/** 考试配置 */
export interface ExamConfig {
  /** 考试ID */
  examId: string;
  /** 考试名称 */
  examName: string;
  /** 考试图标 */
  examIcon: string;
  /** 主题颜色 */
  themeColor: string;
  /** 主题渐变色 */
  themeGradient: string;
  /** 返回路径 */
  backPath: string;
  /** 获取题库的函数 */
  getQuestionPool: (category?: string) => Question[];
  /** 播放语音的函数 */
  speakText?: (text: string) => void;
  /** 自定义渲染题目内容（可选） */
  renderQuestionContent?: (question: Question) => React.ReactNode;
}

/** 难度级别 */
export type ExamDifficulty = 'easy' | 'medium' | 'hard';

/** 难度配置 */
export interface ExamDifficultyConfig {
  /** 题目数量 */
  questionCount: number;
  /** 时间限制（秒），0表示不限时 */
  timeLimit: number;
  /** 及格线（正确率） */
  passingRate: number;
  /** 数据池分类 */
  category?: string;
}

/** 默认难度配置 */
export const DEFAULT_EXAM_DIFFICULTY: Record<ExamDifficulty, ExamDifficultyConfig> = {
  easy: {
    questionCount: 10,
    timeLimit: 0, // 不限时
    passingRate: 0.6,
  },
  medium: {
    questionCount: 15,
    timeLimit: 300, // 5分钟
    passingRate: 0.7,
  },
  hard: {
    questionCount: 20,
    timeLimit: 600, // 10分钟
    passingRate: 0.8,
  },
};

/** 考试阶段 */
export type ExamPhase = 'start' | 'playing' | 'review' | 'results';

/** 答题状态 */
export interface AnswerStatus {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  responseTime: number; // 答题耗时（毫秒）
}

/** 考试结果 */
export interface ExamResult {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  totalTime: number;
  passed: boolean;
  stars: number;
  answers: AnswerStatus[];
}

// ==========================
// 工具函数
// ==========================

/** 数组随机打乱 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** 格式化时间 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ==========================
// 通用考试组件
// ==========================

export interface ExamSystemProps {
  /** 游戏ID（用于统计和进度追踪） */
  gameId: string;
  /** 考试配置 */
  exam: ExamConfig;
  /** 难度配置（可选，覆盖默认配置） */
  difficultySettings?: Partial<Record<ExamDifficulty, ExamDifficultyConfig>>;
}

export function ExamSystem({ 
  gameId, 
  exam,
  difficultySettings,
}: ExamSystemProps) {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion(gameId);
  
  const mergedDifficultySettings = {
    ...DEFAULT_EXAM_DIFFICULTY,
    ...difficultySettings,
  };

  // 考试状态
  const [phase, setPhase] = useState<ExamPhase>('start');
  const [difficulty, setDifficulty] = useState<ExamDifficulty>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerStatus[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState(0);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionStartTimeRef = useRef<number>(0);

  // 开始考试
  const startExam = useCallback((selectedDifficulty: ExamDifficulty) => {
    const config = mergedDifficultySettings[selectedDifficulty];
    const pool = exam.getQuestionPool(config.category);
    const selectedQuestions = shuffleArray(pool).slice(0, config.questionCount);
    
    setDifficulty(selectedDifficulty);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer('');
    setShowFeedback(false);
    setPhase('playing');
    setStartTime(Date.now());
    
    if (config.timeLimit > 0) {
      setTimeRemaining(config.timeLimit);
    }
    
    track('exam_start', { 
      gameId, 
      examId: exam.examId,
      difficulty: selectedDifficulty,
      questionCount: selectedQuestions.length,
    });
  }, [gameId, exam, mergedDifficultySettings]);

  // 计时器
  useEffect(() => {
    if (phase === 'playing' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timeRemaining]);

  // 提交答案
  const submitAnswer = useCallback(() => {
    if (!selectedAnswer || showFeedback) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    const responseTime = Date.now() - questionStartTimeRef.current;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    const answerStatus: AnswerStatus = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      isCorrect: correct,
      responseTime,
    };
    
    setAnswers(prev => [...prev, answerStatus]);
    
    track('exam_answer', {
      gameId,
      questionId: currentQuestion.id,
      correct,
      responseTime,
    });
    
    // 播放语音反馈
    if (exam.speakText) {
      if (correct) {
        exam.speakText('回答正确！');
      } else {
        exam.speakText('回答错误');
      }
    }
    
    // 1.5秒后进入下一题
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
        questionStartTimeRef.current = Date.now();
      } else {
        endExam();
      }
    }, 1500);
  }, [selectedAnswer, showFeedback, questions, currentQuestionIndex, gameId, exam]);

  // 结束考试
  const endExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const correctCount = answers.filter(a => a.isCorrect).length;
    const wrongCount = answers.length - correctCount;
    const accuracy = answers.length > 0 ? correctCount / answers.length : 0;
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    
    const config = mergedDifficultySettings[difficulty];
    const passed = accuracy >= config.passingRate;
    
    // 计算星星
    let stars = 0;
    if (accuracy >= 0.9) stars = 3;
    else if (accuracy >= 0.7) stars = 2;
    else if (accuracy >= config.passingRate) stars = 1;
    
    const examResult: ExamResult = {
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      accuracy,
      totalTime,
      passed,
      stars,
      answers,
    };
    
    track('exam_complete', {
      gameId,
      examId: exam.examId,
      difficulty,
      accuracy,
      stars,
      passed,
      totalTime,
    });
    
    handleGameComplete({
      success: passed,
      stars,
      xp: correctCount * 10,
      tasksCompleted: questions.length,
      accuracy,
    });
    
    setPhase('results');
  }, [answers, startTime, difficulty, questions.length, gameId, exam, mergedDifficultySettings, handleGameComplete]);

  // 返回
  const handleBack = useCallback(() => {
    navigate(exam.backPath);
  }, [navigate, exam.backPath]);

  // 重新开始
  const handleRestart = useCallback(() => {
    startExam(difficulty);
  }, [difficulty, startExam]);

  // 查看回顾
  const handleReview = useCallback(() => {
    setPhase('review');
  }, []);

  // 渲染开始界面
  if (phase === 'start') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: exam.themeGradient,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>
              {exam.examIcon}
            </div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '900',
                color: exam.themeColor,
                marginBottom: '8px',
              }}
            >
              {exam.examName}
            </h1>
            <p style={{ fontSize: '18px', color: '#666' }}>
              准备好接受挑战了吗？
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
              选择难度：
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {(Object.keys(mergedDifficultySettings) as ExamDifficulty[]).map((level) => {
                const config = mergedDifficultySettings[level];
                const labels = { easy: '简单', medium: '中等', hard: '困难' };
                const colors = { easy: '#4CAF50', medium: '#FF9800', hard: '#F44336' };
                const emojis = { easy: '🌟', medium: '⭐', hard: '🔥' };
                
                return (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startExam(level)}
                    style={{
                      flex: 1,
                      minWidth: '150px',
                      padding: '20px',
                      borderRadius: '16px',
                      border: `3px solid ${colors[level]}`,
                      background: 'white',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                      {emojis[level]}
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: colors[level],
                        marginBottom: '8px',
                      }}
                    >
                      {labels[level]}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {config.questionCount}题
                    </div>
                    {config.timeLimit > 0 && (
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {Math.floor(config.timeLimit / 60)}分钟
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <Button onClick={handleBack} variant="secondary" size="large" fullWidth>
            返回
          </Button>
        </motion.div>
      </div>
    );
  }

  // 渲染答题界面
  if (phase === 'playing' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const config = mergedDifficultySettings[difficulty];

    return (
      <div
        style={{
          minHeight: '100vh',
          background: exam.themeGradient,
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* 顶部信息栏 */}
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: '700' }}>
                第 {currentQuestionIndex + 1} / {questions.length} 题
              </div>
              {config.timeLimit > 0 && (
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: timeRemaining < 60 ? '#F44336' : '#333',
                  }}
                >
                  ⏱️ {formatTime(timeRemaining)}
                </div>
              )}
            </div>
            
            {/* 进度条 */}
            <div
              style={{
                height: '12px',
                background: '#E0E0E0',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${exam.themeColor}, ${exam.themeColor}CC)`,
                  borderRadius: '6px',
                }}
              />
            </div>
          </div>

          {/* 题目卡片 */}
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            }}
          >
            {/* 题目内容 */}
            <div style={{ marginBottom: '32px' }}>
              {currentQuestion.emoji && (
                <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '16px' }}>
                  {currentQuestion.emoji}
                </div>
              )}
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: '16px',
                  color: '#333',
                }}
              >
                {currentQuestion.question}
              </h2>
              {currentQuestion.hint && (
                <p style={{ fontSize: '16px', color: '#999', textAlign: 'center' }}>
                  💡 {currentQuestion.hint}
                </p>
              )}
            </div>

            {/* 选择题选项 */}
            {currentQuestion.type === 'choice' && currentQuestion.options && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                }}
              >
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectOption = option.id === currentQuestion.correctAnswer;
                  const showResult = showFeedback;
                  
                  let bgColor = 'white';
                  let borderColor = '#E0E0E0';
                  
                  if (showResult) {
                    if (isCorrectOption) {
                      bgColor = '#C8E6C9';
                      borderColor = '#4CAF50';
                    } else if (isSelected && !isCorrect) {
                      bgColor = '#FFCDD2';
                      borderColor = '#F44336';
                    }
                  } else if (isSelected) {
                    bgColor = '#E3F2FD';
                    borderColor = exam.themeColor;
                  }
                  
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={!showFeedback ? { scale: 1.02 } : undefined}
                      whileTap={!showFeedback ? { scale: 0.98 } : undefined}
                      onClick={() => !showFeedback && setSelectedAnswer(option.id)}
                      disabled={showFeedback}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        border: `3px solid ${borderColor}`,
                        background: bgColor,
                        cursor: showFeedback ? 'default' : 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      {option.emoji && (
                        <div style={{ fontSize: '40px', marginBottom: '8px' }}>
                          {option.emoji}
                        </div>
                      )}
                      <div
                        style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#333',
                        }}
                      >
                        {option.content}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* 提交按钮 */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <motion.button
                whileHover={selectedAnswer && !showFeedback ? { scale: 1.05 } : undefined}
                whileTap={selectedAnswer && !showFeedback ? { scale: 0.95 } : undefined}
                onClick={submitAnswer}
                disabled={!selectedAnswer || showFeedback}
                style={{
                  padding: '16px 48px',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'white',
                  background: selectedAnswer && !showFeedback
                    ? `linear-gradient(135deg, ${exam.themeColor}, ${exam.themeColor}CC)`
                    : '#CCC',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: selectedAnswer && !showFeedback ? 'pointer' : 'default',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {showFeedback
                  ? isCorrect
                    ? '✓ 回答正确！'
                    : '✗ 回答错误'
                  : '提交答案'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 渲染结果界面
  if (phase === 'results') {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const accuracy = answers.length > 0 ? correctCount / answers.length : 0;
    const config = mergedDifficultySettings[difficulty];
    const passed = accuracy >= config.passingRate;

    return (
      <div
        style={{
          minHeight: '100vh',
          background: exam.themeGradient,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>
              {passed ? '🎉' : '💪'}
            </div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '900',
                color: passed ? '#4CAF50' : '#FF9800',
                marginBottom: '8px',
              }}
            >
              {passed ? '考试通过！' : '继续加油！'}
            </h1>
            
            {/* 星星显示 */}
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {[1, 2, 3].map((star) => {
                const config = mergedDifficultySettings[difficulty];
                const threshold = star === 1 ? config.passingRate : star === 2 ? 0.7 : 0.9;
                return (
                  <span key={star} style={{ margin: '0 4px' }}>
                    {accuracy >= threshold ? '⭐' : '☆'}
                  </span>
                );
              })}
            </div>
          </div>

          {/* 统计信息 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                background: '#F5F5F5',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: '900', color: exam.themeColor }}>
                {Math.round(accuracy * 100)}%
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>正确率</div>
            </div>
            <div
              style={{
                background: '#F5F5F5',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: '900', color: exam.themeColor }}>
                {correctCount}/{answers.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>正确/总题数</div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={handleRestart} variant="primary" size="large" style={{ flex: 1 }}>
              重新考试
            </Button>
            <Button onClick={handleReview} variant="secondary" size="large" style={{ flex: 1 }}>
              查看回顾
            </Button>
            <Button onClick={handleBack} variant="secondary" size="large" style={{ flex: 1 }}>
              返回
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 渲染回顾界面
  if (phase === 'review') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: exam.themeGradient,
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '900',
              color: exam.themeColor,
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            📝 答题回顾
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {questions.map((question, index) => {
              const answer = answers[index];
              if (!answer) return null;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: `4px solid ${answer.isCorrect ? '#4CAF50' : '#F44336'}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>
                      第 {index + 1} 题
                    </div>
                    <div
                      style={{
                        fontSize: '24px',
                        padding: '4px 12px',
                        borderRadius: '8px',
                        background: answer.isCorrect ? '#C8E6C9' : '#FFCDD2',
                      }}
                    >
                      {answer.isCorrect ? '✓' : '✗'}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                      {question.question}
                    </div>
                    {question.options && (
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        正确答案：
                        {question.options.find(o => o.id === question.correctAnswer)?.content || question.correctAnswer}
                      </div>
                    )}
                    {question.explanation && (
                      <div
                        style={{
                          fontSize: '14px',
                          color: '#666',
                          marginTop: '8px',
                          padding: '8px',
                          background: '#F5F5F5',
                          borderRadius: '8px',
                        }}
                      >
                        💡 {question.explanation}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '12px', color: '#999' }}>
                    用时：{(answer.responseTime / 1000).toFixed(1)}秒
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Button onClick={handleBack} variant="primary" size="large">
              返回主页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
